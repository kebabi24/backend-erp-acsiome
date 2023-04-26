import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const ProjectAssetDown = sequelize.define(
    "pad_det",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        project_code: {type: Sequelize.STRING},
        down_date:{type:Sequelize.DATEONLY},

        asset_desc:{type:Sequelize.STRING},
        asset_serial:{type:Sequelize.STRING},
        asset_down_type:{type:Sequelize.STRING},
        asset_comment:{type:Sequelize.STRING},
        asset_down_duration:{type:Sequelize.INTEGER},
        
        pad_domain:{type:Sequelize.STRING},

        
        // ...base,
    },
    {
        tableName: "aa_pad_det",
    }
)
export default  ProjectAssetDown ;
