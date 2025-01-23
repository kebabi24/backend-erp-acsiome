import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"

const sequelize = Container.get("sequelize")

const PriceListQuantity = sequelize.define(
    "priceListQuantity",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        plq_code : {type: Sequelize.STRING},
        plq_desc : {type: Sequelize.STRING},
        plq_min_qty : Sequelize.FLOAT,
        plq_max_qty : Sequelize.FLOAT,
       plq_domain: Sequelize.STRING,
     
        ...base
    },
    {
        tableName: "aa_plq_mstr",
    }
)
export default  PriceListQuantity ;
