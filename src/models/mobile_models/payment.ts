import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Payment = sequelize.define(
    "payment",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        payment_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        reference:{type:Sequelize.STRING},
        invoice_code:{type:Sequelize.STRING},
        payment_term_code:{type:Sequelize.STRING},
        amount:{type: Sequelize.FLOAT},
        the_date:{type:Sequelize.DATE},
        customer_code:{type:Sequelize.STRING},
        role_code:{type:Sequelize.STRING},
        person_code:{type:Sequelize.STRING},
        service_code:{type:Sequelize.STRING},
        visit_code:{type:Sequelize.STRING},
        locked:{type:Sequelize.BOOLEAN},
        bank_code:{type:Sequelize.STRING},
        bank_branch_code:{type:Sequelize.STRING},
        payer_reference_code:{type:Sequelize.STRING},
        printed:{type:Sequelize.INTEGER},
        
        rank:{type: Sequelize.INTEGER},
        canceled:{type:Sequelize.BOOLEAN},
        period_active_date:{type:Sequelize.DATEONLY},
        site:{type: Sequelize.STRING},
        itinerary_code:{type: Sequelize.STRING}, // from itinerary 
        
        
        // ...base,
    },
    {
        tableName: "aa_payment",
    }
)
export default  Payment ;
