const Certificate = require('../models/Certificate');
const fs = require('fs');
const path = require('path');

// @desc    Upload a certificate
// @route   POST /api/certificates
// @access  Private/Admin
const uploadCertificate = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const { title, issuingOrganization, issueDate, description } = req.body;

        const certificate = await Certificate.create({
            title,
            issuingOrganization,
            issueDate,
            description,
            image: `/uploads/${req.file.filename}`
        });

        res.status(201).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: certificates.length,
            data: certificates
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
const updateCertificate = async (req, res, next) => {
    try {
        let certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }

        const updateData = { ...req.body };
        
        if (req.file) {
            // Delete old file if exists
            if (certificate.image) {
                const oldPath = path.join(__dirname, '..', certificate.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        certificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
const deleteCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }

        // Delete file from disk
        if (certificate.image) {
            const filePath = path.join(__dirname, '..', certificate.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await certificate.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadCertificate,
    getCertificates,
    updateCertificate,
    deleteCertificate
};
