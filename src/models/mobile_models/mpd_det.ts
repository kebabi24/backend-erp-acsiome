import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const MPD_det = sequelize.define(
    "mpd_det",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        mpd_nbr: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        mpd_type:{ type:Sequelize.STRING},
        mpd_label:{ type:Sequelize.STRING},
        mpd_tol:{ type:Sequelize.STRING},
        mpd_tol_type:{ type:Sequelize.STRING},
        mpd_cmtindx:{ type:Sequelize.INTEGER},
        
        mpd_user1:{ type:Sequelize.STRING},
        mpd_user2:{ type:Sequelize.STRING},

        mpd_chr01:{ type:Sequelize.STRING},
        mpd_chr02:{ type:Sequelize.STRING},
        mpd_chr03:{ type:Sequelize.STRING},
        mpd_chr04:{ type:Sequelize.STRING},
        mpd_chr05:{ type:Sequelize.STRING},
        mpd_dec01:{ type:Sequelize.DECIMAL},
        mpd_dec02:{ type:Sequelize.DECIMAL},
        mpd_domain:{ type:Sequelize.STRING},
        oid_mpd_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_mpd_det",
    }
)
export default  MPD_det ;
