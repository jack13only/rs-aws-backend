import * as dotenv from 'dotenv'
dotenv.config()
import AWS from 'aws-sdk';
import { headers } from '../helpers/headers.js'
import { validateData, createNewProduct } from '../helpers/functions.js'

export const catalogBatchProcess = async (event) => {
  try {
    const products = event.Records.map(({ body }) => JSON.parse(body))
    const dynamo = new AWS.DynamoDB.DocumentClient()
    const sns = new AWS.SNS({ region: process.env.REGION })
    console.log('Products', products)

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
      }
    }

    await sns.publish({
      Subject: 'Products created!',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        rim: {
          DataType: 'String',
          StringValue: products.find((product) => ['rick', 'morty', 'summer'].includes(product.title.toLowerCase())) ? 'yes' : 'no'
        }
    },
    }).promise()

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
    body: JSON.stringify('catalogBatchProcess done!'),
  };
};