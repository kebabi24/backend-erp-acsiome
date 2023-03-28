import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")
//  qro_det
const QualityInspectionRoutingDetails = sequelize.define(
    "qualityInspectionRoutingDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        qro_routing: {type: Sequelize.STRING},
        qro_op:{ type:Sequelize.INTEGER}, 
        qro_cmtindx:{ type:Sequelize.INTEGER},

        qro_desc: {type: Sequelize.STRING},
        qro_mch: {type: Sequelize.STRING},
        qro_mch_op: {type: Sequelize.INTEGER},
        qro_queue: {type: Sequelize.DECIMAL},
        qro_tool: {type: Sequelize.STRING},
        qro_wkctr: {type: Sequelize.STRING},
        
        
        qro_user1:{ type:Sequelize.STRING},
        qro_user2:{ type:Sequelize.STRING},
        qro_chr01:{ type:Sequelize.STRING},
        qro_chr02:{ type:Sequelize.STRING},
        qro_chr03:{ type:Sequelize.STRING},
        qro_chr04:{ type:Sequelize.STRING},
        qro_chr05:{ type:Sequelize.STRING},
        qro_dec01:{ type:Sequelize.DECIMAL},
        qro_dec02:{ type:Sequelize.DECIMAL},
        qro_log01:{ type:Sequelize.BOOLEAN},
        qro_domain:{ type:Sequelize.STRING},
        oid_qro_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_qualityInspectionRoutingDetails",
    }
)
export default  QualityInspectionRoutingDetails ;
