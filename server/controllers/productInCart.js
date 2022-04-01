const ProductInCart = require('../db').ProductInCart;
const Product = require('../db').Product;
const { updateOrCreate } = require('./utils');

module.exports = {
  add(req, res) {
    //Good, only used for integrating cart prior to register/login
    const newItem = { userId: req.user.userId, productId: req.body.productId, quantity: req.body.quantity };
    return updateOrCreate(ProductInCart, newItem)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return ProductInCart.findOne({
      where: {
        userId: req.user.userId,
        productId: req.body.productId,
      },
    })
      .then(async (item) => {
        await item.destroy();
        res.sendStatus(204);
      })
      .catch((error) => res.status(400).send(error));
  },
  adjust(req, res) {
    return ProductInCart.findOne({
      where: {
        userId: req.user.userId,
        productId: req.body.productId,
      },
    })
      .then(async (item) => {
        item.quantity = req.body.quantity;
        await item.save();
        return res.status(200).send(item);
      })
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    //Good
    return ProductInCart.findAll({
      where: {
        userId: req.user.userId,
      },
      order: [['updatedAt', 'DESC']],
      include: {
        model: Product,
        required: true,
      },
    })
      .then((ProductInCart) => {
        if (!ProductInCart) {
          return res.status(404).send({
            message: 'ProductInCart not found',
          });
        }
        return res.status(200).send(ProductInCart);
      })
      .catch((error) => res.status(400).send(error));
  },
};
//alterQuantity
