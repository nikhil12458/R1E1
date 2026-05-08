import {body, validationResult} from "express-validator"

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegisterUser = [
    body("fullname").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("contact").notEmpty().withMessage("Phone number is required"),
    validateRequest
]

export const validateLoginUser = [
    body("email").optional().notEmpty().withMessage("Email is required"),
    body("contact").optional().notEmpty().withMessage("Contact is required"),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest
]