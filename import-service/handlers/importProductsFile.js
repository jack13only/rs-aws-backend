import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';

export const importProductsFile = async (event) => {
  let signedUrl = ''
  console.log(`importProductsFile`)
  try {
    const { REGION, BUCKET } = process.env
    const { queryStringParameters } = event
    const { name } = queryStringParameters
    const path = `uploaded/${name}`
    
    const s3 = new AWS.S3({ region: REGION })

    const params = {
      Bucket: BUCKET,
      Key: path,
      Expires: 60,
      ContentType: 'text/csv'    
    }

    signedUrl = await s3.getSignedUrlPromise('putObject', params)
  } catch (err) {
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
    body: JSON.stringify(signedUrl),
  };
};