const Volunteer = require('../models/Volunteer');

// @desc    Get impact statistics
// @route   GET /api/impact
// @access  Public
const getImpactStats = async (req, res, next) => {
    try {
        // In a real application, some of these might come from database counts
        // For example, volunteer count can come from the Volunteer collection
        // The rest can be either hardcoded goals/achievements or derived from other collections
        // Here we will mock some and fetch real ones where possible.

        const volunteersJoined = await Volunteer.countDocuments();

        // To make it dynamic, maybe an admin editable Impact model could be used.
        // However, since we don't have an Impact model requested, we will return static + dynamic
        res.status(200).json({
            success: true,
            data: {
                childrenEducated: 5200,
                mealsServed: 10500,
                volunteersJoined: volunteersJoined + 120, // Add a base offset to show initial impact
                healthCamps: 45,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getImpactStats };
