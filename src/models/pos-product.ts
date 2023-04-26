import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    product_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    product_name: Sequelize.STRING,
    product_img: Sequelize.STRING,
    product_qty: Sequelize.INTEGER,
    product_price: Sequelize.INTEGER,
    domain:Sequelize.STRING,
  },
  {
    tableName: 'bb_pos_product',
  },
);
export default Product;
