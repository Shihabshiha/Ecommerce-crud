import ProductModel from "../database/models/productModel.mjs";
import { httpStatus } from "../config/httpStatus.mjs";
import AppError from "../Utils/appError.mjs";
import generateProductId from "../Utils/productIdGenerator.mjs";

const productController = () => {
  //add product to ecommerce site
  const addProduct = async (req, res, next) => {
    try {
      const { productName, price, stock } = req.body;
      //checks all required data is present
      if (!productName || !price || !stock) {
        const err = new AppError(
          "Missing some required data",
          httpStatus.BAD_REQUEST
        );
        return next(err);
      }
      //create new product document
      const newProduct = await ProductModel.create({
        productId: generateProductId(),
        productName,
        price,
        stock,
      });
      res
        .status(httpStatus.CREATED)
        .json({ message: "New product added successfully", newProduct });
    } catch (error) {
      console.error(error);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  //View products from ecommerce
  const viewProducts = async (req, res, next) => {
    try {
      const allProducts = await ProductModel.find({});

      if (allProducts.length === 0) {
        const err = new AppError("No products availabe", httpStatus.NOT_FOUND);
        return next(err);
      }
      
      res.status(httpStatus.OK).json({ allProducts });
    } catch (error) {
      console.error(error);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  return {
    addProduct,
    viewProducts,
  };
};

export default productController;
