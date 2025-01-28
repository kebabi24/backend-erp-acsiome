import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ChariotDetail = sequelize.define(
    "chariotDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        load_request_code: Sequelize.STRING,
        chariot_nbr: Sequelize.INTEGER,
        code_prod: Sequelize.STRING,
        desc_prod: Sequelize.STRING,
        lot : Sequelize.STRING,
        serie:Sequelize.STRING,
        quantity: Sequelize.STRING,
        price : {type : Sequelize.DOUBLE},
        chariot_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "chariot_det",
    }
)
export default ChariotDetail
