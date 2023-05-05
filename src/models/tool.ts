import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Tool = sequelize.define(
    "tool",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        to_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        to_desc: Sequelize.STRING,
        to_domain:  Sequelize.STRING,
        oid_to_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "to_mstr",
    }
)
export default Tool
