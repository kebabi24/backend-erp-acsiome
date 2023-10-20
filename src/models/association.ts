import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Association = sequelize.define(
  'association',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    ass_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    ass_name: Sequelize.STRING,
    ass_line1: Sequelize.STRING,
    ass_line2: Sequelize.STRING,
    ass_line3: Sequelize.STRING,
    ass_country: Sequelize.STRING,
    ass_city: Sequelize.STRING,
    ass_county: Sequelize.STRING,
    ass_state: Sequelize.STRING,
    ass_zip: Sequelize.INTEGER,
    ass_phone: Sequelize.STRING,
    ass_fax: Sequelize.STRING,
    ass_mail: Sequelize.STRING,
    ass_contact_fname: Sequelize.STRING,
    ass_contact_lname: Sequelize.STRING,
    ass_contact_adress: Sequelize.STRING,
    ass_contact_tel: Sequelize.STRING,
    ass_domain: Sequelize.STRING,

    ...base,
  },
  {
    tableName: 'ass_mstr',
  },
);
export default Association;
