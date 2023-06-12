import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const Label = sequelize.define(
  'label',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    lb_site: Sequelize.STRING,

    lb_loc: Sequelize.STRING,
    lb_pal: Sequelize.STRING,

    lb_part: Sequelize.STRING,

    lb_nbr: Sequelize.STRING,

    lb_lot: Sequelize.STRING,

    lb_ref: Sequelize.STRING,

    lb_date: Sequelize.DATEONLY,

    lb_cab: Sequelize.STRING,

    lb_qty: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb_actif: { type: Sequelize.BOOLEAN, defaultValue: true },

    lb_status: Sequelize.STRING,

    lb_ray: Sequelize.STRING,

    lb__chr01: Sequelize.STRING,

    lb__chr02: Sequelize.STRING,

    lb__chr03: Sequelize.STRING,

    lb__chr04: Sequelize.STRING,

    lb__chr05: Sequelize.STRING,

    lb__dec01: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb__dec02: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb__dec03: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb__dec04: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb__dec05: { type: Sequelize.DECIMAL, defaultValue: 0 },

    lb__log01: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb__log04: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb__log03: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb__log05: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb__log02: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb_um: Sequelize.STRING,

    lb_desc: Sequelize.STRING,

    lb_gen_det: Sequelize.STRING,

    lb_gen: { type: Sequelize.BOOLEAN, defaultValue: false },

    lb_type: Sequelize.STRING,
    lb_cust: Sequelize.STRING,
    lb_addr: Sequelize.STRING,
    lb_tel: Sequelize.STRING,
    lb_rmks: Sequelize.STRING,
    lb_ld_status: Sequelize.STRING,
    lb_domain: Sequelize.STRING,

    ...base,
  },
  {
    tableName: 'lb_mstr',
  },
);
export default Label;
