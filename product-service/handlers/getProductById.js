import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { headers } from '../helpers/headers.js'

export const getProductById = async (event) => {
  let product

  try {

    const { pathParameters } = event
    const { productId } = pathParameters
    console.log('getProductById lambda with ', productId)

    const dynamo = new AWS.DynamoDB.DocumentClient()

    const productForSale = await dynamo.query({
      TableName: process.env.PRODUCTS_TABLENAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {':id': productId }
    }).promise()

    const productStock = await dynamo.query({
      TableName: process.env.STOCKS_TABLENAME,
      KeyConditionExpression: 'product_id = :product_id',
      ExpressionAttributeValues: {':product_id': productId }
    }).promise()

    if (productForSale?.Items?.[0] && productStock?.Items?.[0]) {
      product = { ...productForSale.Items[0], count: productStock.Items[0].count }
    }   

  } catch(err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: err.message
      }),
    }
  }

  if (!product) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        message: 'Product not found'
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(product),
  };
};