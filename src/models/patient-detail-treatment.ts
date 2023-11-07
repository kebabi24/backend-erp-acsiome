import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const PatientDetailTreatment = sequelize.define(
  'patientDetailTreatment',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    patdt_code: {
        type: Sequelize.STRING,
        references: {
          model: 'pat_mstr',
          key: 'pat_code',
        },
      },
  
      patdt_type: Sequelize.STRING,
      patdt_disease: Sequelize.STRING,
      patdt_treatment: Sequelize.STRING,
      patdt_doc: Sequelize.STRING,
      patdt_cmmt: Sequelize.TEXT,
      patdt_domain: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'patdt_det',
  },
);
export default PatientDetailTreatment;
