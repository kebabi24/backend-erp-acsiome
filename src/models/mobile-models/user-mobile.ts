import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const UserMobile = sequelize.define(
    "user-mobile",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        fullname: {type: Sequelize.STRING },
        email: {type: Sequelize.STRING },
        user_password : {type : Sequelize.STRING},
        profile_name :{
            type: Sequelize.STRING,
            references: {
                model: "profileMobile",
                key: "profile_name",
            },
        },
        language : {type: Sequelize.STRING},
        hold :   {type:Sequelize.BOOLEAN},
         ...base,
    },
    {
        tableName: "userMobile",
    }
)
export default  UserMobile;
