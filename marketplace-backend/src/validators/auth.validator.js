const { body, param } = require('express-validator');

exports.registerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
        .withMessage('Password must contain at least one number, one uppercase and one lowercase letter'),
    
    body('role')
        .optional()
        .isIn(['user', 'vendor'])
        .withMessage('Invalid role specified'),
    
    body('phoneNumber')
        .optional()
        .matches(/^\+?[\d\s-]+$/)
        .withMessage('Invalid phone number format')
];

exports.loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
];

exports.forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
];

exports.resetPasswordValidation = [
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
        .withMessage('Password must contain at least one number, one uppercase and one lowercase letter'),
    
    body('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];
