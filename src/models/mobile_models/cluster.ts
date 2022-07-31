import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Cluster = sequelize.define(
    "cluster",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        cluster_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique:true
        },
        description:{
            type:Sequelize.STRING,
            unique:true,
        },

        
        
        // ...base,
    },
    {
        tableName: "aa_cluster",
    }
)
export default  Cluster ;
