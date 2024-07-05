import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const Itinerary_Customer = sequelize.define(
    "itinerary_customer",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        itinerary_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_itinerary",
                key: "itinerary_code",
            },
        },
        customer_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_customer",
                key: "customer_code",
            },
        },
        rank:{type: Sequelize.INTEGER, defaultValue : 0  }, 
        // ...base,
    },
    {
        tableName: "aa_itinerary_customer",
    }
)
export default   Itinerary_Customer ;
