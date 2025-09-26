const express = require('express');
const router = express.Router();
const roleSwitchController = require('../controllers/role-switch.controller');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /role-switch/available:
 *   get:
 *     summary: Get available roles for current user
 *     tags: [Role Switching]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentRole:
 *                       type: string
 *                       example: "vendor"
 *                     availableRoles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["buyer", "vendor"]
 *                     canSwitch:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/available', protect, async (req, res) => {
    try {
        const result = await roleSwitchController.getAvailableRoles(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /role-switch/switch:
 *   post:
 *     summary: Switch user role
 *     tags: [Role Switching]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [buyer, vendor, admin, super_admin]
 *                 description: Target role to switch to
 *                 example: "buyer"
 *     responses:
 *       200:
 *         description: Role switched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully switched from vendor to buyer"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: New JWT token with updated role
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     roleSwitch:
 *                       type: object
 *                       properties:
 *                         from:
 *                           type: string
 *                           example: "vendor"
 *                         to:
 *                           type: string
 *                           example: "buyer"
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-03-15T10:30:00Z"
 *       400:
 *         description: Bad request - invalid role or insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/switch', protect, async (req, res) => {
    try {
        const { role } = req.body;
        
        if (!role) {
            return res.status(400).json({ 
                success: false, 
                error: 'Role is required' 
            });
        }

        const result = await roleSwitchController.switchRole(req.user.id, role);
        res.json(result);
    } catch (error) {
        if (error.message.includes('required') || error.message.includes('permissions')) {
            res.status(400).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @swagger
 * /role-switch/check/{targetRole}:
 *   get:
 *     summary: Check if user can access specific role
 *     tags: [Role Switching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetRole
 *         required: true
 *         schema:
 *           type: string
 *           enum: [buyer, vendor, admin, super_admin]
 *         description: Target role to check access for
 *         example: "buyer"
 *     responses:
 *       200:
 *         description: Role access check completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     canAccess:
 *                       type: boolean
 *                       example: true
 *                     currentRole:
 *                       type: string
 *                       example: "vendor"
 *                     targetRole:
 *                       type: string
 *                       example: "buyer"
 *                     message:
 *                       type: string
 *                       example: "Access granted"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/check/:targetRole', protect, async (req, res) => {
    try {
        const { targetRole } = req.params;
        const result = await roleSwitchController.checkRoleAccess(req.user.id, targetRole);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @swagger
 * /role-switch/history:
 *   get:
 *     summary: Get role switch history
 *     tags: [Role Switching]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role switch history retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     history:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           from:
 *                             type: string
 *                             example: "vendor"
 *                           to:
 *                             type: string
 *                             example: "buyer"
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-15T10:30:00Z"
 *                     message:
 *                       type: string
 *                       example: "Role switch history not implemented yet"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/history', protect, async (req, res) => {
    try {
        const result = await roleSwitchController.getRoleSwitchHistory(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;