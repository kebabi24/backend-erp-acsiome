import { Container } from "typedi"


import Sequelize from "sequelize"
import base from "../base"
import { truncateSync } from "fs"

const sequelize = Container.get("sequelize")

const Visitresult = sequelize.define(
    "visitresult",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        visitresult_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
       
        name: {type: Sequelize.STRING },
        rank : {type : Sequelize.INTEGER},
        revisit :   {type:Sequelize.BOOLEAN},
        // ...base,
    },
    {
        tableName: "aa_visitresult",
    }
)
export default  Visitresult;
