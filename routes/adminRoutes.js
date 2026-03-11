const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin, getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);
// Uncomment the line below to register the first admin if needed in setup
router.post('/register', registerAdmin);

router.get('/stats', protect, getDashboardStats);

module.exports = router;
