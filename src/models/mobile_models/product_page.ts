import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');

const ProductPage = sequelize.define(
  'productPage',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    product_page_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
    },

    // profile_code:{
    //     type: Sequelize.STRING,
    //     unique: true,
    //     references: {
    //         model: "aa_profile",
    //         key: "profile_code",
    //     },
    // }

    // ...base
  },
  {
    tableName: 'aa_productPage',
  },
);
export default ProductPage;
