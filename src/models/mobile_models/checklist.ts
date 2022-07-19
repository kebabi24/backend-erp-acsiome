import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Checklist = sequelize.define(
    "checklist",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        description:{
            type:Sequelize.STRING,
            unique:true,
        },

        
        
        // ...base,
    },
    {
        tableName: "aa_checklist",
    }
)
export default  Checklist ;