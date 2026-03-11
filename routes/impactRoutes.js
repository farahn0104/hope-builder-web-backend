const express = require('express');
const router = express.Router();
const { getImpactStats } = require('../controllers/impactController');

router.get('/', getImpactStats);

module.exports = router;
