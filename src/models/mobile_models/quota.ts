import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const Quota = sequelize.define(
    "quota",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        quota_code : {type: Sequelize.STRING},
        site_code:{ type:Sequelize.STRING},  
        role_code:{ type:Sequelize.STRING},  
        the_date:{type:Sequelize.DATEONLY},
        progress_level :{type: Sequelize.INTEGER},
        canceled :{type: Sequelize.BOOLEAN},
     
    
    },
    {
        tableName: "aa_quota",
    }
)
export default  Quota ;
