import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const CancelationReason = sequelize.define(
    "cancelationReason",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        cancelation_reason_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        name:{type:Sequelize.STRING},
        rank:{type: Sequelize.INTEGER},

        
        
        // ...base,
    },
    {
        tableName: "aa_cancelationreason",
    }
)
export default  CancelationReason ;
