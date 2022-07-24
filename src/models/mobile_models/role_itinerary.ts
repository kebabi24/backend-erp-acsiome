import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Role_Itinerary = sequelize.define(
    "role_itinerary",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        role_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_role",
                key: "role_code",
            },
        },
        itinerary_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_itinerary",
                key: "itinerary_code",
            },
        },
        // ...base,
    },
    {
        tableName: "aa_role_itinerary",
    }
)
export default  Role_Itinerary ;
