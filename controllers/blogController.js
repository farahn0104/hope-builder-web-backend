const Blog = require('../models/Blog');
const fs = require('fs');
const path = require('path');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ publishDate: -1 });
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res, next) => {
    try {
        const { title, description, content, author, publishDate } = req.body;

        const blogData = { title, description, content, author };
        if (publishDate) blogData.publishDate = publishDate;

        if (req.file) {
            blogData.image = `/uploads/${req.file.filename}`;
        }

        const blog = await Blog.create(blogData);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res, next) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (blog.image) {
                const oldPath = path.join(__dirname, '..', blog.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        if (blog.image) {
            const blogPath = path.join(__dirname, '..', blog.image);
            if (fs.existsSync(blogPath)) fs.unlinkSync(blogPath);
        }

        await blog.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
