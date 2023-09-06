import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const UserPrinters = sequelize.define(
  'user_printers',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    usrd_code: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    printer_code: Sequelize.STRING,
  },
  {
    tableName: 'user_printers',
  },
);
export default UserPrinters;
