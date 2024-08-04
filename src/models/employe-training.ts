import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeTraining = sequelize.define(
    "EmployeTraining",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       




        empf_code: {
            type: Sequelize.STRING,
            references:{
                model: "emp_mstr",
                key: "emp_addr",
            },
        },
        empf_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },
        },
        empf_beging_date: Sequelize.DATEONLY,
        empf_end_date: Sequelize.DATEONLY,
      
        empf_domain: Sequelize.STRING,
            



        ...base,
    },
        {
        tableName: "empf_hist",
        }
    
    )
    export default EmployeTraining
    