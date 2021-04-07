const express = require('express')

const {userById} = require('../middlewares/user');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

const {generateToken, processPayment} = require('./../controllers/braintreeController')

const router = express.Router();


router.get('/getToken/:userId', [requireSignIn, isAuth], generateToken);
router.post('/purchase/:userId', [requireSignIn, isAuth], processPayment);

router.param('userId', userById)


module.exports = router