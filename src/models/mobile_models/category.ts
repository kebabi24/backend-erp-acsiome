import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Category = sequelize.define(
    "category",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        category_code:{
            type: Sequelize.STRING,
            primaryKey:true,
            unique:true
        },
        description:{
            type:Sequelize.STRING,
            unique:true,
        },

        
        
        // ...base,
    },
    {
        tableName: "aa_category",
    }
)
export default  Category ;
