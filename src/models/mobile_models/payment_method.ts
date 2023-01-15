import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const PaymentMethod = sequelize.define(
    "paymentMethod",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        payment_method_code:{
            type: Sequelize.STRING,
            primaryKey:true,
            unique:true
        },
        description:{ type:Sequelize.STRING},
        tax_pct:{ type:Sequelize.FLOAT},

        
        
        // ...base,
    },
    {
        tableName: "aa_paymentMethod",
    }
)
export default  PaymentMethod ;
