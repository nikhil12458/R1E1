import {body, validationResult} from "express-validator"

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateAddToCart = [
    body("productId").isMongoId().withMessage("Invalid Product ID"),
    body("variantId").isMongoId().withMessage("Invalid Variant ID"),
    body("quantity").optional().isInt({min: 1}).withMessage("Quantity must be at least 1"),
    validateRequest
]

export const validateIncrementCartQuantity = [
    body("productId").isMongoId().withMessage("Invalid Product ID"),
    body("variantId").isMongoId().withMessage("Invalid Variant ID"),
    validateRequest
]

export const validateDecrementCartQuantity = [
    body("productId").isMongoId().withMessage("Invalid Product ID"),
    body("variantId").isMongoId().withMessage("Invalid Variant ID"),
    validateRequest
]

export const validateRemoveFromCart = [
    body("productId").isMongoId().withMessage("Invalid Product ID"),
    body("variantId").isMongoId().withMessage("Invalid Variant ID"),
    validateRequest
]