import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")


//  ip_mstr
const SpecificationTestResults = sequelize.define(
    "SpecificationTestResults",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        ip_part: {type: Sequelize.STRING}, // article
        ip_routing:{ type:Sequelize.STRING}, // 
        ip_op:{type:Sequelize.INTEGER},
        ip_nbr:{ type:Sequelize.STRING},  // code_doc
        
        ip_user1:{ type:Sequelize.STRING},
        ip_user2:{ type:Sequelize.STRING},
        ip_chr01:{ type:Sequelize.STRING},
        ip_chr02:{ type:Sequelize.STRING},
        ip_chr03:{ type:Sequelize.STRING},
        ip_chr04:{ type:Sequelize.STRING},
        ip_chr05:{ type:Sequelize.STRING},
        ip_dec01:{ type:Sequelize.DECIMAL},
        ip_dec02:{ type:Sequelize.DECIMAL},
        ip_domain:{ type:Sequelize.STRING},
        oid_ip_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_specificationTestResults",
    }
)
export default  SpecificationTestResults ;
