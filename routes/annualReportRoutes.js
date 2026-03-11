const express = require('express');
const router = express.Router();
const {
    uploadReport,
    getReports,
    updateReport,
    deleteReport
} = require('../controllers/annualReportController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getReports)
    .post(protect, admin, upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'pdfFile', maxCount: 1 }
    ]), uploadReport);

router.route('/:id')
    .put(protect, admin, upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'pdfFile', maxCount: 1 }
    ]), updateReport)
    .delete(protect, admin, deleteReport);

module.exports = router;
