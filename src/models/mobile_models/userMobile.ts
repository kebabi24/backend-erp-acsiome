import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const UserMobile = sequelize.define(
    "userMobile",
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
        password : {type : Sequelize.STRING},
        profileId :{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_profile",
                key: "id",
            },
        },
        language : {type: Sequelize.STRING},
        hold :   {type:Sequelize.BOOLEAN},
         ...base,
    },
    {
        tableName: "aa_userMobile",
    }
)
export default  UserMobile;
