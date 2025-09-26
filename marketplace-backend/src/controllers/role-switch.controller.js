const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class RoleSwitchController {
    constructor() {
        this.roleSwitchingEnabled = true;
    }

    // Get available roles for the user
    async getAvailableRoles(userId) {
        try {
            const user = await User.findById(userId).select('role businessInfo');
            
            if (!user) {
                throw new Error('User not found');
            }

            const availableRoles = ['buyer']; // Everyone can be a buyer
            
            // Add vendor role if user has business info
            if (user.businessInfo && user.businessInfo.businessName) {
                availableRoles.push('vendor');
            }

            // Add admin roles if user is admin
            if (user.role === 'admin' || user.role === 'super_admin') {
                availableRoles.push('admin');
                if (user.role === 'super_admin') {
                    availableRoles.push('super_admin');
                }
            }

            return {
                success: true,
                data: {
                    currentRole: user.role,
                    availableRoles,
                    canSwitch: availableRoles.length > 1
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Switch user role
    async switchRole(userId, newRole) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                throw new Error('User not found');
            }

            // Validate role switch
            const roleValidation = await this.validateRoleSwitch(user, newRole);
            if (!roleValidation.valid) {
                throw new Error(roleValidation.message);
            }

            // Update user role
            const oldRole = user.role;
            user.role = newRole;
            await user.save();

            // Generate new JWT token with updated role
            const token = jwt.sign(
                { 
                    id: user._id, 
                    role: newRole,
                    roleSwitched: true,
                    originalRole: oldRole
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE || '7d' }
            );

            return {
                success: true,
                message: `Successfully switched from ${oldRole} to ${newRole}`,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        businessInfo: user.businessInfo
                    },
                    token,
                    roleSwitch: {
                        from: oldRole,
                        to: newRole,
                        timestamp: new Date()
                    }
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Validate if user can switch to the requested role
    async validateRoleSwitch(user, newRole) {
        try {
            // Everyone can be a buyer
            if (newRole === 'buyer') {
                return { valid: true };
            }

            // Check if user can be a vendor
            if (newRole === 'vendor') {
                if (!user.businessInfo || !user.businessInfo.businessName) {
                    return { 
                        valid: false, 
                        message: 'Business information required to switch to vendor role' 
                    };
                }
                return { valid: true };
            }

            // Check admin roles
            if (newRole === 'admin') {
                if (user.role !== 'admin' && user.role !== 'super_admin') {
                    return { 
                        valid: false, 
                        message: 'Insufficient permissions to switch to admin role' 
                    };
                }
                return { valid: true };
            }

            if (newRole === 'super_admin') {
                if (user.role !== 'super_admin') {
                    return { 
                        valid: false, 
                        message: 'Insufficient permissions to switch to super admin role' 
                    };
                }
                return { valid: true };
            }

            return { 
                valid: false, 
                message: 'Invalid role specified' 
            };
        } catch (error) {
            throw error;
        }
    }

    // Get role switch history
    async getRoleSwitchHistory(userId) {
        try {
            // This would typically be stored in a separate collection
            // For now, we'll return a placeholder
            return {
                success: true,
                data: {
                    history: [],
                    message: 'Role switch history not implemented yet'
                }
            };
        } catch (error) {
            throw error;
        }
    }

    // Check if user can access specific role features
    async checkRoleAccess(userId, targetRole) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                throw new Error('User not found');
            }

            const validation = await this.validateRoleSwitch(user, targetRole);
            
            return {
                success: true,
                data: {
                    canAccess: validation.valid,
                    currentRole: user.role,
                    targetRole,
                    message: validation.message
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RoleSwitchController();