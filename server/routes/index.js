var express = require('express');
var router = express.Router();

const orderController = require('../controllers').order;
const orderedProductController = require('../controllers').orderedProduct;
const productController = require('../controllers').product;
const productInCartController = require('../controllers').productInCart;
const userController = require('../controllers').user;

//Order
router.post('./order', orderController.add);
router.get('./order', orderController.getByUser);

//OrderedProduct
router.post('./orderedProducts', orderedProductController.add);
router.post('./orderedProducts/:orderId', orderedProductController.getByOrder);

//Product
router.post('/product', productController.add);
router.get('/product', productController.getAll);
router.post('/product/category', productController.getAllByCategory);
router.post('/productById', productController.getById);

router.post('/cart', productInCartController.add);

//User
router.post('user', userController.alterPhoto);

//User Auth
router.get('auth/user', userController.getUser);
router.post('auth/register', userController.register);
router.post('auth/login', userController.login);

module.exports = router;

// authentication
// make sure that name n password is correct

// authorization
// jwt tokens making sure that the user who sends request is the same as the one who logged in
// creates a session that the user then sends when making request

// usually, the client logs in, seesion id is recieved as cookie, then user sends another request w the session id as authorization
// jwts send the user infomation to the client, information is stored w the client, the request are now deciphered by the server when request are sent
