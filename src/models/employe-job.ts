import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeJob = sequelize.define(
    "EmployeJob",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        empj_addr: {
            type: Sequelize.STRING,
            references: {
                model: "emp_mstr",
                key: "emp_addr",
            },
        },
        empj_job:  {
            type: Sequelize.STRING,
            references: {
                model: "jb_mstr",
                key: "jb_code",
            },
        },
        empj_level: Sequelize.STRING,
        empj_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        
        empj_domain: Sequelize.STRING,
        

        ...base,
    },
    {
        tableName: "empj_det",
    }
)
export default EmployeJob
