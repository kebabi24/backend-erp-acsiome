import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const ParamDetails = sequelize.define(
    "paramDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        param_code: {type: Sequelize.STRING},  //  foreign key
        category:{type:Sequelize.STRING},      // 
        
        execution_moment:{type:Sequelize.INTEGER}, // 1st REL
        method_0:{type:Sequelize.STRING},
        action_0:{type:Sequelize.STRING},

        action_1:{type:Sequelize.STRING}, // sms call mail dropdown
        method_1:{type:Sequelize.STRING},
        rel_1:{type:Sequelize.INTEGER},

        action_2:{type:Sequelize.STRING},
        method_2:{type:Sequelize.STRING},
        rel_2:{type:Sequelize.INTEGER},

        action_3:{type:Sequelize.STRING},
        method_3:{type:Sequelize.STRING},
        rel_3:{type:Sequelize.INTEGER},

        population_code: {type: Sequelize.STRING}, // if we are targeting many
        population_nb: {type: Sequelize.STRING},
    },
    {
        tableName: "aa_paramDetails",
    }
)
export default  ParamDetails ;
