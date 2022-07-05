import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Config = sequelize.define(
    "config",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        cfg_pm_module: {type: Sequelize.BOOLEAN, defaultValue : false  },
        cfg_pay_multiple: {type: Sequelize.BOOLEAN, defaultValue : false  },
            
       
        ...base,
    },
    {
        tableName: "cfg_mstr",
    }
)
export default Config
