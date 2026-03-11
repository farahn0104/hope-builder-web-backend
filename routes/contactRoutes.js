const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
    .post(submitContact)
    .get(protect, admin, getContacts);

module.exports = router;
