import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { headers } from '../helpers/headers.js'
import { validateData, createNewProduct } from '../helpers/functions.js'

export const createProduct = async (event) => {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  console.log(body)
  
  if (!validateData(body)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'Product data is invalid'
      }),
    }
  }

  const {newProductForSale, newProductStock} = createNewProduct(body)

  try {
    const dynamo = new AWS.DynamoDB.DocumentClient()

    const productForSalePut = await dynamo.put({
      TableName: process.env.PRODUCTS_TABLENAME,
      Item: newProductForSale
    }).promise()

    const productStockPut = await dynamo.put({
      TableName: process.env.STOCKS_TABLENAME,
      Item: newProductStock
    }).promise()
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
    body: JSON.stringify('Product created successfully'),
  };
};