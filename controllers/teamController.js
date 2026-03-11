const TeamMember = require('../models/TeamMember');
const fs = require('fs');
const path = require('path');

// @desc    Get all team members (volunteers)
// @route   GET /api/teammembers
// @access  Public
const getTeamMembers = async (req, res, next) => {
    try {
        const members = await TeamMember.find();
        res.status(200).json({ success: true, count: members.length, data: members });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a team member
// @route   POST /api/teammembers
// @access  Private/Admin
const createTeamMember = async (req, res, next) => {
    try {
        const { name, role, description } = req.body;
        const memberData = { name, role, description };

        if (req.file) {
            memberData.photo = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({ success: false, message: 'Please upload a photo' });
        }

        const member = await TeamMember.create(memberData);
        res.status(201).json({ success: true, data: member });
    } catch (error) {
        next(error);
    }
};

// @desc    Update team member
// @route   PUT /api/teammembers/:id
// @access  Private/Admin
const updateTeamMember = async (req, res, next) => {
    try {
        let member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

        const updateData = { ...req.body };
        if (req.file) {
            if (member.photo) {
                const oldPath = path.join(__dirname, '..', member.photo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updateData.photo = `/uploads/${req.file.filename}`;
        }

        member = await TeamMember.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: member });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete team member
// @route   DELETE /api/teammembers/:id
// @access  Private/Admin
const deleteTeamMember = async (req, res, next) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

        if (member.photo) {
            const photoPath = path.join(__dirname, '..', member.photo);
            if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
        }

        await member.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };
