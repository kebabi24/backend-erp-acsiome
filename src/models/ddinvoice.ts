import { Container } from "typedi"


import Sequelize from "sequelize"


import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const Ddinvoice = sequelize.define(
    "ddinvoice",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        invoice_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        site:{type: Sequelize.STRING},
        itinerary_code:{type: Sequelize.STRING}, // from itinerary 
        customer_code:{type: Sequelize.STRING}, // from customer 
        the_date:{type: Sequelize.DATE},
        period_active_date:{type: Sequelize.DATEONLY},
        role_code:{type: Sequelize.STRING}, // from role 
        user_code:{type: Sequelize.STRING}, // from user
        loc_code:{type: Sequelize.STRING}, 
        service_code : { type: Sequelize.STRING}, // from service
        visit_code : { type: Sequelize.STRING}, 
        pricelist_code:{type: Sequelize.STRING}, // from pricelist
        amount:{type: Sequelize.FLOAT}, 
        due_amount:{type: Sequelize.FLOAT}, 
        payment_term_code:{type: Sequelize.STRING}, 
        devise_code:{type: Sequelize.STRING}, 
        description:{type: Sequelize.STRING}, 
        discount:{type: Sequelize.FLOAT}, 
        taxe_amount : { type: Sequelize.FLOAT}, // FLOAT default 0
        stamp_amount : { type: Sequelize.FLOAT},// FLOAT default 0
        horstax_amount : { type: Sequelize.FLOAT},// FLOAT default 0
        canceled : { type: Sequelize.BOOLEAN},
        cancelation_reason_code : { type: Sequelize.STRING}, // from cancelation reason 
        progress_level : { type: Sequelize.INTEGER}, 
        score_code : { type: Sequelize.STRING}, 
        sdelivery_note_code : { type: Sequelize.STRING},
        closed : { type: Sequelize.BOOLEAN}, 

        promorate: {type: Sequelize.FLOAT},
        promoamt: {type: Sequelize.FLOAT},
        

        // NOT REQUESTED BY RIANE 
        
        // confirm_date:{type: Sequelize.DATEONLY}, 
        // payment_term_discount : { type: Sequelize.FLOAT},
        // payment_term_discount_rate : { type: Sequelize.FLOAT},
        // tracking_key : { type: Sequelize.STRING}, 
        // payment_code : { type: Sequelize.STRING},  // from payment
        // loyalty_product_code : { type: Sequelize.STRING},  
        // loyalty_program_score : { type: Sequelize.INTEGER},  
        // final_tax_amount : { type: Sequelize.FLOAT},  
        // last_update : { type: Sequelize.DATEONLY}
        
        // ...base
    },
    {
        tableName: "aa_ddinvoice",
    }
)
export default  Ddinvoice ;
