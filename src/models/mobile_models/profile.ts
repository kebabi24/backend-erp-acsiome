import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Profile = sequelize.define(
    "profile",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        profile_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        profile_name:{
            type:Sequelize.STRING,
            unique:true,
        },
        
        // ...base,
    },
    {
        tableName: "aa_profile",
    }
)
export default  Profile ;
