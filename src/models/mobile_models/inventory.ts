import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const Inventory = sequelize.define(
    "inventory",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        inventory_code:{type:Sequelize.STRING , unique: true},
        site : {type: Sequelize.STRING},
        location:{ type:Sequelize.STRING},
        user_code:{type:Sequelize.STRING},
        the_date:{type:Sequelize.DATE}, //  the_date
        service_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_service",
                key: "service_code",
            },
        },

        role_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_role",
                key: "role_code",
            },
        },
     
        // ...base
    },
    {
        tableName: "aa_inventory",
    }
)
export default  Inventory ;
