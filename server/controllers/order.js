const Order = require('../db').Order;

module.exports = {
  add(req, res) {
    return Product.create(req.body)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  getByUser(req, res) {
    return Order.findAll({
      where: {
        userId: req.body.userId,
      },
      order: [['createdAt', 'DESC']],
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
