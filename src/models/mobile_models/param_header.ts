import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const ParamHeader = sequelize.define(
    "paramHeader",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        param_code: {type: Sequelize.STRING},  // user input
        category : {type: Sequelize.STRING},// one of the 8 categories 
        validity_date_start : {type:Sequelize.DATEONLY},
        validity_date_end : {type:Sequelize.DATEONLY},
        description:{type:Sequelize.STRING},
        call_duration:{type:Sequelize.INTEGER},  // call duration
        profile_code : {type:Sequelize.STRING},
    },
    {
        tableName: "aa_paramheader",
    }
)
export default  ParamHeader ;
