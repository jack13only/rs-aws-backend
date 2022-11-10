import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'

export const basicAuthorizer = async (event, ctx, callback) => {
  console.log(`event: `, event)

  const generatePolicy = (action, arn, principalId) => {
    return {
      principalId: principalId ?? 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: action,
            Resource: arn
          }
        ]
      },
    }
  }

  try {
    const { authorizationToken } = event
    if (!authorizationToken) {
      callback(null, generatePolicy('Deny', event.methodArn))
    }
    const encodedCreds = authorizationToken.split(' ')[1]
    const buff = Buffer.from(encodedCreds, 'base64')

    const creds = buff.toString('utf-8').split(':')
    const [name, pass] = creds

    console.log(`name: `, name, `pass: `, pass)

    if (name && pass && process.env[name] === pass) {
      callback(null, generatePolicy('Allow', event.methodArn, name))
    }
  } catch (error) {
    console.log('Error', JSON.stringify(error));
  }

  callback(null, generatePolicy('Deny', event.methodArn))
}
