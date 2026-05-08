import express from "express";
import { authenticateSeller, authenticateAdmin, authenticateUser, authorizeRoles, checkProductAccess } from "../middlewares/auth.middleware.js";
import multer from "multer";
import {createProductValidator} from "../validator/product.validator.js"
import { addProductVariant, createProduct, deleteProduct, deleteProductVariant, getAllProducts, getAllProductsAdmin, getProductDetail, getSellerProducts } from "../controllers/product.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const router = express.Router();

/*
  @route POST /api/products/create
  @desc  Create a new product
  @access Private (Seller, Admin)
  @middleware authenticateUser, authorizeRoles("seller", "admin"), upload.array("images", 5), createProductValidator
  @controller createProduct
 */

router.post("/create", authenticateUser, authorizeRoles("seller", "admin"), upload.array("images", 5), createProductValidator, createProduct);

/*
  @route GET /api/products/seller
  @desc  Get all products of seller
  @access Private (Seller)
  @middleware authenticateSeller
  @controller getSellerProducts
*/

router.get("/seller", authenticateSeller, getSellerProducts);

/*
  @route GET /api/products/allSellerProductsAdmin
  @desc  Get all products from all sellers
  @access Private (Admin)
  @middleware authenticateAdmin
  @controller getAllProducts
*/

router.get("/allSellerProductsAdmin", authenticateAdmin, getAllProductsAdmin);

/*
  @route GET /api/products
  @desc  Get all products from all sellers
  @access Public
  @controller getAllProducts
*/

router.get("/", getAllProducts)

/*
    @route GET /api/products/detail/:id
    @desc  Get product detail
    @access Public
    @controller getProductDetail
*/

router.get("/detail/:id", getProductDetail)

/*
    @route POST /api/products/:productId/variants
    @desc  Add variant to product
    @access Private (Seller, Admin)
    @middleware authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess, upload.array("variantImages", 4)
    @controller addProductVariant
*/

router.post("/:productId/variants", authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess, upload.array("variantImages", 4), addProductVariant)

/*
    @route DELETE /api/products/:productId/variants/:variantId/delete
    @desc  Delete variant from product
    @access Private (Seller, Admin)
    @middleware authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess
    @controller deleteProductVariant
*/

router.delete("/:productId/variants/:variantId/delete", authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess, deleteProductVariant) 

/*
    @route DELETE /api/products/:productId/delete
    @desc  Delete product
    @access Private (Seller, Admin)
    @middleware authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess
    @controller deleteProduct
*/

router.delete("/:productId/delete", authenticateUser, authorizeRoles("seller", "admin"), checkProductAccess, deleteProduct)

export default router;
