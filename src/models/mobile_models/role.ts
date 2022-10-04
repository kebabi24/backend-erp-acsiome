import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Role = sequelize.define(
    "role",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        role_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        role_name:{
            type:Sequelize.STRING,
            unique:true,
        },
        user_mobile_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
            references: {
                model: "aa_userMobile",
                key: "user_mobile_code",
            },
        },
        token_serie_code:{
            type:Sequelize.STRING,
            unique: true,
            references: {
                model: "aa_tokenSerie",
                key: "token_code",
            },
        }
        // ...base,
    },
    {
        tableName: "aa_role",
    }
)
export default  Role ;
