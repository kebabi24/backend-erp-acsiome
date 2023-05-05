import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ToolDetail = sequelize.define(
    "ToolDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        tod_code: {
            type: Sequelize.STRING,
            references: {
                model: "to_mstr",
                key: "to_code",
            },
        },
        tod_nbr: Sequelize.STRING,
        tod_desc: Sequelize.STRING,
        tod_qty: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        tod_domain: Sequelize.STRING,
        oid_tod_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "tod_det",
    }
)
export default ToolDetail
