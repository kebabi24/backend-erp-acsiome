import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const WorkCenter = sequelize.define(
    "wc",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
    wc_wkctr: Sequelize.STRING,
	wc_desc: Sequelize.STRING,
	wc_dept: Sequelize.STRING,
	wc__qad01: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_mch_wkctr: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_mch_op: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_men_mch: {type:Sequelize.DECIMAL, defaultValue : 0 },
	wc_lbr_rate: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_bdn_rate: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_bdn_pct: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_mch_bdn: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_queue: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_wait: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_wk_loc: Sequelize.STRING,
	wc_mch: Sequelize.STRING,
	wc_pct_util: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_pct_eff: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc__qad02: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_user1: Sequelize.STRING,
	wc_user2: Sequelize.STRING,
	wc_setup_men: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_setup_rte: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_userid: Sequelize.STRING,
	wc_mod_date: Sequelize.DATEONLY,
	wc_bdn_surate: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_bdn_supct: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_mch_subdn: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc_fsm_type: Sequelize.STRING,
	wc__qadc01: Sequelize.STRING,
	wc__qadc02: Sequelize.STRING,
	wc__qadc03: Sequelize.STRING,
	wc__qade01: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc__qade02: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false },
	wc__chr01: Sequelize.STRING,
	wc__chr02: Sequelize.STRING,
	wc__chr03: Sequelize.STRING,
	wc__dec01: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc__dec02: {type: Sequelize.DECIMAL, defaultValue : 0 },
	wc__log01: {type: Sequelize.BOOLEAN, defaultValue : false },
	wc_domain: {type: Sequelize.STRING, defaultValue : 'zima' },
      
        oid_wc_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "wc_mstr",
    }
)
export default WorkCenter
