import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const AgendaExecutionDetails = sequelize.define(
    "agendaExecutionDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        
        agenda_details_line_code : {type:Sequelize.STRING},
        category_code : {type:Sequelize.STRING},


        site:{type:Sequelize.STRING}, 
        size:{type:Sequelize.INTEGER},
        date:{type:Sequelize.DATEONLY},
        time:{type:Sequelize.DATE},
        type:{type:Sequelize.STRING},

        obs1:{type:Sequelize.STRING},
        obs2:{type:Sequelize.STRING},

        ch01:{type:Sequelize.STRING},
        ch02:{type:Sequelize.STRING},
        ch03:{type:Sequelize.STRING},
        ch04:{type:Sequelize.STRING},
        ch05:{type:Sequelize.STRING},

        dc01:{type:Sequelize.DECIMAL},
        dc02:{type:Sequelize.DECIMAL},
        dc03:{type:Sequelize.DECIMAL},
        dc04:{type:Sequelize.DECIMAL},
        dc05:{type:Sequelize.DECIMAL},

        date01:{type:Sequelize.DATEONLY},
        date02:{type:Sequelize.DATEONLY},
        date03:{type:Sequelize.DATEONLY},
        date04:{type:Sequelize.DATEONLY},
        date05:{type:Sequelize.DATEONLY},

        bool01:{type:Sequelize.BOOLEAN},
        bool02:{type:Sequelize.BOOLEAN},
        bool03:{type:Sequelize.BOOLEAN},
        bool04:{type:Sequelize.BOOLEAN},
        bool05:{type:Sequelize.BOOLEAN},

    },
    {
        tableName: "aa_agendaexecutiondetails",
    }
)
export default  AgendaExecutionDetails ;
