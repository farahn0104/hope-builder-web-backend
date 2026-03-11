const Contact = require('../models/Contact');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            res.status(400);
            throw new Error('Please include name, email and message');
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            message,
        });

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitContact, getContacts };
