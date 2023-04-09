import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');

const Service = sequelize.define(
  'service',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    service_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    service_period_activate_date: { type: Sequelize.DATE },
    service_creation_date: { type: Sequelize.DATE },
    service_closing_date: { type: Sequelize.DATE },
    role_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_role',
        key: 'role_code',
      },
    },
    service_site: {
      type: Sequelize.STRING,
    },
    itinerary_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_itinerary',
        key: 'itinerary_code',
      },
    },
    service_open: { type: Sequelize.BOOLEAN },
    service_kmdep: { type: Sequelize.STRING },
    service_kmarr: { type: Sequelize.STRING },
    service_domain: Sequelize.STRING,
    // ...base,
  },
  {
    tableName: 'aa_service',
  },
);
export default Service;
