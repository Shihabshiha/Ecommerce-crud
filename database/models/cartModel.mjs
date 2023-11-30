import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userIp : {
    type : String,
  },
  products : [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice : {
    type: Number,
  }
},
{
  timestamps:true,
})

const CartModel = mongoose.model("Cart",schema);
export default CartModel;