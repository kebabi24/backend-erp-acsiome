import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const UnloadRequest = sequelize.define(
    "unloadRequest",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        unload_request_code: {
            type: Sequelize.STRING, 
            primaryKey: true,
            unique: true
        },
        date_creation:{type:Sequelize.DATEONLY},
        date_decharge:{type:Sequelize.DATE},
        status:{type: Sequelize.INTEGER},

        
        role_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_role",
                key: "role_code",
            },
        },

        user_mobile_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_userMobile",
                key: "user_mobile_code",
            },
        },
        role_loc:{ type:Sequelize.STRING},
        role_site:{ type:Sequelize.STRING},
    
    
        // ...base
    },
    {
        tableName: "aa_unloadrequest",
    }
)
export default  UnloadRequest ;
