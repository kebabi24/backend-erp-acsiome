import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"

const sequelize = Container.get("sequelize")

const Role = sequelize.define(
    "role",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        role_name: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        role_userMobileId:{
            type: Sequelize.INTEGER,
            references: {
                model: "aa_userMobile",
                key: "id",
            },
        },

         //...base,
    },
    {
        tableName: "aa_role",
    }
)
export default  Role;
