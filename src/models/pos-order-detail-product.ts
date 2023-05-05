import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const OrderPosProductDetail = sequelize.define(
  'orderPosDetailProduct',
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
    line: {
      type: Sequelize.STRING,
    },
    pt_article: {
      type: Sequelize.STRING,
    },
    pt_bom_code: {
      type: Sequelize.STRING,
    },
    pt_formule: {
      type: Sequelize.STRING,
    },
    pt_desc1: {
      type: Sequelize.STRING,
    },
    pt_desc2: {
      type: Sequelize.STRING,
    },
    pt_loc: {
      type: Sequelize.STRING,
    },
    pt_size: {
      type: Sequelize.STRING,
    },
    pt_qty_ord_pos: Sequelize.INTEGER,
    pt_price_pos: Sequelize.DECIMAL,
    usrd_site: Sequelize.STRING,
    created_date: Sequelize.DATEONLY,
    bool05: Sequelize.BOOLEAN,
    pt_promo: {
      type: Sequelize.STRING,
    },
    pt_group: {
      type: Sequelize.STRING,
    },
    pt_part_type: {
      type: Sequelize.STRING,
    },
    pt_dsgn_grp: {
      type: Sequelize.STRING,
    },
    domain:Sequelize.STRING,
  },
  {
    tableName: 'bb_order_pos_detail_product',
  },
);
export default OrderPosProductDetail;
