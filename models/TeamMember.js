const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    role: {
        type: String,
        required: [true, 'Please add a role']
    },
    photo: {
        type: String, // URL/Path
        required: [true, 'Please add a photo']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
