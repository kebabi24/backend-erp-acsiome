import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Audiometry = sequelize.define(
  'audiometry',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    aud_code: {
        type: Sequelize.STRING,
        unique: true,
    },
    aud_pat_code: {
        type: Sequelize.STRING,
        references: {
            model: "pat_mstr",
            key: "pat_code",
        },
    },


    aud_date: Sequelize.DATEONLY, 
    
    ...base,
    },
    {
    tableName: 'aud_mstr',
    },
);
export default Audiometry;
