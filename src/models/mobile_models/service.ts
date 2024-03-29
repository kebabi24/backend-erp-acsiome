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
    service_period_activate_date: { type: Sequelize.DATEONLY },
    service_creation_date: { type: Sequelize.DATE },
    service_closing_date: { type: Sequelize.DATE },
    role_code: {
      type: Sequelize.STRING,
      references: {
        model: 'aa_role',
        key: 'role_code',
      },
    },
    user_mobile_code : Sequelize.STRING,
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
    // frais: { type: Sequelize.STRING },
    service_domain: Sequelize.STRING,

    nb_visits : Sequelize.INTEGER ,
    nb_clients_itin : Sequelize.INTEGER ,
    nb_invoice : Sequelize.INTEGER ,
    nb_products_sold : Sequelize.INTEGER,
    nb_products_loaded : Sequelize.INTEGER,
    nb_clients_created : Sequelize.INTEGER,
    sum_invoice : Sequelize.FLOAT,
    sum_paiement : Sequelize.FLOAT,

    // ...base,
  },
  {
    tableName: 'aa_service',
  },
);
export default Service;
