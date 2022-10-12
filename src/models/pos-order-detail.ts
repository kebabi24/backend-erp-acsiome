import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const OrderPosDetail = sequelize.define(
  'orderPosDetail',
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
      references: {
        model: 'pt_mstr',
        key: 'pt_part',
      },
    },
    pt_part_det: {
      type: Sequelize.STRING,
      references: {
        model: 'pt_mstr',
        key: 'pt_part',
      },
    },
    created_date: Sequelize.DATEONLY,
  },
  {
    tableName: 'bb_order_pos_detail',
  },
);
export default OrderPosDetail;
