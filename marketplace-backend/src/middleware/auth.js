const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Not authorized to access this route'
        });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }
        
        if (!req.user.role) {
            return res.status(403).json({
                success: false,
                error: 'User role not found'
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role '${req.user.role}' not authorized to access this route. Required roles: ${roles.join(', ')}`
            });
        }
        next();
    };
};

// Flexible authorization that checks user role from auth
exports.authorizeUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'User not authenticated'
        });
    }
    
    if (!req.user.role) {
        return res.status(403).json({
            success: false,
            error: 'User role not found'
        });
    }
    
    // Allow access based on user's actual role
    const userRole = req.user.role;
    
    // Define role hierarchy (optional - can be customized)
    const roleHierarchy = {
        'super_admin': ['super_admin', 'admin', 'vendor', 'buyer'],
        'admin': ['admin', 'vendor', 'buyer'],
        'vendor': ['vendor'],
        'buyer': ['buyer']
    };
    
    // For now, just allow the user to access their own role-based routes
    // This can be customized based on your business logic
    next();
};

// Generic role checker factory function
exports.requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }
        
        if (!req.user.role) {
            return res.status(403).json({
                success: false,
                error: 'User role not found'
            });
        }
        
        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                success: false,
                error: `Access denied. ${requiredRole} role required. Current role: ${req.user.role}`
            });
        }
        
        next();
    };
};

// Flexible role checker that allows multiple roles
exports.requireAnyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }
        
        if (!req.user.role) {
            return res.status(403).json({
                success: false,
                error: 'User role not found'
            });
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `Access denied. Required roles: ${allowedRoles.join(', ')}. Current role: ${req.user.role}`
            });
        }
        
        next();
    };
};

// Role switching middleware - allows vendors to access buyer endpoints
exports.allowRoleSwitch = (targetRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }
        
        // Allow access if user has the target role or is a vendor (can switch to buyer)
        const canAccess = req.user.role === targetRole || 
                         (req.user.role === 'vendor' && targetRole === 'buyer') ||
                         (req.user.role === 'buyer' && targetRole === 'vendor');
        
        if (!canAccess) {
            return res.status(403).json({
                success: false,
                error: `Access denied. Cannot switch to ${targetRole} role. Current role: ${req.user.role}`
            });
        }
        
        next();
    };
};
