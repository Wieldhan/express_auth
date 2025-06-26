const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleMiddleware');
const canUpdateUser = require('../middlewares/canUpdateUser');
const validateUpdateUser = require('../middlewares/validateUpdateUser');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authJWT } = require('../middlewares/authMiddleware');

router.get('/', authJWT, getUsers);
router.get('/:id', authJWT, getUserById);
router.put('/:id', authJWT, canUpdateUser, validateUpdateUser, updateUser);
router.delete('/:id', authJWT, roleMiddleware('administrator'), deleteUser);

module.exports = router;
