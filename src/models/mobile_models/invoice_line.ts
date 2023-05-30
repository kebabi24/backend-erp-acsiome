import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"
import Invoice from "./invoice"


const sequelize = Container.get("sequelize")

const InvoiceLine = sequelize.define(
    "invoiceLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        invoice_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_invoice",
                key: "invoice_code",
            },
        },
        invoice_line:{type: Sequelize.INTEGER},
        product_code:{type: Sequelize.STRING}, 
        designation:{type: Sequelize.STRING}, 
        quantity:{type: Sequelize.INTEGER}, 
        returned_quantity:{type: Sequelize.INTEGER}, 
        returned_damaged_quantity:{type: Sequelize.INTEGER}, 
        unit_price:{type: Sequelize.DOUBLE}, 
        tax_rate:{type: Sequelize.DOUBLE}, 
        discount:{type: Sequelize.DOUBLE}, 
        promo_rate:{type: Sequelize.DOUBLE}, 
        user_field1:{type: Sequelize.STRING}, 
        user_field2:{type: Sequelize.STRING}, 
        loyalty_necessary_score:{type: Sequelize.INTEGER}, 
        lot:{type:Sequelize.STRING}

        
       
       
        
        // ...base
    },
    {
        tableName: "aa_invoiceLine",
    }
)
export default  InvoiceLine ;
