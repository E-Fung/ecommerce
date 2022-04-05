const OrderedProduct = require('../db').OrderedProduct;

module.exports = {
  add(req, res) {
    return OrderedProduct.create(req.body)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  getByOrder(req, res) {
    return Order.findAll({
      where: {
        orderId: req.body.orderId,
      },
    })
      .then((orders) => {
        if (!orders) {
          return res.status(404).send({
            message: 'orders not found',
          });
        }
        return res.status(200).send(orders);
      })
      .catch((error) => res.status(400).send(error));
  },
};
