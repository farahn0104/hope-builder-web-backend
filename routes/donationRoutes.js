const express = require('express');
const router = express.Router();
const { submitDonationIntent } = require('../controllers/donationController');

router.post('/', submitDonationIntent);

module.exports = router;
