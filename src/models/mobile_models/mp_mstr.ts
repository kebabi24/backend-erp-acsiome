import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const MP = sequelize.define(
    "mp",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        mp_nbr: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        mp_desc:{ type:Sequelize.STRING},
        mp_expire:{type:Sequelize.DATEONLY},
        
        mp_user1:{ type:Sequelize.STRING},
        mp_user2:{ type:Sequelize.STRING},

        mp_chr01:{ type:Sequelize.STRING},
        mp_chr02:{ type:Sequelize.STRING},
        mp_chr03:{ type:Sequelize.STRING},
        mp_chr04:{ type:Sequelize.STRING},
        mp_chr05:{ type:Sequelize.STRING},
        mp_dec01:{ type:Sequelize.DECIMAL},
        mp_dec02:{ type:Sequelize.DECIMAL},
        mp_domain:{ type:Sequelize.STRING},
        oid_mp_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_mp_mstr",
    }
)
export default  MP ;
