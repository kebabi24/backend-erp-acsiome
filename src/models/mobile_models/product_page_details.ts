import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const productPageDetails = sequelize.define(
    "productPageDetails",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        product_page_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_productPage",
                key: "product_page_code",
            },
        },
        product_code:{
            type: Sequelize.STRING,
            references: {
                model: "pt_mstr",
                key: "pt_part",
            },
        },
        rank:{
            type:Sequelize.INTEGER
        }
        
        // ...base,
    },
    {
        tableName: "aa_productpagedetails",
    }
)
export default   productPageDetails ;
