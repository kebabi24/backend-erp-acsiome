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
        pop_fidelity:{type:Sequelize.BOOLEAN},
        pop_habilitation:{type:Sequelize.BOOLEAN},
        pop_last_date:{type:Sequelize.INTEGER},
        pop_conf_date:{type:Sequelize.INTEGER},
        pop_age1:{type:Sequelize.INTEGER},
        pop_age2:{type:Sequelize.INTEGER},
        pop_gender:{type:Sequelize.STRING},
        pop_country:{type:Sequelize.STRING},
        pop_city:{type:Sequelize.STRING},  //commune
        pop_state:{type:Sequelize.STRING}, //wilaya
        pop_zip:{type:Sequelize.STRING},
        pop_county:{type:Sequelize.STRING}, //daera
        
        pop_job:{type:Sequelize.STRING},
        pop_level:{type:Sequelize.STRING},
        pop_emp:{type:Sequelize.STRING},
        pop_domain: {type:Sequelize.STRING},
        ...base,
    },
    {tableName: 'pop_mstr'},
)
export default  Populationemploye ;
