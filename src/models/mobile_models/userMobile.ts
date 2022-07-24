import { Container } from "typedi"


import Sequelize from "sequelize"
import base from "../base"
import { truncateSync } from "fs"

const sequelize = Container.get("sequelize")

const UserMobile = sequelize.define(
    "userMobile",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        user_mobile_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
       
        username: {type: Sequelize.STRING },
        password : {type : Sequelize.STRING},
        profile_code :{
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
            references: {
                model: "aa_profile",
                key: "profile_code",
            },
        },
        language : {type: Sequelize.STRING},
        hold :   {type:Sequelize.BOOLEAN},
        // ...base,
    },
    {
        tableName: "aa_userMobile",
    }
)
export default  UserMobile;
