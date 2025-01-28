import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Audiogram = sequelize.define(
  'audiogram',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

        

    audd_code: {
        type: Sequelize.STRING,
        references: {
            model: "audio_mstr",
            key: "audio_code",
        },
    },


    
    frequency :Sequelize.INTEGER,
    right_ear_os :Sequelize.INTEGER,
    left_ear_os :Sequelize.INTEGER,

    right_ear_ar :Sequelize.INTEGER,
    left_ear_ar :Sequelize.INTEGER,

    ...base,
    },
    {
    tableName: 'audd_det',
    },
);
export default Audiogram;
