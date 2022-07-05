import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Accountdefault = sequelize.define(
    "accountdefault",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        acdf_type: Sequelize.STRING,
        acdf_key1: Sequelize.STRING,
        acdf_key2: Sequelize.STRING,
        acdf_key3: Sequelize.STRING,
        acdf_key4: Sequelize.STRING,
        acdf_key5: Sequelize.STRING,
        acdf_key6: Sequelize.STRING,
        acdf_acct: Sequelize.STRING,
        acdf_sub: Sequelize.STRING,
        acdf_cc: Sequelize.STRING,
        acdf_mod_userid: Sequelize.STRING,
        acdf_module: Sequelize.STRING,
        acdf_mod_date:Sequelize.DATEONLY,
        acdf_userc01: Sequelize.STRING,
        acdf_userc02: Sequelize.STRING,
        acdf_userd01: {type: Sequelize.DECIMAL, defaultValue : 0  },
        acdf_useri01: Sequelize.INTEGER,
        acdf_userl01:{type: Sequelize.BOOLEAN, defaultValue : false  },
        acdf_usert01: Sequelize.DATEONLY,



        acdf_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_acdf_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "acdf_mstr",
    }
)
export default Accountdefault
