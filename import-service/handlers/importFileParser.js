import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';
import csv from 'csv-parser'

export const importFileParser = async () => {
  console.log(`--- ImportFileParser started ---`)
  
  const results = [];
  try {
    const { REGION, BUCKET, SQS_URL } = process.env

    const sqs = new AWS.SQS();
    const s3 = new AWS.S3({ region: REGION })

    const paramsList = {
      Bucket: BUCKET,
      Prefix: 'uploaded/',
      Delimiter: '/',
    }

    let files = await s3.listObjectsV2(paramsList).promise()

    if (files.Contents.length) {
      const readFile = (file) => new Promise((resolve, reject) => {
        
        console.log(`--- read file ${file.Key} --- `)

        const paramsGet = {
          Bucket: BUCKET,
          Key: file.Key,
        }

        s3
          .getObject(paramsGet)
          .createReadStream()
          .pipe(csv({
            mapHeaders: ({ header }) => header.trim().toLowerCase()
          }))
          .on('data', (product) => results.push(product))
          .on('end', async () => {

            results.forEach((product) => {
              sqs.sendMessage({
                  QueueUrl: SQS_URL,
                  MessageBody: JSON.stringify(product)
                }).promise()
            })

            console.log(results);

            await s3.copyObject({
              Bucket: BUCKET,
              CopySource: BUCKET + '/' + file.Key,
              Key: file.Key.replace('uploaded', 'parsed')
            }).promise()

            await s3.deleteObject({
              Bucket: BUCKET,
              Key: file.Key,
            }).promise()
            console.log(`--- Move file ${file.Key} from uploaded to parsed ---`)
            resolve()
          });
        })
      
      const readFiles = async (files) => {
        for (let file of files) {
          await readFile(file);
        }
      }
  
      await readFiles(files.Contents);
      console.log(`--- importFileParser done ---`)
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