'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      photoUrl: {
        type: DataTypes.STRING,
      },
      totalPurchased: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      sequelize,
      modelName: 'Product',
      timestamps: false,
    }
  );
  return Product;
};
