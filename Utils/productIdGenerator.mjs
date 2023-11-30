import { v1 as uuidv1 } from 'uuid';

//gereating unique id for the product
const generateProductId = ()=> {
  return uuidv1()
}

export default generateProductId;