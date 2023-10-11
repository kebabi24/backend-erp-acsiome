import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Patient = sequelize.define(
  'patient',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    pat_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    pat_fname: Sequelize.STRING,
    pat_lname: Sequelize.STRING,
    pat_birth_date: Sequelize.DATEONLY,
    pat_sex: Sequelize.STRING,
    pat_familysit: Sequelize.STRING,
    pat_line1: Sequelize.STRING,
    pat_line2: Sequelize.STRING,
    pat_line3: Sequelize.STRING,
    pat_ss_id: Sequelize.STRING,
    pat_country: Sequelize.STRING,
    pat_city: Sequelize.STRING,
    pat_county: Sequelize.STRING,
    pat_state: Sequelize.STRING,
    pat_zip: Sequelize.INTEGER,
    pat_phone: Sequelize.STRING,
    pat_fax: Sequelize.STRING,
    pat_mail: Sequelize.STRING,
    pat_job: Sequelize.STRING,
    pat_site: Sequelize.STRING,
    pat_child_nbr: { type: Sequelize.INTEGER, defaultValue: 0 },
    pat_blood: Sequelize.STRING,
    pat_contact_fname: Sequelize.STRING,
    pat_contact_lname: Sequelize.STRING,
    pat_contact_adress: Sequelize.STRING,
    pat_contact_tel: Sequelize.STRING,
    pat_parent_liaison: Sequelize.STRING,
    pat_domain: Sequelize.STRING,

    ...base,
  },
  {
    tableName: 'pat_mstr',
  },
);
export default Patient;
