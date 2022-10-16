import mockAWS from 'aws-sdk-mock'
import { catalogBatchProcess } from './catalogBatchProcess'

describe('success catalogBatchProcess lambda', () => {
  it('1 product successfully created (from 1 valid)', async () => {
    mockAWS.mock('DynamoDB.DocumentClient', 'put', '')
    mockAWS.mock('SNS', 'publish', '')

    const event = {
      Records: [
        {
          body: '{"title":"Toy1","description":"Toy1","price":"1","count":"11"}',
        }
      ]
    }

    const responce = await catalogBatchProcess(event)

    expect(responce.body.includes('1 products created!')).toBe(true)
    expect(responce.statusCode).toBe(200)
  })

  it('3 product successfully created (from 3 valid)', async () => {
    mockAWS.mock('DynamoDB.DocumentClient', 'put', '')
    mockAWS.mock('SNS', 'publish', '')

    const event = {
      Records: [
        {
          body: '{"title":"Toy1","description":"Toy1","price":"11","count":"111"}',
        },
        {
          body: '{"title":"Toy2","description":"Toy2","price":"22","count":"222"}',
        },
        {
          body: '{"title":"Toy3","description":"Toy3","price":"33","count":"333"}',
        },
      ]
    }

    const responce = await catalogBatchProcess(event)

    expect(responce.body.includes('3 products created!')).toBe(true)
    expect(responce.statusCode).toBe(200)
  })

  it('1 product successfully created (from 1 valid and 2 invalid) ', async () => {
    mockAWS.mock('DynamoDB.DocumentClient', 'put', '')
    mockAWS.mock('SNS', 'publish', '')

    const event = {
      Records: [
        {
          body: '{"title":"Toy1","description":"Toy1","price":"11","count":"111"}',
        },
        {
          body: '{"description":"Toy2","price":"22","count":"222"}',
        },
        {
          body: '{"title":"Toy3"}',
        },
      ]
    }

    const responce = await catalogBatchProcess(event)

    expect(responce.body.includes('1 products created!')).toBe(true)
    expect(responce.statusCode).toBe(200)
  })

  it('0 product successfully created (from 2 invalid) ', async () => {
    mockAWS.mock('DynamoDB.DocumentClient', 'put', '')
    mockAWS.mock('SNS', 'publish', '')

    const event = {
      Records: [
        {
          body: '{"description":"Toy2","price":"22","count":"222"}',
        },
        {
          body: '{"title":"Toy3"}',
        },
      ]
    }

    const responce = await catalogBatchProcess(event)

    expect(responce.body.includes('No valid products in this batch!')).toBe(true)
    expect(responce.statusCode).toBe(404)
  })
})

describe('unsuccess catalogBatchProcess lambda', () => {
  it('wrong event', async () => {
    mockAWS.mock('DynamoDB.DocumentClient', 'put', '')
    mockAWS.mock('SNS', 'publish', '')

    const event = {
      Records: [
        {
          message: '{"title":"Toy3"}',
        },
      ]
    }

    const responce = await catalogBatchProcess(event)
  
    expect(responce.body.includes('Unexpected token u in JSON at position 0')).toBe(true)
    expect(responce.statusCode).toBe(500)
  })
})
