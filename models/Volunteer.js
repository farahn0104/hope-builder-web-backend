const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema(
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
        city: {
            type: String,
            required: [true, 'Please add a city'],
        },
        skills: {
            type: String,
            required: [true, 'Please add your skills'],
        },
        availability: {
            type: String,
            required: [true, 'Please specify your availability'],
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
