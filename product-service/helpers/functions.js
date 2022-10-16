import * as dotenv from 'dotenv'
dotenv.config()
import { v5 as uuidv5 } from 'uuid';

export const findCount = (array, id) => {
  const findedItem = array.find((item) => item.product_id === id)
  return findedItem ? findedItem.count : -1
}

export const validateData = (object) => {
  if (object &&
  typeof object.title === 'string' && 
  object.title.trim().length &&
  (typeof object.price === 'number' || typeof +object.price === 'number') &&
  object.price !== '' &&
  object.price >= 0 &&
  object.price < 1000 &&
  (typeof object.count === 'number' || typeof +object.count === 'number') &&
  object.count !== '' &&
  object.count >= 0 ) {
    return true 
  } else {
    return false
  }
}

export const createNewProduct = (object) => {
  const uuid = uuidv5(object.title, process.env.MY_NAMESPACE)
  return {
    newProductForSale: {
      id: uuid,
      title: object.title,
      description: object.description || '',
      price: object.price
    },
    newProductStock: {
      product_id: uuid,
      count: object.count
    }
  }
}
