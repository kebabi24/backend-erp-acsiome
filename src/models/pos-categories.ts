import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Categories = sequelize.define(
  'categories',
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
    category_profile: Sequelize.STRING,
    rang: Sequelize.INTEGER,
    direct: Sequelize.BOOLEAN,
  },
  {
    tableName: 'bb_pos_category',
  },
);
export default Categories;
