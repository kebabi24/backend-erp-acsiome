import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

//  ipd_det

const ItemSpecificationDetails = sequelize.define(
    "itemSpecificationDetails",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        ipd_part: {type: Sequelize.STRING},
        ipd_routing: {type: Sequelize.STRING},
        ipd_op:{ type:Sequelize.INTEGER},
        
        ipd_nbr:{ type:Sequelize.STRING},
        ipd_test:{ type:Sequelize.STRING},
        ipd_label:{ type:Sequelize.STRING},
        ipd_tol:{ type:Sequelize.STRING},
        ipd_include:{ type:Sequelize.BOOLEAN},
        ipd_cmtindx:{ type:Sequelize.INTEGER},
        ipd_tol_type:{ type:Sequelize.STRING},
        ipd_start:{ type:Sequelize.DATEONLY},
        ipd_end:{ type:Sequelize.DATEONLY},
        ipd_testmthd:{ type:Sequelize.STRING},
        ipd_attribute:{ type:Sequelize.STRING},
        
        ipd_user1:{ type:Sequelize.STRING},
        ipd_user2:{ type:Sequelize.STRING},
        ipd_chr01:{ type:Sequelize.STRING},
        ipd_chr02:{ type:Sequelize.STRING},
        ipd_chr03:{ type:Sequelize.STRING},
        ipd_chr04:{ type:Sequelize.STRING},
        ipd_chr05:{ type:Sequelize.STRING},
        ipd_dec01:{ type:Sequelize.DECIMAL},
        ipd_dec02:{ type:Sequelize.DECIMAL},
        ipd_domain:{ type:Sequelize.STRING},
        oid_ipd_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_itemSpecificationDetails",
    }
)
export default  ItemSpecificationDetails ;
