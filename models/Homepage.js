const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
    heroTitle: {
        type: String,
        required: [true, 'Please add a hero title']
    },
    heroDescription: {
        type: String,
        required: [true, 'Please add a hero description']
    },
    heroImage: {
        type: String, // URL/Path
        required: [true, 'Please add a hero image']
    },
    ctaText: {
        type: String,
        default: 'Donate Now'
    },
    ctaLink: {
        type: String,
        default: '/donate'
    },
    secondaryCtaText: {
        type: String,
        default: 'Join Our Mission'
    },
    secondaryCtaLink: {
        type: String,
        default: '/join'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Homepage', homepageSchema);
