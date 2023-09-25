import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Advantage = sequelize.define(
    "advantage",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        adv_code: {type: Sequelize.STRING}, 
        adv_type: {type: Sequelize.STRING}, 
        amount: {type: Sequelize.DOUBLE}, 

        product_list : {type : Sequelize.STRING},
        externe : {type : Sequelize.BOOLEAN},
    },
    {
        tableName: "aa_advantage",
    }
)
export default  Advantage ;
