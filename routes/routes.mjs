import { Router } from "express";
import productController from "../controller/productController.mjs";
import cartController from "../controller/cartController.mjs";

const AppRouter = Router();
const Productscontroller = productController()
const CartControllers = cartController()

AppRouter.route('/product').post(Productscontroller.addProduct).get(Productscontroller.viewProducts)
AppRouter.route('/add-to-cart').post(CartControllers.addToCart)
AppRouter.route('/view-cart').get(CartControllers.viewCart)

export default AppRouter

