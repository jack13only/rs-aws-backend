import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'
import AWS from 'aws-sdk';

export const basicAuthorizer = async (event) => {
  console.log(`--- basicAuthorizer started ---`)
  console.log(`event: `, event)

  // try {
  //   const encodedCreds = event.autorizationToken.split(' ')[1]
  //   const buff = Buffer.from(encodedCreds, 'base64')

  //   const creds = buff.toString('utf-8').split(':')
  //   const [name, pass] = creds

  //   console.log(`name: `, name, `pass: `, pass)

    return {
      principalId: "yyyyyyyy",
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn
          }
        ]
      },
    }

    // return {
    //   principalId: 'encodedCreds',
    //   policyDocument: {
    //     Version: '2012-10-17',
    //     Statement: [
    //       {
    //         Action: 'execute-api:Invoke',
    //         Effect: 'Allow',
    //         Resource: event.methodArn
    //       }
    //     ]
    //   }
    // }

  // } catch (err) {
  //   return {
  //     principalId: 'encodedCreds',
  //     policyDocument: {
  //       Version: '2012-10-17',
  //       Statement: [
  //         {
  //           Action: 'execute-api:Invoke',
  //           Effect: 'Allow',
  //           Resource: 'event.methodArn'
  //         }
  //       ]
  //     }
  //   }
  // }
};