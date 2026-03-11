const Volunteer = require('../models/Volunteer');

// @desc    Register a volunteer
// @route   POST /api/volunteer
// @access  Public
const registerVolunteer = async (req, res, next) => {
    try {
        const { name, email, phone, city, skills, availability, message } = req.body;

        if (!name || !email || !phone || !city || !skills || !availability) {
            res.status(400);
            throw new Error('Please fill all required fields');
        }

        const application = await Volunteer.create({
            name,
            email,
            phone,
            city,
            skills,
            availability,
            message,
        });

        res.status(201).json({
            success: true,
            data: application,
            message: 'Volunteer application submitted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerVolunteer };
