import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');

const LoadRequestLine = sequelize.define(
  'loadRequestLine',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    date_creation: { type: Sequelize.DATEONLY },
    date_charge: { type: Sequelize.DATEONLY },
    line: { type: Sequelize.INTEGER },

    product_code: {
      type: Sequelize.STRING,
      references: {
        model: "pt_mstr",
        key: "pt_part",
      },
    },

    load_request_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_loadrequest',
        key: 'load_request_code',
      },
    },

    qt_request: { type: Sequelize.DOUBLE },
    qt_validated: { type: Sequelize.DOUBLE },
    qt_effected: { type: Sequelize.DOUBLE },
    pt_price: { type: Sequelize.DOUBLE },

    // ...base
  },
  {
    tableName: 'aa_loadrequestline',
  },
);
export default LoadRequestLine;
