import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const Role_itinerary = sequelize.define(
    "role_itinerary",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        roleId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_role",
                key: "id",
            },
        },
        itineraryId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_itinerary",
                key: "id",
            },
        },
         //...base,
    },
    {
        tableName: "aa_role_itinerary",
    }
)
export default  Role_itinerary;
