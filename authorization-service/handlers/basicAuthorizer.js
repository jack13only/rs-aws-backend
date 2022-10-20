import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';

export const basicAuthorizer = async () => {
  console.log(`--- basicAuthorizer started ---`)
  
  try {
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
    body: JSON.stringify('ok'),
  };
};