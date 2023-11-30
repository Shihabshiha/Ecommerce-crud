import { Router } from "express";
import productController from "../controller/productController.mjs";
import cartController from "../controller/cartController.mjs";

const AppRouter = Router();
const Productscontroller = productController()
const CartControllers = cartController()

//add and view the product
AppRouter.route('/product').post(Productscontroller.addProduct).get(Productscontroller.viewProducts)

//add product to cart
AppRouter.route('/add-to-cart').post(CartControllers.addToCart)
//view the cart
AppRouter.route('/view-cart').get(CartControllers.viewCart)
//total cart price
AppRouter.route('/total-cart-price/:cartId').get(CartControllers.totalCartPrice)
//delete items from the cart
AppRouter.route('/delete-cart-items/:cartId').patch(CartControllers.deleteItemsFromCart)

export default AppRouter

