import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const PatientDetail = sequelize.define(
  'patientDetail',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    patd_code: {
        type: Sequelize.STRING,
        references: {
          model: 'pat_mstr',
          key: 'pat_code',
        },
      },
  
      patd_type: Sequelize.STRING,
      patd_disease: Sequelize.STRING,

      patd_year: { type: Sequelize.INTEGER, defaultValue: 0 },  
      patd_cmmt: Sequelize.TEXT,
      patd_domain: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'patd_det',
  },
);
export default PatientDetail;
