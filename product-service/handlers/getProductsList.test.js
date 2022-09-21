import { getProductsList } from "./getProductsList.js";
import { products } from "../products/products.js"

test('get products', async () => {
  const receivedProducts = await getProductsList()

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