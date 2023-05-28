import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Printer = sequelize.define(
  'printer',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    printer_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    printer_desc: Sequelize.STRING,
    printer_path: Sequelize.STRING,
    printer_type: Sequelize.STRING,
  },
  {
    tableName: 'printer',
  },
);
export default Printer;
