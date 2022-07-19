import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const Profile_Menu  = sequelize.define(
    "profile_menu",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        profileId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_profile",
                key: "id",
            },
        },
        menuId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_menu",
                key: "id",
            },
        },
       

        // ...base,
    },
    {
        tableName: "aa_profile_menu",
    }
)
export default  Profile_Menu ;
