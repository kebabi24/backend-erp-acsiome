import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const ItemModel = sequelize.define(
  'model',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    mod_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    mod_desc: Sequelize.STRING,
    mod_um: Sequelize.STRING,
    mod_prod_line: {
      type: Sequelize.STRING,
      // references: {
      //   model: 'pl_mstr',
      //   key: 'pl_prod_line',
      // },
    },
    mod_part_type: Sequelize.STRING,
    mod_draw: Sequelize.STRING,
    mod_group: Sequelize.STRING,

    mod_dsgn_grp: Sequelize.STRING,
    mod_origin: Sequelize.STRING,
    mod_drwg_loc: Sequelize.STRING,
    mod_status: Sequelize.STRING,
    
    mod_abc: Sequelize.STRING,
    mod_site: {
      type: Sequelize.STRING,
      references: {
        model: 'si_mstr',
        key: 'si_site',
      },
    },
    mod_loc: {
      type: Sequelize.STRING,
      references: {
        model: 'loc_mstr',
        key: 'loc_loc',
      },
    },
    mod_iss_pol: { type: Sequelize.BOOLEAN, defaultValue: false }, 
    mod_domain: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'mod_mstr',
  },
);
export default ItemModel;
