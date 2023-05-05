import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeTime = sequelize.define(
    "EmployeTime",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       




        empt_code: {
            type: Sequelize.STRING,
            references:{
                model: "emp_mstr",
                key: "emp_addr",
            },
        },
        empt_stat: Sequelize.STRING,
        empt_shift: Sequelize.STRING,
        empt_type: Sequelize.STRING,
        empt_amt : {type: Sequelize.DECIMAL, defaultValue : 0  },
        empt_date: Sequelize.DATEONLY,
        empt_site: Sequelize.STRING,
        empt_start: Sequelize.TIME,
        empt_end:   Sequelize.TIME,
        
        empt_domain: Sequelize.STRING,
            



        ...base,
    },
        {
        tableName: "empt_hist",
        }
    
    )
    export default EmployeTime
    