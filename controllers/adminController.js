const Admin = require('../models/Admin');
const Program = require('../models/Program');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Certificate = require('../models/Certificate');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                data: {
                    _id: admin._id,
                    username: admin.username,
                    token: generateToken(admin._id),
                },
            });
        } else {
            res.status(401);
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public (In production, this should ideally be protected or removed after initial creation)
const registerAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            res.status(400);
            throw new Error('Admin already exists');
        }

        const admin = await Admin.create({
            username,
            password,
        });

        if (admin) {
            res.status(201).json({
                success: true,
                data: {
                    _id: admin.id,
                    username: admin.username,
                    token: generateToken(admin._id),
                },
            });
        } else {
            res.status(400);
            throw new Error('Invalid admin data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
    try {
        const totalGallery = await Gallery.countDocuments();
        const totalPrograms = await Program.countDocuments();
        const totalMessages = await Contact.countDocuments();
        const totalCertificates = await Certificate.countDocuments();

        res.json({
            success: true,
            data: {
                totalGallery,
                totalPrograms,
                totalMessages,
                totalCertificates
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { loginAdmin, registerAdmin, getDashboardStats };
