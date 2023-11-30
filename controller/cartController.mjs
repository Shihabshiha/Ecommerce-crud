import AppError from "../Utils/appError.mjs";
import { httpStatus } from "../config/httpStatus.mjs";
import CartModel from "../database/models/cartModel.mjs";
import ProductModel from "../database/models/productModel.mjs";

const cartController = () => {

  const addToCart =async (req,res,next) => {
    try{
      const {userIp, productId , quantity } = req.body;

      const product = await ProductModel.findOne({productId});
      if(!product){
        const err = new AppError("Product not found", httpStatus.NOT_FOUND)
        return next(err)
      }
      const isAvailableStock = product.stock >= quantity;
      if(!isAvailableStock){
        const err = new AppError("Requested quantity not availabe", httpStatus.NOT_FOUND)
        return next(err)
      }
  
      const cart = await CartModel.findOne({userIp});
      if(!cart){
        const cartObject = {
          userIp : userIp,
          products : [{productId : product.productId , quantity:quantity, price:product.price}]
        }
        const newCart = await CartModel.create(cartObject)
        return res.status(httpStatus.CREATED).json({message : "product added successfully",newCart})
      }
      const existingProductInCartIndex = cart.products.findIndex((item)=> item.productId === productId)
  
      if(existingProductInCartIndex != -1){
        cart.products[existingProductInCartIndex].quantity += quantity;
      }else{
        cart.products.push({productId : productId , quantity:quantity, price: product.price})
      }
  
      cart.save()

      await ProductModel.updateOne({productId},{$inc:{stock:-quantity}})


      res.status(httpStatus.CREATED).json({"message":"Added to cart" , cart})
    }catch(error){
      console.error(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : "Internal Server Error"})
    }
  }

  const viewCart = async(req,res,next)=>{
    try{
      const userIp = req.query.userIp;
      console.log("userip",userIp)
      const cart = await CartModel.findOne({userIp:userIp})
      const totalAmount = cart.products?.reduce((total,product)=>{
        return total += product.quantity * product.price
      },0)

      res.status(httpStatus.OK).json({"message":"User cart" , cart , totalAmount})
    }catch(error){
      console.error(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : "Internal Server Error"})
    }
  }

  return {
    addToCart,
    viewCart,
  }

}

export default cartController;