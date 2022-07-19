import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const Service = sequelize.define(
    "service",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        service_period_activate_date: {
            type: Sequelize.STRING,
        },
        service_creation_date :{
            type: Sequelize.DATEONLY,
        },
        service_closing_date :{
            type: Sequelize.DATEONLY,
        },
        service_roleId :{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_role",
                key: "id",
            },
        },
        service_itineraryId :{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_itinerary",
                key: "id",
            },
        },
        service_open :{
            type: Sequelize.BOOLEAN,
        },
        service_kmdep:{type:Sequelize.STRING},
        service_kmarr:{type:Sequelize.STRING}

        // ...base,
    },
    {
        tableName: "aa_service",
    }
)
export default  Service;
