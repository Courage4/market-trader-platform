const { body, param } = require('express-validator');

exports.createProductValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Product name must be between 3 and 100 characters'),
    
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ min: 20, max: 2000 })
        .withMessage('Description must be between 20 and 2000 characters'),
    
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid category ID'),
    
    body('stock')
        .notEmpty()
        .withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be a positive integer'),
    
    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),
    
    body('images.*.url')
        .optional()
        .isURL()
        .withMessage('Invalid image URL'),
    
    body('attributes')
        .optional()
        .isArray()
        .withMessage('Attributes must be an array'),
    
    body('attributes.*.name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Attribute name is required'),
    
    body('attributes.*.value')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Attribute value is required')
];

exports.updateProductValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid product ID'),
    
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Product name must be between 3 and 100 characters'),
    
    body('description')
        .optional()
        .trim()
        .isLength({ min: 20, max: 2000 })
        .withMessage('Description must be between 20 and 2000 characters'),
    
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a positive integer')
];

exports.productReviewValidation = [
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    
    body('comment')
        .trim()
        .notEmpty()
        .withMessage('Review comment is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Review comment must be between 10 and 500 characters')
];
