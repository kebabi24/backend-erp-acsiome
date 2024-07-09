import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const QuotaLine = sequelize.define(
    "quotaLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        quota_code : {type: Sequelize.STRING},
        product_code:{ type:Sequelize.STRING},  
        requested_quantity:{ type:Sequelize.INTEGER},  
        assigned_quantity:{type:Sequelize.INTEGER},
     
    
    },
    {
        tableName: "aa_quotaline",
    }
)
export default  QuotaLine ;
