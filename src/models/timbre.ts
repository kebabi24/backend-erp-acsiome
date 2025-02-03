import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Timbre = sequelize.define(
    "timbre",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        code:  Sequelize.STRING,
         
        min: Sequelize.FLOAT,
        max: Sequelize.FLOAT,
        value:Sequelize.FLOAT,
        domain:  Sequelize.STRING,
        oid_to_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "timbre",
    }
)
export default Timbre
