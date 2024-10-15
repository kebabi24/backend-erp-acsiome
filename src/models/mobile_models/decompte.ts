import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Decompte = sequelize.define(
  'decompte',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    dec_code: Sequelize.STRING,
    dec_role: Sequelize.STRING,
    dec_desc: Sequelize.STRING,
    dec_effdate: Sequelize.DATEONLY,
    dec_amt: {type: Sequelize.FLOAT, defaultValue : 0  },
    dec_type: Sequelize.STRING,
    dec_domain: Sequelize.STRING,
    ...base,
    
    },
  {
    tableName: 'aa_decompte',
  },
);
export default Decompte;
