import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const UnloadRequestDetails = sequelize.define(
    "unloadRequestDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        
        date_expiration:{type:Sequelize.DATEONLY},
        line:{type: Sequelize.INTEGER},

        
        product_code:{
            type: Sequelize.STRING,
            references: {
                model: "pt_mstr",
                key: "pt_part",
            },
        },

        unload_request_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_unloadRequest",
                key: "unload_request_code",
            },
        },

        lot : {type:Sequelize.STRING},
        qt_effected:{type: Sequelize.FLOAT},
        pt_price : {type : Sequelize.FLOAT}

        // ...base
    },
    {
        tableName: "aa_unloadrequestdetails",
    }
)
export default  UnloadRequestDetails ;
