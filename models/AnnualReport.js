const mongoose = require('mongoose');

const annualReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a report title'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Please add a year']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    thumbnail: {
        type: String,
        required: [true, 'Please upload a thumbnail image']
    },
    pdfFile: {
        type: String,
        required: [true, 'Please upload a report PDF file']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AnnualReport', annualReportSchema);
