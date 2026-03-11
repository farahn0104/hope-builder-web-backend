const express = require('express');
const router = express.Router();
const { getHomepage, updateHomepage } = require('../controllers/homepageController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getHomepage)
    .put(protect, admin, upload.single('heroImage'), updateHomepage);

module.exports = router;
