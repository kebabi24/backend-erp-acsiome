import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Delivery = sequelize.define(
  'delivery',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    del_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    del_desc: Sequelize.STRING,
    del_pct_disc: Sequelize.INTEGER,
    del_part_gift: Sequelize.STRING,
    del_pct_part_gift: Sequelize.STRING,
    del_cndt_actif: {type: Sequelize.BOOLEAN, defaultValue : false  },
    del_cndt: Sequelize.STRING,
    del_cndt_qty: Sequelize.STRING,
    del_valid: Sequelize.DATEONLY,
    del_exp: Sequelize.DATEONLY,
    del_start_offer: Sequelize.TIME,
    del_end_offer: Sequelize.TIME,
    actif: {type: Sequelize.BOOLEAN, defaultValue : false  },
  },
  {
    tableName: 'delivery',
  },
);
export default Delivery;
