import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeAvailability = sequelize.define(
    "employe-availability",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        empd_addr: Sequelize.STRING,
        empd_type: Sequelize.STRING,
        
        empd_fdate: Sequelize.DATEONLY,
        empd_ldate: Sequelize.DATEONLY,
        empd_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        
        ...base,
    },
    {
        tableName: "empd_det",
    }
)
export default EmployeAvailability
