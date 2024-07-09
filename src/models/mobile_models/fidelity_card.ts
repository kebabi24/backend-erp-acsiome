import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const FidelityCard = sequelize.define(
    "fidelityCard",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        card_number : {type: Sequelize.STRING},
        date_valide_start:{ type:Sequelize.DATEONLY},
        date_valide_end:{ type:Sequelize.DATEONLY},
        date_grace_start:{ type:Sequelize.DATEONLY},
        date_grace_end:{ type:Sequelize.DATEONLY},
        credit_grace:{type: Sequelize.DOUBLE},
        // ...base
    },
    {
        tableName: "aa_fidelitycard",
    }
)
export default  FidelityCard ;
