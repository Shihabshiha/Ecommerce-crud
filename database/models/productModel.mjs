import mongoose from "mongoose";

const schema = new mongoose.Schema({
  productId : {
    type : String,
    required: true,
    unique:true,
  },
  productName : {
    type:String,
    required:true,
    unique:true,
  },
  price: {
    type:Number,
    required:true,
  },
  stock : {
    type:Number,
    required:true,
  }
},{
  timestamps:true,
})

const ProductModel = mongoose.model("Products",schema)
export default ProductModel;