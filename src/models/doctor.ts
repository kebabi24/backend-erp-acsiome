import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Doctor = sequelize.define(
  'doctor',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    doc_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    doc_name: Sequelize.STRING,
    doc_line1: Sequelize.STRING,
    doc_line2: Sequelize.STRING,
    doc_line3: Sequelize.STRING,
    doc_country: Sequelize.STRING,
    doc_city: Sequelize.STRING,
    doc_county: Sequelize.STRING,
    doc_state: Sequelize.STRING,
    doc_zip: Sequelize.INTEGER,
    doc_phone: Sequelize.STRING,
    doc_fax: Sequelize.STRING,
    doc_mail: Sequelize.STRING,
    doc_spec: Sequelize.STRING,
    // doc_contact_fname: Sequelize.STRING,
    // doc_contact_lname: Sequelize.STRING,
    // doc_contact_adress: Sequelize.STRING,
    // doc_contact_tel: Sequelize.STRING,
    doc_domain: Sequelize.STRING,

    ...base,
  },
  {
    tableName: 'doc_mstr',
  },
);
export default Doctor;
