import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Chariot = sequelize.define(
    "chariot",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        load_request_code: Sequelize.STRING,
        chariot_nbr: Sequelize.INTEGER,
        chariot_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "chariot_mstr",
    }
)
export default Chariot
