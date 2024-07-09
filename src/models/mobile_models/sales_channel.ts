import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const SalesChannel = sequelize.define(
    "salesChannel",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        sales_channel_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        description:{type:Sequelize.STRING},
        rank : {type : Sequelize.INTEGER},

        
        
        // ...base,
    },
    {
        tableName: "aa_saleschannel",
    }
)
export default  SalesChannel ;
