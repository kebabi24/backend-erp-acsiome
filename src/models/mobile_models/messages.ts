import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Messages = sequelize.define(
    "messages",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        title:{type:Sequelize.STRING},
        description:{type:Sequelize.STRING},
        rank:{type: Sequelize.INTEGER},

        
        
        // ...base,
    },
    {
        tableName: "aa_messages",
    }
)
export default  Messages ;
