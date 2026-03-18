const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    designation: {
        type: String,
        required: [true, 'Please add a designation']
    },
    photo: {
        type: String,
        required: [true, 'Please add a photo']
    },
    bio: {
        type: String,
        required: [true, 'Please add a bio']
    },
    committee: {
        type: String,
        required: [true, 'Please add a committee'],
        enum: [
            'Governing Board',
            'Founder Team',
            'Advisory Committee',
            'Finance and Audit Committee',
            'Fundraising and Partnership Committee',
            'Ethics & Compliance Committee',
            'Program Management Team'
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
