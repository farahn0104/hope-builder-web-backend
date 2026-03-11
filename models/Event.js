const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            required: [true, 'Please add description'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
