import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const OrdersHistory = sequelize.define(
  'ordersHistory',
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
    pt_part: Sequelize.STRING,
    ord_amt: Sequelize.DECIMAL,
    usrd_site: Sequelize.STRING,
    order_emp: Sequelize.STRING,
    deleted_date: Sequelize.DATEONLY,
    domain:Sequelize.STRING,
  },
  {
    tableName: 'orders_history',
  },
);
export default OrdersHistory;
