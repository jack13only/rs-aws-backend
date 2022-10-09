import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';
import csv from 'csv-parser'

export const importFileParser = async () => {
  console.log(`importFileParser`)
  let files;
  const results = [];
  try {
    const { REGION, BUCKET } = process.env

    const s3 = new AWS.S3({ region: REGION })

    const paramsList = {
      Bucket: BUCKET,
      Prefix: 'uploaded/',
      Delimiter: '/',
    }

    files = await s3.listObjectsV2(paramsList).promise()

    if (files.Contents.length) {
      const readFile = (file) => new Promise((resolve, reject) => {
        const paramsGet = {
          Bucket: BUCKET,
          Key: file.Key,
        }

        s3
          .getObject(paramsGet)
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            await s3.copyObject({
              Bucket: BUCKET,
              CopySource: BUCKET + '/' + file.Key,
              Key: file.Key.replace('uploaded', 'parsed')
            }).promise()

            await s3.deleteObject({
              Bucket: BUCKET,
              Key: file.Key,
            }).promise()
            resolve()
          });
        })
      
      const readFiles = async (files) => {
        for (let file of files) {
          await readFile(file);
        }
      }
  
      await readFiles(files.Contents);
      console.log(results)
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