const express = require('express');
const router = express.Router();
const validateCreateUser = require('../middlewares/validateCreateUser');
const { register, login } = require('../controllers/authController');

router.post('/register', validateCreateUser, register);
router.post('/login', login);
module.exports = router;
