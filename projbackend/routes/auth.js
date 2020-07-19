var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')

router.post('/signup', [
    check('name').isLength({ min: 3 }).withMessage('Must be at least 3 char long'),
    check('email').isEmail().withMessage('Please Enter the valid'),
    check('password').isLength({ min: 5 }).withMessage('Must be at least 5 char long')
], signup);

router.post('/signin', [
    check('email').isEmail().withMessage('email is required'),
    check('password').isLength({ min: 1}).withMessage('Password field is required')
], signin);

router.get('/signout', signout);

module.exports = router
