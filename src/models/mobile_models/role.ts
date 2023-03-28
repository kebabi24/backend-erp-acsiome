import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');

const Role = sequelize.define(
  'role',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    role_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    role_name: {
      type: Sequelize.STRING,
      unique: true,
    },
    user_mobile_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      // references: {
      //     model: "aa_userMobile",
      //     key: "user_mobile_code",
      // },
    },
    controller_role: {  // person who verifie loads
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'aa_userMobile',
        key: 'user_mobile_code',
      },
    },
    token_serie_code: {
      type: Sequelize.STRING,
      unique: true,
      references: {
        model: 'aa_tokenSerie',
        key: 'token_code',
      },
    },
    upper_role_code: { type: Sequelize.STRING }, // master
    role_loc: { type: Sequelize.STRING },
    role_site: { type: Sequelize.STRING },
    role_loc_from: { type: Sequelize.STRING },
    printer_adress:{type: Sequelize.STRING }
    // role_loc_from , string   , stock details - ld_det , stock info  - loc_mstr
    // ...base,
  },
  {
    tableName: 'aa_role',
  },
);
export default Role;
