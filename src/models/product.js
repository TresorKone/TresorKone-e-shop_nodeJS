'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Cart, {
        through: 'CartItems'
      });

      Product.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(500),
    imageUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};