import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';
import csv from 'csv-parser'

export const importFileParser = async (event) => {
  console.log(`importFileParser`)
  let file;
  const results = [];
  try {
    const { REGION, BUCKET } = process.env

    const s3 = new AWS.S3({ region: REGION })

    const paramsList = {
      Bucket: BUCKET,
      Prefix: 'uploaded/',
      Delimiter: '/',
    }

    file = await s3.listObjectsV2(paramsList).promise()

    if (file.Contents.length) {
      const paramsGet = {
        Bucket: BUCKET,
        Key: file.Contents[0].Key,
      }
  
      const s3stream = s3
        .getObject(paramsGet)
        .createReadStream()
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(results);
        });
    }
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
    body: JSON.stringify(results),
  };
};