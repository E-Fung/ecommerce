const ProductInCart = require('../db').ProductInCart;
const { updateOrCreate } = require('./utils');

module.exports = {
  add(req, res) {
    return updateOrCreate(
      ProductInCart,
      { UserId: req.body.UserId, ProductId: req.body.ProductId },
      { quantity: req.body.quantity, UserId: req.body.UserId, ProductId: req.body.ProductId }
    )
      .then((product) => console.log(product))
      .catch((error) => console.log(error));
  },
  getAllById(req, res) {
    return ProductInCart.findAll({
      where: {
        UserId: req.body.user,
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
