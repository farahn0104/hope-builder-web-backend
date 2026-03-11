const About = require('../models/About');

// @desc    Get about page content
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res, next) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = {
                ngoIntroduction: "Since 2010, HopeRise Foundation has been dedicated to creating lasting change in the lives of underprivileged communities.",
                mission: "To empower marginalized communities by providing access to quality education, healthcare, and sustainable livelihood opportunities.",
                vision: "A society where every individual has equal opportunities to thrive and live with dignity."
            };
        }
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        next(error);
    }
};

// @desc    Update about page content
// @route   PUT /api/about
// @access  Private/Admin
const updateAbout = async (req, res, next) => {
    try {
        let about = await About.findOne();
        if (about) {
            about = await About.findByIdAndUpdate(about._id, req.body, {
                new: true,
                runValidators: true
            });
        } else {
            about = await About.create(req.body);
        }
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAbout, updateAbout };
