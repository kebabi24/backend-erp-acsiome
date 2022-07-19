import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const CustomerMobile = sequelize.define(
    "customerMobile",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        customer_name:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        customer_name2:{type:Sequelize.STRING},
        customer_contact:{type: Sequelize.STRING},
        customer_barcode:{type: Sequelize.STRING},
        customer_arabic_name: {type: Sequelize.STRING},
        customer_phone_one: {type: Sequelize.STRING},
        customer_phone_two: {type: Sequelize.STRING},
        customer_fax: {type: Sequelize.STRING},
        customer_email: {type: Sequelize.STRING},
        customer_phone_nbr: {type: Sequelize.STRING},
        customer_web_adr: {type: Sequelize.STRING},
        customer_branch_code: {type: Sequelize.STRING},
        
        
        // ...base,
    },
    {
        tableName: "aa_customer",
    }
)
export default  CustomerMobile ;
