import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Address from './address';
const sequelize = Container.get('sequelize');

const Bkh = sequelize.define(
  'bkh',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bkh_code: {
      type: Sequelize.STRING,
    },
    bkh_num_doc: {
      type: Sequelize.STRING,
    },
    bkh_date: {
      type: Sequelize.DATE,
    },
    bkh_balance: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_addr: Sequelize.STRING,
    bkh_bank: Sequelize.STRING,
    bkh_type: Sequelize.STRING,
    bkh_2000: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_1000: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_0500: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_0200: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p200: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p100: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p050: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p020: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p010: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_p005: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_bon: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_rmks: Sequelize.STRING,
    bkh_site: Sequelize.STRING,
    bkh_amt: { type: Sequelize.DECIMAL, defaultValue: 0 },
    bkh_effdate: Sequelize.DATEONLY,
    bkh_domain: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'bkh_hist',
  },
);

export default Bkh;
