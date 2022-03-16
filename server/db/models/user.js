'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
        get() {
          return () => this.getDataValue('password');
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        alloWNull: false,
        validate: {
          isEmail: true,
        },
      },
      photoUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize, //connection instance
      modelName: 'User',
      timestamps: false,
      freezeTableName: true,
    }
  );

  User.prototype.correctPassword = async (password) => {
    return await bcrypt.compare(password, this.password, function (err, res) {
      if (err) {
        // handle error
      }
    });
  };

  const setSaltAndPassword = async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password(), 10);
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);
  User.beforeBulkCreate((users) => {
    users.forEach(setSaltAndPassword);
  });
  return User;
};
