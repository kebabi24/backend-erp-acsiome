import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Address from './address';
const sequelize = Container.get('sequelize');

const ProviderBank = sequelize.define(
  'providerBank',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vdbk_addr: {
        type: Sequelize.STRING,
        references: {
            model: "vd_mstr",
            key: "vd_addr",
        },
      },
    
    vdbk_bank: Sequelize.STRING,   
    vdbk_desc: Sequelize.STRING,   
    vdbk_rib: Sequelize.STRING,
    vdbk_num: Sequelize.STRING,
     vdbk_domain: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'vdbk_mstr',
  },
);

export default ProviderBank;
