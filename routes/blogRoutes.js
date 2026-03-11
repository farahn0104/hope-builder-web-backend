const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getBlogs)
    .post(protect, admin, upload.single('image'), createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(protect, admin, upload.single('image'), updateBlog)
    .delete(protect, admin, deleteBlog);

module.exports = router;
