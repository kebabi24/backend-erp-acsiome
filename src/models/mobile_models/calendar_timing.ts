import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const CalendarTiming = sequelize.define(
    "calendarTiming",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        
        date : {type:Sequelize.DATEONLY},
        start_hh: {type: Sequelize.INTEGER},
        start_mn: {type: Sequelize.INTEGER},
        end_hh: {type: Sequelize.INTEGER},
        end_mn: {type: Sequelize.INTEGER},
        
       
        status:{type:Sequelize.STRING},
        note:{type:Sequelize.STRING},  
        code_doctor:{type:Sequelize.STRING},
 
    },
    {
        tableName: "aa_calendarttiming",
    }
)
export default  CalendarTiming ;
