import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EmployeSalary = sequelize.define(
    "EmployeSalary",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       




        salary_code: {
            type: Sequelize.STRING,
            references:{
                model: "emp_mstr",
                key: "emp_addr",
            },
        },
        salary_stat: Sequelize.STRING,
        salary_shift: Sequelize.STRING,
       
        salary_amt : {type: Sequelize.DECIMAL, defaultValue : 0  },
        salary_bonus: {type: Sequelize.DECIMAL, defaultValue : 0  },
        salary_salary: {type: Sequelize.DECIMAL, defaultValue : 0  },
        salary_balance: {type: Sequelize.DECIMAL, defaultValue : 0  },
        
        salary_date: Sequelize.DATEONLY,
       
      
        salary_domain: Sequelize.STRING,
            



        ...base,
    },
        {
        tableName: "salary_hist",
        }
    
    )
    export default EmployeSalary
    