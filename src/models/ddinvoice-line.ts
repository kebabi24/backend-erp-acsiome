import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"
import Invoice from "./invoice"


const sequelize = Container.get("sequelize")

const DdinvoiceLine = sequelize.define(
    "ddinvoiceLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        invoice_code: Sequelize.STRING,
        invoice_line:{type: Sequelize.INTEGER},
        product_code:{type: Sequelize.STRING}, 
        designation:{type: Sequelize.STRING}, 
        quantity:{type: Sequelize.FLOAT}, 
        returned_quantity:{type: Sequelize.FLOAT}, 
        returned_damaged_quantity:{type: Sequelize.FLOAT}, 
        unit_price:{type: Sequelize.FLOAT}, 
        tax_rate:{type: Sequelize.FLOAT}, 
        discount:{type: Sequelize.FLOAT}, 
        promo_rate:{type: Sequelize.FLOAT}, 
        user_field1:{type: Sequelize.STRING}, 
        user_field2:{type: Sequelize.STRING}, 
        loyalty_necessary_score:{type: Sequelize.INTEGER}, 
        lot:{type:Sequelize.STRING},
        promoamt: {type: Sequelize.FLOAT},
        price:{type: Sequelize.FLOAT}, 

        
       
       
        
        // ...base
    },
    {
        tableName: "aa_ddinvoiceline",
    }
)
export default  DdinvoiceLine ;
