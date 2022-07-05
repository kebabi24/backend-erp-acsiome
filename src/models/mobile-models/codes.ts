import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Codes = sequelize.define(
    "codes",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        code_name:{type:Sequelize.STRING,},
        code_value:{type:Sequelize.STRING},

        
        
        // ...base,
    },
    {
        tableName: "aa_codes",
    }
)
export default  Codes ;
