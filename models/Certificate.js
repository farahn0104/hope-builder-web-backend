const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a certificate title'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    issuingOrganization: {
        type: String,
        required: [true, 'Please add issuing organization']
    },
    issueDate: {
        type: Date,
        required: [true, 'Please add issue date']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
