import { products } from "../products/products.js";

export const getProductById = async (event) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  const { pathParameters } = event
  const { productId } = pathParameters
  const product = products.find((item) => item.id === productId)

  if (!product) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        message: 'Product not found'
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(product),
  };
};