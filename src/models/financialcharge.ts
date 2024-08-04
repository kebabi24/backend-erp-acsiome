import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Financialcharge = sequelize.define(
    "financialcharge",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },

        fc_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        fc_desc: Sequelize.STRING,
        fc_type: Sequelize.STRING,
        fc_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "fc_mstr",
    }
)
export default Financialcharge
