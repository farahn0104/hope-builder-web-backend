const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    ngoIntroduction: {
        type: String,
        required: [true, 'Please add NGO introduction']
    },
    mission: {
        type: String,
        required: [true, 'Please add mission statement']
    },
    vision: {
        type: String,
        required: [true, 'Please add vision statement']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
