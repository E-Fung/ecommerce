const Order = require('../db').Order;

//get all by id, should i do some pagination function?

module.exports = {
  getAllById(req, res) {
    return Order.findAll({
      where: {
        UserEmail: req.body.email,
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
