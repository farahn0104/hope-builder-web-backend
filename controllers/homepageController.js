const Homepage = require('../models/Homepage');

// @desc    Get homepage content
// @route   GET /api/homepage
// @access  Public
const getHomepage = async (req, res, next) => {
    try {
        let homepage = await Homepage.findOne();
        if (!homepage) {
            // Provide default if none exists
            homepage = {
                heroTitle: "Empowering Lives, Building Futures",
                heroDescription: "HopeRise Foundation works to uplift communities through education, healthcare, nutrition, and women's empowerment across India.",
                heroImage: "/assets/hero-education.jpg",
                ctaText: "Donate Now",
                ctaLink: "/donate",
                secondaryCtaText: "Join Our Mission",
                secondaryCtaLink: "/join"
            };
        }
        res.status(200).json({ success: true, data: homepage });
    } catch (error) {
        next(error);
    }
};

// @desc    Update homepage content
// @route   PUT /api/homepage
// @access  Private/Admin
const updateHomepage = async (req, res, next) => {
    try {
        let homepage = await Homepage.findOne();
        const updateData = { ...req.body };

        if (req.file) {
            updateData.heroImage = `/uploads/${req.file.filename}`;
        }

        if (homepage) {
            homepage = await Homepage.findByIdAndUpdate(homepage._id, updateData, {
                new: true,
                runValidators: true
            });
        } else {
            homepage = await Homepage.create(updateData);
        }

        res.status(200).json({ success: true, data: homepage });
    } catch (error) {
        next(error);
    }
};

module.exports = { getHomepage, updateHomepage };
