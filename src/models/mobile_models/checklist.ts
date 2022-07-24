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
        checklist_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        description:{
            type:Sequelize.STRING
        },

        
        
        // ...base,
    },
    {
        tableName: "aa_checklist",
    }
)
export default  Checklist ;
