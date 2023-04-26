import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Itinerary = sequelize.define(
    "itinerary",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        itinerary_code: {
            type: Sequelize.STRING ,
            primaryKey: true,
            unique: true
        },
        itinerary_name:{
            type:Sequelize.STRING,
            unique:true,
        },

        itinerary_type:{type:Sequelize.STRING},
        itinerary_day:{type: Sequelize.INTEGER},
        // day : 0 sunday -> 6 saturday 
        
        // ...base,
        domain: Sequelize.STRING,
    },
    {
        tableName: "aa_itinerary",
    }
)
export default  Itinerary ;
