import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const PopulationClientPromo = sequelize.define(
    "populationClientPromo",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        population_code: {type: Sequelize.STRING}, // can be duplicated
        population_desc: {type: Sequelize.STRING}, 
        code_element:{type:Sequelize.STRING},
        description:{type:Sequelize.STRING},
        type:{type:Sequelize.STRING}
    },
    {
        tableName: "aa_populationclientpromo",
    }
)
export default  PopulationClientPromo ;
