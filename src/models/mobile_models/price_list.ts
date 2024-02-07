import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const PriceList = sequelize.define(
    "priceList",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        pricelist_code : {type: Sequelize.STRING},
        product_code:{ type:Sequelize.STRING},  // filter in sync 
        description:{type:Sequelize.STRING},
        salesprice :{type: Sequelize.FLOAT},
        returnprice :{type: Sequelize.FLOAT},
     
        // ...base
    },
    {
        tableName: "aa_priceList",
    }
)
export default  PriceList ;
