import * as dotenv from 'dotenv'
dotenv.config()
import { headers } from '../helpers/headers.js'

export const basicAuthorizer = async (event) => {
  console.log(`event: `, event)

  try {
    const { authorizationToken } = event
    if (!authorizationToken) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          message: err.message
        }),
      }
    }
    const encodedCreds = authorizationToken.split(' ')[1]
    const buff = Buffer.from(encodedCreds, 'base64')

    const creds = buff.toString('utf-8').split(':')
    const [name, pass] = creds

    console.log(`name: `, name, `pass: `, pass)

    if (process.env[name] === pass) {
      return {
        principalId: name,
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
    }
  } catch (err) {
    console.log(err.message);
  }

  return {
    principalId: 'Anonimus',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Deny',
          Resource: event.methodArn
        }
      ]
    },
  }
}
