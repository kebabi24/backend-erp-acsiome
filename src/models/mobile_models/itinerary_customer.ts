import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const Itinerary_Customer  = sequelize.define(
    "itinerary_customer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        itineraryId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_itinerary",
                key: "id",
            },
        },
        customerId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_customer",
                key: "id",
            },
        },
         //...base,
    },
    {
        tableName: "aa_itinerary_customer",
    }
)
export default  Itinerary_Customer ;
