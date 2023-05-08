import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const LoadRequestDetails = sequelize.define(
    "loadRequestDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        
        date_experation:{type:Sequelize.DATE},
        line:{type: Sequelize.INTEGER},

        
        product_code:{
            type: Sequelize.STRING,
            references: {
                model: "pt_mstr",
                key: "pt_part",
            },
        },

        load_request_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_loadRequest",
                key: "load_request_code",
            },
        },

        lot : {type:Sequelize.STRING},
        qt_effected:{type: Sequelize.INTEGER},
        pt_price : {type : Sequelize.DOUBLE}

        // ...base
    },
    {
        tableName: "aa_loadRequestDetails",
    }
)
export default  LoadRequestDetails ;
