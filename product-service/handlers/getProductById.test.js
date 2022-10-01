import { getProductById } from "./getProductById.js";
import { products } from "../products/products.js"

describe('test get product by id', () => {
  test('found product by id', async () => {
    const event = {
      pathParameters: {
        productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a1"
      }
    }

    const product = await getProductById(event)

    expect(product).toStrictEqual(
      {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
          {
            count: 12,
            description: "Has 4 wheels",
            id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
            price: 12,
            title: "Car"
          }
        )
      }
    );
  });

  test('not found product by id', async () => {
    const event = {
      pathParameters: {
        productId: "11111111111111111111111111111"
      }
    }

    const product = await getProductById(event)

    expect(product).toStrictEqual(
      {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          message: 'Product not found'
        })
      }
    );
  });
})
