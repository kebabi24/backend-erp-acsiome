import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const AddReport = sequelize.define(
  'AddReport',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    pmr_nbr: Sequelize.STRING,
    pmr_pm_code: Sequelize.STRING,
    pmr_site: Sequelize.STRING,
    pmr_inst: Sequelize.STRING,
    pmr_task: Sequelize.STRING,
    pmr_task_status: Sequelize.STRING,
    pmr_start_date: Sequelize.DATEONLY,
    pmr_end_date: Sequelize.DATEONLY,
    pmr_internal: Sequelize.BOOLEAN,
    pmr_present:Sequelize.BOOLEAN,
    pmr_dissipated:Sequelize.BOOLEAN,
    pmr_acted:Sequelize.BOOLEAN,
    pmr_mastered:Sequelize.BOOLEAN,

    pmr_close: { type: Sequelize.BOOLEAN, defaultValue: false },
    pmr_employe: Sequelize.STRING,
    pmr_duration: Sequelize.DECIMAL,
    pmr_cmmt: Sequelize.TEXT,
    pmr_domain: Sequelize.STRING,
     
    ...base,
  },
  {
    tableName: 'pmr_det',
  },
);
export default AddReport;
