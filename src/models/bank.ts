import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Address from './address';
const sequelize = Container.get('sequelize');

const Bank = sequelize.define(
  'bank',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bk_code: {
      type: Sequelize.STRING,
      unique: true,
      // references: {
      //   model: 'ad_mstr',
      //   key: 'ad_addr',
      // },
    },
    bk_curr: {
      type: Sequelize.STRING,
      // references: {
      //   model: 'cu_mstr',
      //   key: 'cu_curr',
      // },
    },
    bk_type: Sequelize.STRING,
    bk_acct: Sequelize.STRING,
    bk_sub: Sequelize.STRING,
    bk_cc: Sequelize.STRING,

    bk_check: Sequelize.INTEGER,

    bk_desc: Sequelize.STRING,

    bk_user1: Sequelize.STRING,

    bk_user2: Sequelize.STRING,

    bk_entity: Sequelize.STRING,

    bk_pip_acct: Sequelize.STRING,
    bk_pip_sub: Sequelize.STRING,

    bk_pip_cc: Sequelize.STRING,

    bk_bk_acct1: Sequelize.STRING,

    bk_bk_acct2: Sequelize.STRING,

    bk_userid: Sequelize.STRING,

    bk_mod_date: Sequelize.DATEONLY,

    bk_min_drft: { type: Sequelize.DECIMAL, defaultValue: 0 },

    bk_max_drft: { type: Sequelize.DECIMAL, defaultValue: 0 },

    bk_drft_chg: { type: Sequelize.DECIMAL, defaultValue: 0 },

    bk_drft_chg_pct: { type: Sequelize.DECIMAL, defaultValue: 0 },

    bk_dftar_acct: Sequelize.STRING,

    bk_dftar_sub: Sequelize.STRING,

    bk_dftar_cc: Sequelize.STRING,
    bk_dftap_acct: Sequelize.STRING,

    bk_dftap_sub: Sequelize.STRING,

    bk_dftap_cc: Sequelize.STRING,

    bk_edft_acct: Sequelize.STRING,

    bk_edft_sub: Sequelize.STRING,

    bk_edft_cc: Sequelize.STRING,

    bk_cdft_acct: Sequelize.STRING,

    bk_cdft_sub: Sequelize.STRING,

    bk_cdft_cc: Sequelize.STRING,

    bk_bkchg_acct: Sequelize.STRING,

    bk_bkchg_sub: Sequelize.STRING,

    bk_bkchg_cc: Sequelize.STRING,

    bk_disc_acct: Sequelize.STRING,
    bk_disc_sub: Sequelize.STRING,

    bk_disc_cc: Sequelize.STRING,

    bk_ddft_acct: Sequelize.STRING,
    bk_ddft_sub: Sequelize.STRING,
    bk_ddft_cc: Sequelize.STRING,
    bk_bktx_acct: Sequelize.STRING,
    bk_bktx_sub: Sequelize.STRING,
    bk_bktx_cc: Sequelize.STRING,
    bk_balance: Sequelize.DECIMAL,
    bk_2000: Sequelize.DECIMAL,
    bk_1000: Sequelize.DECIMAL,
    bk_0500: Sequelize.DECIMAL,
    bk_0200: Sequelize.DECIMAL,
    bk_p200: Sequelize.DECIMAL,
    bk_p100: Sequelize.DECIMAL,
    bk_p050: Sequelize.DECIMAL,
    bk_p020: Sequelize.DECIMAL,
    bk_p010: Sequelize.DECIMAL,
    bk_p005: Sequelize.DECIMAL,

    bk_domain: Sequelize.STRING,
    oid_bk_mstr: Sequelize.STRING,
    ...base,
  },
  {
    tableName: 'bk_mstr',
  },
);

export default Bank;
