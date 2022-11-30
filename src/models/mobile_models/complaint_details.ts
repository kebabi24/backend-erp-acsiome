import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const ComplaintDetails = sequelize.define(
    "complaintDetails",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        complaint_code:{
            type:Sequelize.STRING,
            primaryKey:true,
            unique:true,
        },
        code_value:{type:Sequelize.STRING},
        observation:{type:Sequelize.STRING}

        // ...base,
    },
    {
        tableName: "aa_complaintDetails",
    }
)
export default  ComplaintDetails ;
