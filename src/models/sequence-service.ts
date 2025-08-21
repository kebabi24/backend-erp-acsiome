import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const SequenceService = sequelize.define(
    "sequenceService",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        usgseq_code: Sequelize.STRING,
            
        usgseq_service: Sequelize.STRING,
        usgseq_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "usgseq_det",
    }
)
export default SequenceService
