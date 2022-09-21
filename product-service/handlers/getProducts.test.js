import { getProducts } from "./getProducts.js";
import { products } from "../products/products.js"

test('get products', async () => {
  const receivedProducts = await getProducts()

  expect(receivedProducts).toStrictEqual(
    {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(products)
    }
  );
});