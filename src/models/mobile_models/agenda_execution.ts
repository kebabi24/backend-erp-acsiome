import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const AgendaExecution = sequelize.define(
    "agendaExecution",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        // add code event and order
        event_day : {type:Sequelize.DATEONLY},
        phone_to_call:{type:Sequelize.STRING}, 
        status:{type:Sequelize.STRING},
        // add field result
        duration:{type:Sequelize.STRING},
        action:{type:Sequelize.STRING},
        method:{type:Sequelize.STRING},

        call_hour:{type:Sequelize.STRING},
        call_end_hour:{type:Sequelize.STRING},

        observation:{type:Sequelize.STRING},

        event_code  :{type:Sequelize.STRING},
        event_result :{type:Sequelize.STRING},
        category :{type:Sequelize.STRING},

    },
    {
        tableName: "aa_agendaexecution",
    }
)
export default  AgendaExecution ;
