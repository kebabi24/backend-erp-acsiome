import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const PopulationArticle = sequelize.define(
    "populationArticle",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        population_code: {type: Sequelize.STRING}, 
        description:{type:Sequelize.STRING},
        rank:{type:Sequelize.INTEGER},

        product_code :{type:Sequelize.STRING},
        quantity:{type:Sequelize.INTEGER},
        amount:{type:Sequelize.DECIMAL},
        volume:{type:Sequelize.DECIMAL},
    },
    {
        tableName: "aa_populationArticle",
    }
)
export default  PopulationArticle ;
