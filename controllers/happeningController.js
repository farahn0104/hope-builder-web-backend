const Happening = require('../models/Happening');
const fs = require('fs');
const path = require('path');

// @desc    Get all happenings
// @route   GET /api/happenings
// @access  Public
const getHappenings = async (req, res, next) => {
    try {
        const happenings = await Happening.find().sort({ date: -1 });
        res.status(200).json({ success: true, count: happenings.length, data: happenings });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single happening
// @route   GET /api/happenings/:id
// @access  Public
const getHappeningById = async (req, res, next) => {
    try {
        const happening = await Happening.findById(req.params.id);

        if (!happening) {
            return res.status(404).json({ success: false, message: 'Happening not found' });
        }

        res.status(200).json({ success: true, data: happening });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a happening
// @route   POST /api/happenings
// @access  Private/Admin
const createHappening = async (req, res, next) => {
    try {
        const { title, excerpt, content, date } = req.body;

        const happeningData = { title, excerpt, content };
        if (date) happeningData.date = date;

        if (req.file) {
            happeningData.image = `/uploads/${req.file.filename}`;
        }

        const happening = await Happening.create(happeningData);
        res.status(201).json({ success: true, data: happening });
    } catch (error) {
        next(error);
    }
};

// @desc    Update happening
// @route   PUT /api/happenings/:id
// @access  Private/Admin
const updateHappening = async (req, res, next) => {
    try {
        let happening = await Happening.findById(req.params.id);

        if (!happening) {
            return res.status(404).json({ success: false, message: 'Happening not found' });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (happening.image) {
                const oldPath = path.join(__dirname, '..', happening.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        happening = await Happening.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: happening });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete happening
// @route   DELETE /api/happenings/:id
// @access  Private/Admin
const deleteHappening = async (req, res, next) => {
    try {
        const happening = await Happening.findById(req.params.id);

        if (!happening) {
            return res.status(404).json({ success: false, message: 'Happening not found' });
        }

        if (happening.image) {
            const happeningPath = path.join(__dirname, '..', happening.image);
            if (fs.existsSync(happeningPath)) fs.unlinkSync(happeningPath);
        }

        await happening.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHappenings,
    getHappeningById,
    createHappening,
    updateHappening,
    deleteHappening,
};
