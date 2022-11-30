import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Satisfaction = sequelize.define(
    "satisfaction",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        satisfaction_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        satisfaction_date:{type:Sequelize.DATE},
        order_code : {type: Sequelize.STRING},
        status : {type: Sequelize.STRING},


        // ...base,
    },
    {
        tableName: "aa_satisfaction",
    }
)
export default  Satisfaction ;
