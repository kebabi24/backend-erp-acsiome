import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const Promo = sequelize.define(
    "promo",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        promo_code: {type: Sequelize.STRING}, 
        pop_a_code: {type: Sequelize.STRING}, 
        pop_c_code: {type: Sequelize.STRING}, 

        start_date : {type : Sequelize.DATEONLY},
        end_date : {type : Sequelize.DATEONLY},
        site :{type:Sequelize.STRING},
        rank:{type:Sequelize.INTEGER},

        condition:{type:Sequelize.STRING , default : null},
        combine:{type:Sequelize.BOOLEAN},
        adv_code:{type:Sequelize.STRING , default : null},
    },
    {
        tableName: "aa_promo",
    }
)
export default  Promo ;
