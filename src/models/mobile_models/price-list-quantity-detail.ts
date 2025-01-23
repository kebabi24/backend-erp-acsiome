import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"



const sequelize = Container.get("sequelize")

const PriceListQuantityDetail = sequelize.define(
    "priceListQuantityDetail",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        plqd_code : {type: Sequelize.STRING},
        plqd_part:{ type:Sequelize.STRING},  // filter in sync 
        plqd_desc:{type:Sequelize.STRING},
        plqd_salesprice :{type: Sequelize.FLOAT},
        plqd_returnprice :{type: Sequelize.FLOAT},
        plqd_domain: Sequelize.STRING,
        // ...base
    },
    {
        tableName: "aa_plqd_det",
    }
)
export default  PriceListQuantityDetail ;
