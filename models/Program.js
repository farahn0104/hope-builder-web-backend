const mongoose = require('mongoose');
const slugify = require('slugify');

const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a program title'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description']
    },
    fullDescription: {
        type: String,
        required: [true, 'Please add a full description']
    },
    heroImage: {
        type: String,
        required: [true, 'Please add a hero image']
    },
    galleryImages: [String],
    startDate: {
        type: Date
    },
    location: {
        type: String
    },
    objectives: [String],
    status: {
        type: String,
        enum: ['active', 'completed', 'upcoming'],
        default: 'active'
    },
    impact: [{
        label: String,
        value: String
    }],
}, {
    timestamps: true
});

// Create program slug from the title
programSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Program', programSchema);
