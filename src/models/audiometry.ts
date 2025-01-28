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

    audio_code: {
        type: Sequelize.STRING,
        unique: true,
    },
    audio_pat_code: {
        type: Sequelize.STRING,
        references: {
            model: "pat_mstr",
            key: "pat_code",
        },
    },


    audio_date: Sequelize.DATEONLY, 
    
    ...base,
    },
    {
    tableName: 'audio_mstr',
    },
);
export default Audiometry;
