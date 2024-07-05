import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const CategoryType = sequelize.define(
    "categoryType",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        category_type_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique:true
        },
        
        description:{
            type:Sequelize.STRING,
            unique:true,
        },
        category_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_category",
                key: "category_code",
            },
        }

        
        
        // ...base,
    },
    {
        tableName: "aa_categorytype",
    }
)
export default  CategoryType ;
