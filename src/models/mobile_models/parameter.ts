import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const Parameter = sequelize.define(
    "parameter",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        parameter_code: {
            type: Sequelize.STRING,
        },
        parameter_name:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        hold:{
            type: Sequelize.BOOLEAN,
        },
        profile_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_profile",
                key: "profile_code",
            },
        }



        
        
        // ...base
    },
    {
        tableName: "aa_parameter",
    }
)
export default  Parameter ;
