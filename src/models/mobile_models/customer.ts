import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');

const CustomerMobile = sequelize.define(
  'customerMobile',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    customer_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    customer_name: { type: Sequelize.STRING },
    customer_name2: { type: Sequelize.STRING },
    customer_arabic_name: { type: Sequelize.STRING },
    customer_phone_one: { type: Sequelize.STRING },
    customer_phone_two: { type: Sequelize.STRING },
    customer_email: { type: Sequelize.STRING },
    customer_fax: { type: Sequelize.STRING },
    customer_web_adr: { type: Sequelize.STRING },
    customer_contact: { type: Sequelize.STRING },
    customer_branch_code: { type: Sequelize.STRING },
    customer_barcode: { type: Sequelize.STRING },

    // addresse data
    address_one: { type: Sequelize.STRING },
    address_two: { type: Sequelize.STRING },
    address_extended: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    postal_code: { type: Sequelize.STRING },
    state: { type: Sequelize.STRING },
    country: { type: Sequelize.STRING },
    geoarea_code: { type: Sequelize.STRING },
    longitude: { type: Sequelize.STRING },
    latitude: { type: Sequelize.STRING },

    balance:{type: Sequelize.DOUBLE},

    // category and cluster
    category_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_category',
        key: 'category_code',
      },
    },

    category_type_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_categoryType',
        key: 'category_type_code',
      },
    },

    cluster_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_cluster',
        key: 'cluster_code',
      },
    },

    sub_cluster_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_subCluster',
        key: 'sub_cluster_code',
      },
    },

    // sale chanel
    sales_channel_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_salesChannel',
        key: 'sales_channel_code',
      },
    },
    pricelist_code: Sequelize.STRING,
    payment_method_code:Sequelize.STRING,
    limit_credit: {type: Sequelize.FLOAT, defaultValue:0}
    // ...base,
  },
  {
    tableName: 'aa_customer',
  },
);
export default CustomerMobile;
