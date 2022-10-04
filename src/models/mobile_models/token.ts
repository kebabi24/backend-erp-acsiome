import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const TokenSerie = sequelize.define(
    "tokenSerie",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true  
        },
        token_code: {
            type: Sequelize.STRING,
            primaryKey:  true,
            unique: true
        },
        token_name:{type: Sequelize.STRING},
        token_digitcount : {type: Sequelize.INTEGER},
 
        service_prefix : { type: Sequelize.STRING ,unique:true},
        service_next_number : { type: Sequelize.INTEGER},

        visit_prefix :{type: Sequelize.STRING ,unique:true},
        visit_next_number :{type : Sequelize.INTEGER},

        customer_prefix :{type: Sequelize.STRING ,unique:true},
        customer_next_number :{type : Sequelize.INTEGER},

        load_request_prefix :{type: Sequelize.STRING ,unique:true},
        load_request_next_number :{type : Sequelize.INTEGER},
        
        // squote_prefix: { type: Sequelize.STRING ,unique:true},
        // squote_next_number :{type : Sequelize.INTEGER},

        // sorder_prefix: { type: Sequelize.STRING ,unique:true},
        // sorder_next_number :{type : Sequelize.INTEGER},

        // sinvoice_prefix :{type: Sequelize.STRING ,unique:true},
        // sinvoice_next_number :{type : Sequelize.INTEGER},


        
        // inventory_prefix :{type: Sequelize.STRING ,unique:true},
        // inventory_next_number :{type : Sequelize.INTEGER},

        // payment_prefix :{type: Sequelize.STRING ,unique:true},
        // payment_next_number :{type : Sequelize.INTEGER},

        // partner_prefix:{type: Sequelize.STRING ,unique:true},
        // partner_next_number:{type : Sequelize.INTEGER},
        
        // warehouse_transfer_prefix:{type: Sequelize.STRING ,unique:true},
        // wharehouse_next_number:{type : Sequelize.INTEGER},
        // ...base,
    },
    {
        tableName: "aa_tokenSerie",
    }
)
export default  TokenSerie ;
