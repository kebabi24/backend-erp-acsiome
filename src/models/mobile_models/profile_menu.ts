import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Profile_Menu = sequelize.define(
    "profile_menu",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        profile_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_profile",
                key: "profile_code",
            },
        },
        menu_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_menu",
                key: "menu_code",
            },
        },
        // ...base,
        
    },
    {
        tableName: "aa_profile_menu",
    }
)
export default  Profile_Menu ;
