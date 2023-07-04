import { Container } from "typedi"


import Sequelize from "sequelize"
import base from "../base"
import { truncateSync } from "fs"

const sequelize = Container.get("sequelize")

const Visits = sequelize.define(
    "visits",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        visit_code: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
       
        itinerary_code : {type: Sequelize.STRING },
        customer_code  : {type : Sequelize.STRING},
        periode_active_date : {type : Sequelize.DATEONLY},
        start_time   : {type : Sequelize.STRING},
        end_time   : {type : Sequelize.STRING},
        role_code    : {type : Sequelize.STRING},
        user_code    : {type : Sequelize.STRING},
        service_code    : {type : Sequelize.STRING},
        position_mismatch     : {type : Sequelize.INTEGER},
        longitude     : {type : Sequelize.STRING},
        latitude     : {type : Sequelize.STRING},
        notes      : {type : Sequelize.STRING},
        site: {type : Sequelize.STRING},
        // ...base,
    },
    {
        tableName: "aa_visits",
    }
)
export default  Visits;
