const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribeNewsletter = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400);
            throw new Error('Please provide an email address');
        }

        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            res.status(400);
            throw new Error('Email is already subscribed');
        }

        const subscriber = await Newsletter.create({ email });

        res.status(201).json({
            success: true,
            data: subscriber,
            message: 'Subscribed to newsletter successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { subscribeNewsletter };
