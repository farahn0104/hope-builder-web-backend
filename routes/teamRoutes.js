const express = require('express');
const router = express.Router();
const { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getTeamMembers)
    .post(protect, admin, upload.single('photo'), createTeamMember);

router.route('/:id')
    .put(protect, admin, upload.single('photo'), updateTeamMember)
    .delete(protect, admin, deleteTeamMember);

module.exports = router;
