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
    site_loc: Sequelize.STRING,
    order_emp: Sequelize.STRING,
    status: Sequelize.STRING,
    loy_num: Sequelize.INTEGER,
    disc_amt: Sequelize.DECIMAL,
    del_comp: Sequelize.STRING,
    usrd_site: Sequelize.STRING,
    from: Sequelize.STRING,
    total_price: Sequelize.DECIMAL,
    created_date: Sequelize.DATEONLY,
  },
  {
    tableName: 'bb_order_pos',
  },
);
export default OrderPos;
