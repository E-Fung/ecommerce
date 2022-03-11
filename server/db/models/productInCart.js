'use strict';
const { Model } = require('sequelize');
//each cart belongs to one owner,
//has many products

//user id, why do we need cart? to store persisting data of wanted products?

//connected to products via table

module.exports = (sequelize, DataTypes) => {
  class ProductInCart extends Model {}
  ProductInCart.init(
    {
      productInCartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize, //connection instance
      modelName: 'ProductInCart',
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
    }
  );
  return ProductInCart;
};
