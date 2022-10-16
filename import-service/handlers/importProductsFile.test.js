import * as AWS from 'aws-sdk'
import * as mockAWS from 'aws-sdk-mock'
import { importProductsFile } from './importProductsFile'

const event = {
  queryStringParameters: {
    name: 'products.csv',
  }
}

describe('test importProductsFile lambda', () => {
  it('check success responce', async () => {
    mockAWS.setSDKInstance(AWS)
    mockAWS.mock('S3', 'getSignedUrl', '')

    const responce = await importProductsFile(event)

    expect(responce.body.includes('products.csv')).toBe(true)
    expect(responce.statusCode).toBe(200)
  })

  it('check error responce', async () => {
    mockAWS.setSDKInstance(AWS)
    mockAWS.mock('S3', 'getSignedUrl', '')

    const responce = await importProductsFile()

    expect(responce.statusCode).toBe(500)
  })
})
