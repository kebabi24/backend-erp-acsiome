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

    nb_visits : {type: Sequelize.INTEGER ,defaultValue : 0  }, 
    nb_clients_itin : {type: Sequelize.INTEGER ,defaultValue : 0  },
    nb_invoice : {type: Sequelize.INTEGER ,defaultValue : 0  },
    nb_products_sold : {type: Sequelize.INTEGER ,defaultValue : 0  },
    nb_products_loaded : {type: Sequelize.INTEGER ,defaultValue : 0  },
    nb_clients_created : {type: Sequelize.INTEGER ,defaultValue : 0  },
    sum_invoice : {type: Sequelize.FLOAT ,defaultValue : 0  },
    sum_paiement : {type: Sequelize.FLOAT ,defaultValue : 0  },

    // ...base,
  },
  {
    tableName: 'aa_service',
  },
);
export default Service;
