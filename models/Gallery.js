const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        image: {
            type: String,
            required: [true, 'Please add an image url'],
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Gallery', gallerySchema);
