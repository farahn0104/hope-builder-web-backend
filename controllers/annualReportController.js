const AnnualReport = require('../models/AnnualReport');
const fs = require('fs');
const path = require('path');

// @desc    Upload an annual report
// @route   POST /api/reports
// @access  Private/Admin
const uploadReport = async (req, res, next) => {
    try {
        if (!req.files || !req.files.pdfFile || !req.files.thumbnail) {
            return res.status(400).json({ success: false, message: 'Please upload both PDF and thumbnail image' });
        }

        const { title, year, description } = req.body;

        const report = await AnnualReport.create({
            title,
            year,
            description,
            thumbnail: `/uploads/${req.files.thumbnail[0].filename}`,
            pdfFile: `/uploads/${req.files.pdfFile[0].filename}`
        });

        res.status(201).json({
            success: true,
            data: report
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
const getReports = async (req, res, next) => {
    try {
        const reports = await AnnualReport.find().sort({ year: -1 });
        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a report
// @route   PUT /api/reports/:id
// @access  Private/Admin
const updateReport = async (req, res, next) => {
    try {
        let report = await AnnualReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        const updateData = { ...req.body };
        
        if (req.files) {
            if (req.files.thumbnail) {
                // Delete old thumbnail
                if (report.thumbnail) {
                    const oldPath = path.join(__dirname, '..', report.thumbnail);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                updateData.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
            }
            if (req.files.pdfFile) {
                // Delete old pdf
                if (report.pdfFile) {
                    const oldPath = path.join(__dirname, '..', report.pdfFile);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                updateData.pdfFile = `/uploads/${req.files.pdfFile[0].filename}`;
            }
        }

        report = await AnnualReport.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private/Admin
const deleteReport = async (req, res, next) => {
    try {
        const report = await AnnualReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        // Delete files from disk
        if (report.thumbnail) {
            const thumbPath = path.join(__dirname, '..', report.thumbnail);
            if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
        }
        if (report.pdfFile) {
            const pdfPath = path.join(__dirname, '..', report.pdfFile);
            if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
        }

        await report.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadReport,
    getReports,
    updateReport,
    deleteReport
};
