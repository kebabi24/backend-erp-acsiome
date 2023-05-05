import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ExchangeRate = sequelize.define(
    "ExchaneRate",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        exr_curr1: {
            type: Sequelize.STRING,
            references:{
                model: "cu_mstr",
                key: "cu_curr",
            },
        },
        exr_curr2: {
            type: Sequelize.STRING,
            references:{
                model: "cu_mstr",
                key: "cu_curr",
            },
        },
        exr_start_date: Sequelize.DATEONLY,
        exr_end_date: Sequelize.DATEONLY,
        exr_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        exr_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
        exr_ratetype: Sequelize.STRING,
        exr_mod_userid: Sequelize.STRING,

        
        exr_domain:  Sequelize.STRING,
        ...base,
    },
    {
        tableName: "exr_rate",
    }
)
export default ExchangeRate
