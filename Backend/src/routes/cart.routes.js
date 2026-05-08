import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { validateAddToCart, validateDecrementCartQuantity, validateIncrementCartQuantity, validateRemoveFromCart } from "../validator/cart.validator.js";
import { addToCart, decrementCartQuantity, getCart, incrementCartQuantity, removeAllFromCart, removeFromCart } from "../controllers/cart.controller.js";

const router = express.Router();

/*
    @route: POST /api/cart/add/:productId/:variantId
    @desc: Add product to cart
    @access: Private (user)
    @controller: addToCart
    @validation: validateAddToCart
    @middleware: authenticateUser
*/

router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart )

/*
    @route: GET /api/cart
    @desc: Get cart details
    @access: Private (user)
    @controller: getCart
    @middleware: authenticateUser
*/

router.get("/", authenticateUser, getCart)

/*
    @route: PATCH /api/cart/quantity/increment/:productId/:variantId
    @desc: Increment cart item quantity
    @access: Private (user)
    @controller: incrementCartQuantity
    @validation: validateIncrementCartQuantity
    @middleware: authenticateUser
*/

router.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartQuantity, incrementCartQuantity)

/*
    @route: PATCH /api/cart/quantity/decrement/:productId/:variantId
    @desc: Decrement cart item quantity
    @access: Private (user)
    @controller: decrementCartQuantity
    @validation: validateDecrementCartQuantity
    @middleware: authenticateUser
*/

router.patch("/quantity/decrement/:productId/:variantId", authenticateUser, validateDecrementCartQuantity, decrementCartQuantity)

/*
    @route: DELETE /api/cart/remove/:productId/:variantId
    @desc: Remove item from cart
    @access: Private (user)
    @controller: removeFromCart
    @validation: validateRemoveFromCart
    @middleware: authenticateUser
*/

router.delete("/remove/:productId/:variantId", authenticateUser, validateRemoveFromCart, removeFromCart)

/*
    @route: DELETE /api/cart/remove-all
    @desc: Remove all items from cart
    @access: Private (user)
    @controller: removeAllFromCart
    @middleware: authenticateUser
*/

router.delete("/remove-all", authenticateUser, removeAllFromCart)

export default router;