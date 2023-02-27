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
    bkh_balance: Sequelize.DECIMAL,
    bkh_type: Sequelize.STRING,

    bk_2000: Sequelize.DECIMAL,
    bk_1000: Sequelize.DECIMAL,
    bk_0500: Sequelize.DECIMAL,
    bk_0200: Sequelize.DECIMAL,
    bk_p200: Sequelize.DECIMAL,
    bk_p100: Sequelize.DECIMAL,
    bk_p050: Sequelize.DECIMAL,
    bk_p020: Sequelize.DECIMAL,
    bk_p010: Sequelize.DECIMAL,
    bk_p005: Sequelize.DECIMAL,
    bkh_site: Sequelize.STRING,
    bkh_effdate: Sequelize.DATEONLY,
    ...base,
  },
  {
    tableName: 'bkh_hist',
  },
);

export default Bkh;
