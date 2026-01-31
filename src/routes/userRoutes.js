const express = require('express');
const UserController = require('../controllers/userController');
const { validate, schemas } = require('../middleware/validator');

const router = express.Router();

router.post('/', validate(schemas.userRegister), UserController.register);

module.exports = router;
