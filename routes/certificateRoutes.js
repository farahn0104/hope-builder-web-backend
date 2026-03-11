const express = require('express');
const router = express.Router();
const {
    uploadCertificate,
    getCertificates,
    updateCertificate,
    deleteCertificate
} = require('../controllers/certificateController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getCertificates)
    .post(protect, admin, upload.single('image'), uploadCertificate);

router.route('/:id')
    .put(protect, admin, upload.single('image'), updateCertificate)
    .delete(protect, admin, deleteCertificate);

module.exports = router;
