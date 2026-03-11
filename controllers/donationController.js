const Donation = require('../models/Donation');

// @desc    Submit donation intent
// @route   POST /api/donate
// @access  Public
const submitDonationIntent = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            donationAmount,
            donationPurpose,
            paymentMethod,
            message,
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !donationAmount ||
            !donationPurpose ||
            !paymentMethod
        ) {
            res.status(400);
            throw new Error('Please fill all required fields');
        }

        const donation = await Donation.create({
            name,
            email,
            phone,
            donationAmount,
            donationPurpose,
            paymentMethod,
            message,
        });

        res.status(201).json({
            success: true,
            data: donation,
            message: 'Donation intent recorded successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitDonationIntent };
