import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userIp : {
    type : String,
  },
  products : {
    type : Array,
  },
  totalPrice : {
    type: Number,
  }
},
{
  timestamps:true,
})

const CartModel = mongoose.model("Cart",schema);
export default CartModel;