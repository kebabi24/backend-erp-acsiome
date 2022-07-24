import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Menu = sequelize.define(
    "menu",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        menu_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        menu_name:{
            type:Sequelize.STRING,
            unique:true,
        },

        menu_description:{type:Sequelize.STRING},
        menu_active:{type: Sequelize.BOOLEAN},
        menu_goto:{type:Sequelize.STRING},
        menu_type:{type:Sequelize.STRING},
        menu_image:{type:Sequelize.STRING},
        
        // ...base,
    },
    {
        tableName: "aa_menu",
    }
)
export default  Menu ;
