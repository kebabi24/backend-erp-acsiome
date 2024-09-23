import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "./base"


const sequelize = Container.get("sequelize")

const Populationemploye = sequelize.define(
    "Populationemploye",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        pop_code: {type: Sequelize.STRING}, // can be duplicated
        pop_desc: {type: Sequelize.STRING}, // for dropdown
        pop_emp:{type:Sequelize.STRING},
        pop_domain: {type:Sequelize.STRING},
        ...base,
    },
    {tableName: 'pop_mstr'},
)
export default  Populationemploye ;
