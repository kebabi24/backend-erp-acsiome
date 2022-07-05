import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Task = sequelize.define(
    "task",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        tk_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        tk_desc: Sequelize.STRING,
        tk_um: Sequelize.STRING,
        tk_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tk_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_tk_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "tk_mstr",
    }
)
export default Task
