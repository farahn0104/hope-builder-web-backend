const Program = require('../models/Program');
const fs = require('fs');
const path = require('path');

// @desc    Create a program
// @route   POST /api/programs
// @access  Private/Admin
const createProgram = async (req, res, next) => {
    try {
        const { title, shortDescription, fullDescription, objectives, impact, startDate, location, status } = req.body;
        
        const programData = {
            title,
            shortDescription,
            fullDescription,
            startDate,
            location,
            status: status || 'active',
            objectives: objectives ? (typeof objectives === 'string' ? JSON.parse(objectives) : objectives) : [],
            impact: impact ? (typeof impact === 'string' ? JSON.parse(impact) : impact) : []
        };

        if (req.files && req.files.heroImage) {
            programData.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
        }

        if (req.files && req.files.galleryImages) {
            programData.galleryImages = req.files.galleryImages.map(file => `/uploads/${file.filename}`);
        }

        const program = await Program.create(programData);

        res.status(201).json({
            success: true,
            data: program
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res, next) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: programs.length,
            data: programs
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single program by slug
// @route   GET /api/programs/slug/:slug
// @access  Public
const getProgramBySlug = async (req, res, next) => {
    try {
        const program = await Program.findOne({ slug: req.params.slug });

        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        res.status(200).json({
            success: true,
            data: program
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single program by ID
// @route   GET /api/programs/:id
// @access  Public
const getProgramById = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        res.status(200).json({
            success: true,
            data: program
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private/Admin
const updateProgram = async (req, res, next) => {
    try {
        let program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        const updateData = { ...req.body };
        
        if (updateData.objectives && typeof updateData.objectives === 'string') updateData.objectives = JSON.parse(updateData.objectives);
        if (updateData.impact && typeof updateData.impact === 'string') updateData.impact = JSON.parse(updateData.impact);

        if (req.files) {
            if (req.files.heroImage) {
                if (program.heroImage) {
                    const oldHeroPath = path.join(__dirname, '..', program.heroImage);
                    if (fs.existsSync(oldHeroPath)) fs.unlinkSync(oldHeroPath);
                }
                updateData.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
            }

            if (req.files.galleryImages) {
                // Delete old gallery images if replacing
                if (program.galleryImages && program.galleryImages.length > 0) {
                    program.galleryImages.forEach(img => {
                        const imgPath = path.join(__dirname, '..', img);
                        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
                    });
                }
                updateData.galleryImages = req.files.galleryImages.map(file => `/uploads/${file.filename}`);
            }
        }

        program = await Program.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: program
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private/Admin
const deleteProgram = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        // Delete images
        if (program.heroImage) {
            const heroPath = path.join(__dirname, '..', program.heroImage);
            if (fs.existsSync(heroPath)) fs.unlinkSync(heroPath);
        }

        if (program.galleryImages && program.galleryImages.length > 0) {
            program.galleryImages.forEach(img => {
                const imgPath = path.join(__dirname, '..', img);
                if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
            });
        }

        await program.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProgram,
    getPrograms,
    getProgramBySlug,
    getProgramById,
    updateProgram,
    deleteProgram
};
