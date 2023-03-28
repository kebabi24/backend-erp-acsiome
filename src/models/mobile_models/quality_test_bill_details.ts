import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")
//  qps_det
const QualityTestBillDetails = sequelize.define(
    "qualityTestBillDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        qps_part: {type: Sequelize.STRING},
        qps_routing: {type: Sequelize.STRING},
        qps_op:{ type:Sequelize.INTEGER}, 
        qps_qty:{ type:Sequelize.DECIMAL},
        
        
        qps_user1:{ type:Sequelize.STRING},
        qps_user2:{ type:Sequelize.STRING},
        qps_chr01:{ type:Sequelize.STRING},
        qps_chr02:{ type:Sequelize.STRING},
        qps_chr03:{ type:Sequelize.STRING},
        qps_chr04:{ type:Sequelize.STRING},
        qps_chr05:{ type:Sequelize.STRING},
        qps_dec01:{ type:Sequelize.DECIMAL},
        qps_dec02:{ type:Sequelize.DECIMAL},
        qps_log01:{ type:Sequelize.BOOLEAN},
        qps_domain:{ type:Sequelize.STRING},
        oid_qps_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_qualityTestBillDetails",
    }
)
export default  QualityTestBillDetails ;
