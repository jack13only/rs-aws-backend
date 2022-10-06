import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { findCount } from '../helpers/functions.js'
import { headers } from '../helpers/headers.js'

export const getProductsList = async () => {
  console.log('getProductsList lambda')

  let products = []

  try {
    const dynamo = new AWS.DynamoDB.DocumentClient()

    const productsForSale = await dynamo.scan({
      TableName: process.env.PRODUCTS_TABLENAME
    }).promise()

    const productsStock = await dynamo.scan({
      TableName: process.env.STOCKS_TABLENAME
    }).promise()

    products = [...productsForSale.Items.map((product) => {
      return { ...product, count: findCount(productsStock.Items, product.id)}
    })]

    products = products.filter((product) => product.count >= 0)

  } catch(err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: err.message
      }),
    }
  }
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(products),
  };
};
