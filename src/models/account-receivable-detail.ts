import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AccountReceivableDetail = sequelize.define(
    "account-receivable-detail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ard_nbr: Sequelize.STRING,
            
        ard_acct: Sequelize.STRING,

        ard_cc: Sequelize.STRING,

        ard_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_desc: Sequelize.STRING,

        ard_ref: Sequelize.STRING,

        ard_disc: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_type: Sequelize.STRING,

        ard_user1: Sequelize.STRING,

        ard_user2: Sequelize.STRING,

        ard_tax: Sequelize.STRING,

        ard_tax_at: Sequelize.STRING,

        ard_entity: Sequelize.STRING,

        ard__qad02: Sequelize.STRING,

        ard__qad01: Sequelize.DATEONLY, 

        ard_project: Sequelize.STRING,

        ard_cur_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_cur_disc: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_tax_usage: Sequelize.STRING,

        ard_taxc: Sequelize.STRING,

        ard_dy_code: Sequelize.STRING,

        ard_dy_num: Sequelize.STRING,

        ard_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        ard_ex_ratetype: Sequelize.STRING,

        ard_ded_nbr: Sequelize.INTEGER, 

        ard_exru_seq: Sequelize.INTEGER, 

        ard_sub: Sequelize.STRING,



        ard_domain: Sequelize.STRING,
    oid_ard_der: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
    },
    {
        tableName: "ard_det",
    }
)
export default AccountReceivableDetail
