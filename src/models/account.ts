import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Account = sequelize.define(
    "account",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ac_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        ac_xctr: Sequelize.STRING,
        ac_fpos: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ac_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ac_type: Sequelize.STRING,
        ac_desc: Sequelize.STRING,
        ac_user1: Sequelize.STRING,
        ac_user2: Sequelize.STRING,
        ac_xret_acc: Sequelize.STRING,
        ac_xret_cc: Sequelize.STRING,
        ac_curr:  Sequelize.STRING,
        ac_fx_index: Sequelize.STRING,
        ac_stat_acc: Sequelize.STRING,
        ac_stat_cc: Sequelize.STRING,
        ac_modl_only: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ac_match_seq: Sequelize.STRING,

        ac_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_ac_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "ac_mstr",
    }
)
export default Account
