import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const OrderPosProductSauce = sequelize.define(
  'OrderPosProductSauce',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    order_code: {
      type: Sequelize.STRING,
    },
    pt_part: {
      type: Sequelize.STRING,
    },
    pt_pt_part: {
      type: Sequelize.STRING,
    },
    pt_bom_code: {
      type: Sequelize.STRING,
    },
    pt_loc: {
      type: Sequelize.STRING,
    },
    pt_desc1: {
      type: Sequelize.STRING,
    },
    pt_desc2: {
      type: Sequelize.STRING,
    },
    pt_ord_qty: {
      type: Sequelize.STRING,
    },
    pt_price: {
      type: Sequelize.STRING,
    },
    usrd_site: Sequelize.STRING,
    created_date: Sequelize.DATEONLY,
  },
  {
    tableName: 'bb_order_pos_detail_product_sauce',
  },
);
export default OrderPosProductSauce;
