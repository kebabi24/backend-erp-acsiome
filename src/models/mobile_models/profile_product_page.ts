import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const profileProductPage = sequelize.define(
    "profileProductPage",
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
        product_page_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_productPage",
                key: "product_page_code",
            },
        },
        rank:{
            type:Sequelize.INTEGER
        }
        
        // ...base,
    },
    {
        tableName: "aa_profileproductpage",
    }
)
export default   profileProductPage ;
