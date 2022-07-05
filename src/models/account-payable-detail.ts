import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AccountPayableDetail = sequelize.define(
    "account-payable-detail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        apd_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "ap_mstr",
                key: "ap_nbr",
            },
        },
 
        apd_acct: Sequelize.STRING,

        apd_cc: Sequelize.STRING,

        apd_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_desc: Sequelize.STRING,

        apd_ref: Sequelize.STRING,

        apd_disc: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_type: Sequelize.STRING,

        apd_user1: Sequelize.STRING,

        apd_user2: Sequelize.STRING,

        apd_tax: Sequelize.STRING,

        apd_tax_at: Sequelize.STRING,

        apd_entity: Sequelize.STRING,

        apd__qad02: Sequelize.STRING,

        apd__qad01: Sequelize.DATEONLY, 

        apd_project: Sequelize.STRING,

        apd_cur_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_cur_disc: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_tax_usage: Sequelize.STRING,

        apd_taxc: Sequelize.STRING,

        apd_dy_code: Sequelize.STRING,

        apd_dy_num: Sequelize.STRING,

        apd_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        apd_ex_ratetype: Sequelize.STRING,

        apd_ded_nbr: Sequelize.INTEGER, 

        apd_exru_seq: Sequelize.INTEGER, 

        apd_sub: Sequelize.STRING,



        apd_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
    oid_apd_der: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
    },
    {
        tableName: "apd_det",
    }
)
export default AccountPayableDetail
