import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { headers } from '../helpers/headers.js'
import { validateData, createNewProduct } from '../helpers/functions.js'

export const catalogBatchProcess = async (event) => {
  let rim = 'no'
  let validProducts = []

  try {
    const products = event.Records.map(({ body }) => JSON.parse(body))
    const dynamo = new AWS.DynamoDB.DocumentClient()
    const sns = new AWS.SNS({ region: process.env.REGION })
    
    for (const product of products){
      if (validateData(product)) {        
        const {newProductForSale, newProductStock} = createNewProduct(product)

        await dynamo.put({
          TableName: process.env.PRODUCTS_TABLENAME,
          Item: newProductForSale
        }).promise()
    
        await dynamo.put({
          TableName: process.env.STOCKS_TABLENAME,
          Item: newProductStock
        }).promise()

        validProducts.push(product)

        if (['rick', 'morty', 'summer'].includes(product.title.toLowerCase())) {
          rim = 'yes'
        }
      }
    }

    if (!validProducts.length) return {
      statusCode: 404,
      headers,
      body: JSON.stringify(`No valid products in this batch!`),
    };

    console.log(validProducts);
    
    await sns.publish({
      Subject: `${validProducts.length} products created!`,
      Message: JSON.stringify(validProducts),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        rim: {
          DataType: 'String',
          StringValue: rim
        }
    },
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
    body: JSON.stringify(`${validProducts.length} products created!`),
  };
};