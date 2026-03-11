const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res, next) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: images.length, data: images });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const galleryItem = await Gallery.create({
            image: `/uploads/${req.file.filename}`,
            title,
            description,
            category: category || 'General',
        });

        res.status(201).json({ success: true, data: galleryItem });
    } catch (error) {
        next(error);
    }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryItem = async (req, res, next) => {
    try {
        let item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (item.image) {
                const oldPath = path.join(__dirname, '..', item.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        item = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        if (item.image) {
            const imagePath = path.join(__dirname, '..', item.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await item.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem };
