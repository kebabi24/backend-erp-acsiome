import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const CustomerOrders = sequelize.define(
  'customerOrders',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    lad_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    lad_nbr: Sequelize.STRING,
    lad_carrier: Sequelize.STRING,
    lad_addr: Sequelize.STRING,
    lad_qty_ord: Sequelize.STRING,
    lad_qty_chg: Sequelize.STRING,
    lad_lot: Sequelize.STRING,
    lad_domain: Sequelize.STRING,
  },
  {
    tableName: 'lad_det',
  },
);
export default CustomerOrders;
