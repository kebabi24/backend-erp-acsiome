import { Container } from 'typedi';

import Sequelize from 'sequelize';

const sequelize = Container.get('sequelize');

const Category_Product = sequelize.define(
  'category_product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_code: {
      type: Sequelize.STRING,
      references: {
        model: 'bb_pos_category',
        key: 'category_code',
      },
    },
    product_code: {
      type: Sequelize.STRING,
      references: {
        model: 'bb_pos_product',
        key: 'product_code',
      },
    },
    // ...base,
  },
  {
    tableName: 'bb_pos_category_product',
  },
);
export default Category_Product;
