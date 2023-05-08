import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const LocationFilter = sequelize.define(
  'locationFilter',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    loc_loc: {
      type: Sequelize.STRING,
      // references:{
      //     model: "loc_mstr",
      //     key: "loc_loc",
      // },
    },
    loc_site: {
      type: Sequelize.STRING,
      // references:{
      //     model: "loc_mstr",
      //     key: "loc_site",
      // },
    },
    loc_part: {
      type: Sequelize.STRING,
      // references:{
      //     model: "pt_mstr",
      //     key: "pt_part",
      // },
    },
    color: Sequelize.STRING,
    model: Sequelize.STRING,
    quality: Sequelize.STRING,
    logo: Sequelize.STRING,
    grammage: Sequelize.STRING,

    // loc_loc: Sequelize.STRING,
    // loc_site: Sequelize.STRING,
    // loc__qad01: {type: Sequelize.BOOLEAN, defaultValue : false  },
    // loc_date: Sequelize.DATEONLY,
    // loc_cap: {type: Sequelize.DECIMAL, defaultValue : 0  },

    ...base,
  },
  {
    tableName: 'locd_det',
  },
);
export default LocationFilter;
