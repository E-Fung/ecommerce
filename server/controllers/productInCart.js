const ProductInCart = require('../db').ProductInCart;
const { updateOrCreate } = require('./utils');

module.exports = {
  add(req, res) {
    const newItem = { userId: req.body.userId, productId: req.body.productId, quantity: req.body.quantity };
    return updateOrCreate(ProductInCart, newItem)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return ProductInCart.findAll({
      where: {
        userId: req.body.user,
      },
      order: [['updatedAt', 'DESC']],
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
