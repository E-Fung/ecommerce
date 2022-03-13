const ProductInCart = require('../db').ProductInCart;
const { updateOrCreate } = require('./utils');

module.exports = {
  add(req, res) {
    return updateOrCreate(
      ProductInCart,
      { userId: req.body.userId, ProductId: req.body.ProductId },
      { quantity: req.body.quantity, userId: req.body.userId, ProductId: req.body.ProductId }
    )
      .then((product) => console.log(product))
      .catch((error) => console.log(error));
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
