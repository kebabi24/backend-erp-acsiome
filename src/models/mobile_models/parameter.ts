import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Parameter = sequelize.define(
    "parameter",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        parameter_name:{
            type:Sequelize.STRING,
            unique:true, 
        },
        description:{
            type:Sequelize.STRING,
            unique:true,
        },
        hold:{
            type: Sequelize.BOOLEAN,
        },
        profileId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_profile",
                key: "id",
            },
        }



        
        
        // ...base,
    },
    {
        tableName: "aa_parameter",
    }
)
export default  Parameter ;