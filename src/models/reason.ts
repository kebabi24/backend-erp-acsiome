import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Reason = sequelize.define(
    "reason",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        rsn_ref: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        rsn_desc: Sequelize.STRING,
        rsn_type: Sequelize.STRING,
        rsn_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_rsn_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "rsn_mstr",
    }
)
export default Reason
