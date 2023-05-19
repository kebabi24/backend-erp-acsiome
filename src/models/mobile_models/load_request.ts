import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const LoadRequest = sequelize.define(
    "loadRequest",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        load_request_code: {
            type: Sequelize.STRING, 
            primaryKey: true,
            unique: true
        },
        date_creation:{type:Sequelize.DATEONLY},
        date_charge:{type:Sequelize.DATE},
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
        }
    
        // ...base
    },
    {
        tableName: "aa_loadRequest",
    }
)
export default  LoadRequest ;
