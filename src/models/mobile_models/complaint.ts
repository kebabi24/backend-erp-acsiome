import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Complaint = sequelize.define(
    "complaint",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        complaint_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        complaint_date:{type:Sequelize.DATE},
        user_code:{type: Sequelize.STRING},
        customer_phone : {type:Sequelize.STRING}, // LINK
        status : {type:Sequelize.STRING},

        order_code : {type: Sequelize.STRING},
        site_loc: {type:Sequelize.STRING},
        order_emp: {type:Sequelize.STRING},
        created_date: {type:Sequelize.DATEONLY}, //order creation date 

        priority:{type: Sequelize.INTEGER}


        // ...base,
    },
    {
        tableName: "aa_complaint",
    }
)
export default  Complaint ;
