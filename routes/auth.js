
const { Router } = require('express');
const router = new Router();
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;