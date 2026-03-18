const express = require('express');
const router = express.Router();
const {
    getHappenings,
    getHappeningById,
    createHappening,
    updateHappening,
    deleteHappening,
} = require('../controllers/happeningController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getHappenings)
    .post(protect, admin, upload.single('image'), createHappening);

router.route('/:id')
    .get(getHappeningById)
    .put(protect, admin, upload.single('image'), updateHappening)
    .delete(protect, admin, deleteHappening);

module.exports = router;
