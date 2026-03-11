const mongoose = require('mongoose');

const donationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        donationAmount: {
            type: Number,
            required: [true, 'Please add donation amount'],
        },
        donationPurpose: {
            type: String,
            required: [true, 'Please specify the donation purpose'],
        },
        paymentMethod: {
            type: String,
            enum: ['UPI', 'Bank Transfer'],
            required: [true, 'Please specify payment method'],
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Donation', donationSchema);
