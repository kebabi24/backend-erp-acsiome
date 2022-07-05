import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const ProfileMobile = sequelize.define(
    "profile-mobile",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        profile_name:{
            type:Sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        profile_valid_date: Sequelize.DATEONLY,
        profile_exp_date: Sequelize.DATEONLY,
        
        ...base,
    },
    {
        tableName: "profileMobile",
    }
)
export default  ProfileMobile ;
