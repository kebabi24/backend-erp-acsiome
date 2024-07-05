import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const SubCluster = sequelize.define(
    "subCluster",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        sub_cluster_code:{
            type: Sequelize.STRING,
            primaryKey: true,
            unique:true
        },
        description:{
            type:Sequelize.STRING,
            unique:true,
        },
        cluster_code:{
            type:Sequelize.STRING,
            references: {
                model: "aa_cluster",
                key: "cluster_code",
            },
        }

        
        
        // ...base,
    },
    {
        tableName: "aa_subcluster",
    }
)
export default  SubCluster ;
