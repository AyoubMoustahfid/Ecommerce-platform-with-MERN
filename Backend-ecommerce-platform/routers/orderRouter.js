const express = require('express');
const {userById, addProductsUserHistory, increasePriceTotal} = require('../middlewares/user');
const {decreaseQuantity} = require('../middlewares/product')
const {orderById}  = require('./../middlewares/order')
const {create, listOrders, getStatus, updateOrderStatus} = require('./../controllers/orderController')
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');


const router = express.Router();

router.get('/:userId', [requireSignIn, isAuth, isAdmin], listOrders)
router.get('/status/:userId', [requireSignIn, isAuth, isAdmin], getStatus)
router.patch('/:orderId/status/:userId', [requireSignIn, isAuth, isAdmin], updateOrderStatus)

router.post('/create/:userId', [requireSignIn, isAuth, addProductsUserHistory, decreaseQuantity, increasePriceTotal], create)



router.param('userId', userById)
router.param('orderId', orderById)


module.exports = router