const Product = require('../db').Product;

//see if you can combine getAll with a whereParams={} object

module.exports = {
  add(req, res) {
    return Product.create(req.body)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  getAllByCategory(req, res) {
    return Product.findAll({
      where: {
        category: req.body.category,
      },
    })
      .then((products) => {
        if (!products) {
          return res.status(404).send({
            message: 'products not found',
          });
        }
        return res.status(200).send(products);
      })
      .catch((error) => res.status(400).send(error));
  },
  getAll(req, res) {
    console.log('Getting All');
    return Product.findAll()
      .then((products) => {
        if (!products) {
          return res.status(404).send({
            message: 'products not found',
          });
        }
        return res.status(200).send(products);
      })
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return Product.findOne({ where: { id: req.body.id } })
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            message: 'product not found',
          });
        }
        return res.status(200).send(product);
      })
      .catch((error) => res.status(400).send(error));
  },
};
