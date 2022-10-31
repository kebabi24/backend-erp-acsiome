import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Categories = sequelize.define(
  'category',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    category_name: Sequelize.STRING,
    category_img: Sequelize.STRING,
    rang: Sequelize.INTEGER,
  },
  {
    tableName: 'bb_pos_category',
  },
);
export default Categories;
