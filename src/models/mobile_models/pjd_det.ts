import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const PjDetails = sequelize.define(
    "pjd_det",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        pjd_nbr: {type: Sequelize.STRING},
        mp_nbr:{type:Sequelize.STRING},

        pjd_trigger:{type:Sequelize.STRING},
        
        pjd_domain:{type:Sequelize.STRING},

        
        // ...base,
    },
    {
        tableName: "aa_pjd_det",
    }
)
export default  PjDetails ;
