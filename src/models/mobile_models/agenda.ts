import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Agenda = sequelize.define(
    "agenda",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        code_event :{type:Sequelize.STRING}, // from seq 
        order:{type:Sequelize.INTEGER}, 
        code_client : {type:Sequelize.STRING} ,
        category : {type:Sequelize.STRING} , // from reclamation ,satisfaction ... 
        
        event_day : {type:Sequelize.DATEONLY},
        hh: {type: Sequelize.INTEGER},
        mn: {type: Sequelize.INTEGER},
        ss: {type: Sequelize.INTEGER},
        
       
        phone_to_call:{type:Sequelize.STRING},
        status:{type:Sequelize.STRING},  // C or O // when created  o (open)
        visibility:{type:Sequelize.BOOLEAN},
        duration:{type:Sequelize.INTEGER},
        action:{type:Sequelize.STRING}, // sms 
        method :{type:Sequelize.STRING}, // sms 
    },
    {
        tableName: "aa_agenda",
    }
)
export default  Agenda ;
