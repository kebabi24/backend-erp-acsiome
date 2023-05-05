import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeScore = sequelize.define(
    "EmployeScore",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        emps_addr: {
            type: Sequelize.STRING,
            references: {
                model: "emp_mstr",
                key: "emp_addr",
            },
        },
        emps_type: Sequelize.STRING,
        emps_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        
        emps_domain: Sequelize.STRING,
        

        ...base,
    },
    {
        tableName: "emps_det",
    }
)
export default EmployeScore
