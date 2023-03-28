import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Project = sequelize.define(
    "project",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pm_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
            
        pm_desc: Sequelize.STRING,
        pm_status: Sequelize.STRING,
        pm_cust: {
            type: Sequelize.STRING,
            references:{
                model: "cm_mstr",
                key: "cm_addr",
            },

        },
        pm_ord_date: Sequelize.DATEONLY,
        pm_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pm_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pm_type: Sequelize.STRING,
        pm_doc_list: Sequelize.STRING,
        pm_domain:  Sequelize.STRING,
        oid_pm_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "pm_mstr",
    }
)
export default Project
