import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { headers } from '../helpers/headers.js'
import { validateData, createNewProduct } from '../helpers/functions.js'

export const catalogBatchProcess = async (event) => {
  try {
    const products = event.Records.map(({ body }) => JSON.parse(body))
    const dynamo = new AWS.DynamoDB.DocumentClient()

    for (const product of products){
      if (validateData(product)) {
        console.log('product', product)
        const {newProductForSale, newProductStock} = createNewProduct(product)

        await dynamo.put({
          TableName: process.env.PRODUCTS_TABLENAME,
          Item: newProductForSale
        }).promise()
    
        await dynamo.put({
          TableName: process.env.STOCKS_TABLENAME,
          Item: newProductStock
        }).promise()
      }
    }

  } catch(err) {
    console.log(err)
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
    body: JSON.stringify('catalogBatchProcess!'),
  };
};