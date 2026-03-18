const mongoose = require('mongoose');

const happeningSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        image: {
            type: String,
            required: [true, 'Please add a thumbnail image'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
            default: Date.now
        },
        excerpt: {
            type: String,
            required: [true, 'Please add a short excerpt'],
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Happening', happeningSchema);
