import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const GeneralLedger = sequelize.define(
    "GeneralLedger",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        glt_ref: {
            type: Sequelize.STRING,
            primaryKey: true,
          
        },
        glt_addr: {
            type: Sequelize.STRING,
            references:{
                model: "ad_mstr",
                key: "ad_addr",
            },

        },

       glt_entity : Sequelize.STRING,
 
       glt_acct : Sequelize.STRING,
        
       glt_cc : Sequelize.STRING,
                
       glt_desc : Sequelize.STRING,
        
       glt_date : Sequelize.DATEONLY,
        
       glt_effdate : Sequelize.DATEONLY,
        
       glt_amt : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_userid : Sequelize.STRING,
        
       glt_project : Sequelize.STRING,
        
       glt_batch : Sequelize.STRING,
        
       glt_curr : Sequelize.STRING,
        
       glt_curr_amt : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_unb : {type: Sequelize.BOOLEAN, defaultValue : false  },
        
       glt_tr_type : Sequelize.STRING,
        
       glt_error : Sequelize.STRING,
        
       glt_line : Sequelize.INTEGER, 
        
       glt_ex_rate : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
                
       glt_doc : Sequelize.STRING,
        
       glt_doc_type : Sequelize.STRING,
        
       glt_user1 : Sequelize.STRING,
        
       glt_user2 : Sequelize.STRING,
        
       glt_fx_ind : Sequelize.STRING,
        
       glt_sub : Sequelize.STRING,
        
       glt_rflag : {type: Sequelize.BOOLEAN, defaultValue : false  },
        
       glt_ecur_amt : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_en_exrate : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_entr_exrate : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_per : Sequelize.INTEGER, 
        
       glt_year : Sequelize.INTEGER, 
        
       glt__qadc01 : Sequelize.STRING,
        
       glt_correction : {type: Sequelize.BOOLEAN, defaultValue : false  },
        
       glt_dy_code : Sequelize.STRING,
        
       glt_dy_num : Sequelize.STRING,
        
       glt_ex_rate2 : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_ex_ratetype : Sequelize.STRING,
        
       glt_en_exrate2 : {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       glt_exru_seq : Sequelize.INTEGER, 
        
       glt_en_exru_seq : Sequelize.INTEGER, 
        
       glt_src_desc : Sequelize.STRING,

        glt_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_glt_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "glt_det",
    }
)
export default GeneralLedger
