const express = require('express');
const router = express.Router();
const {
    createProgram,
    getPrograms,
    getProgramBySlug,
    getProgramById,
    updateProgram,
    deleteProgram
} = require('../controllers/programController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getPrograms)
    .post(protect, admin, upload.fields([
        { name: 'heroImage', maxCount: 1 },
        { name: 'galleryImages', maxCount: 10 }
    ]), createProgram);

router.route('/slug/:slug')
    .get(getProgramBySlug);

router.route('/:id')
    .get(getProgramById)
    .put(protect, admin, upload.fields([
        { name: 'heroImage', maxCount: 1 },
        { name: 'galleryImages', maxCount: 10 }
    ]), updateProgram)
    .delete(protect, admin, deleteProgram);

module.exports = router;
