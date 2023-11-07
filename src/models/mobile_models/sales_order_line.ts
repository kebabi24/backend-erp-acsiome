import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"
import Invoice from "./invoice"


const sequelize = Container.get("sequelize")

const SalesOrderLine = sequelize.define(
    "salesOrderLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        salesorder_code:{
            type: Sequelize.STRING,
            // references: {
            //     model: "aa_",
            //     key: "invoice_code",
            // },
        },
        salesorder_line:{type: Sequelize.INTEGER},
        product_code:{type: Sequelize.STRING}, 
        designation:{type: Sequelize.STRING}, 
        quantity:{type: Sequelize.DOUBLE}, 
        returned_quantity:{type: Sequelize.INTEGER}, 
        returned_damaged_quantity:{type: Sequelize.INTEGER}, 
        unit_price:{type: Sequelize.DOUBLE}, 
        tax_rate:{type: Sequelize.DOUBLE}, 
        discount:{type: Sequelize.DOUBLE}, 
        promo_rate:{type: Sequelize.DOUBLE}, 
        user_field1:{type: Sequelize.STRING}, 
        user_field2:{type: Sequelize.STRING}, 
        loyalty_necessary_score:{type: Sequelize.INTEGER}, 
       
        promoamt: {type: Sequelize.DOUBLE},

        
       
       
        
        // ...base
    },
    {
        tableName: "aa_salesOrderLine",
    }
)
export default  SalesOrderLine ;
