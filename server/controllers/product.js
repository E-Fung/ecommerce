const Product = require('../db').Product;
const { Op } = require('@sequelize/core');

const ProductCategory = (param) => {
  switch (param) {
    case 'men':
      return "men's clothing";
    case 'women':
      return "women's clothing";
    case 'jewelery':
      return 'jewelery';
    case 'electronics':
      return 'electronics';
    default:
      return '';
  }
};

module.exports = {
  add(req, res) {
    return Product.create(req.body)
      .then((product) => res.status(201).send(product))
      .catch((error) => res.status(400).send(error));
  },
  getProducts(req, res) {
    const category = req.query['category'];
    const filters = {};
    if (category) {
      filters.category = ProductCategory(category);
    }
    return Product.findAll({ where: filters })
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
  getByName(req, res) {
    const name = req.query['name'];
    return Product.findOne({ where: { name: { [Op.startsWith]: name } } })
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
  getById(req, res) {
    const productId = req.query['productId'];
    return Product.findOne({ where: { productId: productId } })
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
  update(req, res) {
    return Product.findOne({ where: { productId: req.body.productId } })
      .then(async (product) => {
        if (product) {
          product.totalPurchased += req.body.quantity;
          await product.save();
          return res.status(200).send(product);
        }
      })
      .catch((error) => res.status(400).send(error));
  },
};
