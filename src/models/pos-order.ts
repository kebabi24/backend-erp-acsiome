import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const OrderPos = sequelize.define(
  'orderPos',
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

    customer: Sequelize.STRING,
    order_emp: Sequelize.STRING,
    status: Sequelize.STRING,
    usrd_site: Sequelize.STRING,
    total_price: Sequelize.INTEGER,
    created_date: Sequelize.DATEONLY,
  },
  {
    tableName: 'bb_order_pos',
  },
);
export default OrderPos;
