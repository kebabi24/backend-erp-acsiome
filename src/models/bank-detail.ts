import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const BankDetail = sequelize.define(
    "BankDetail",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       
        bkd_bank: {
            type: Sequelize.STRING,
            references: {
                model: "bk_mstr",
                key: "bk_code",
            },
        },



    
bkd_pay_method: Sequelize.STRING, 

bkd_module: Sequelize.STRING, 

bkd_auto_payment: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

bkd_manual_payment: {type: Sequelize.BOOLEAN, defaultValue : false  },

bkd_draft: {type: Sequelize.BOOLEAN, defaultValue : false  },

bkd_from_ck: Sequelize.INTEGER, 

bkd_to_ck: Sequelize.INTEGER, 

bkd_next_ck: Sequelize.INTEGER, 

bkd_pip_acct: Sequelize.STRING, 

bkd_pip_cc: Sequelize.STRING, 

bkd_program: Sequelize.STRING, 

bkd_user1: Sequelize.STRING, 

bkd_user2: Sequelize.STRING, 

bkd_file: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

bkd_validation_list: Sequelize.STRING, 

bkd_curr_list: Sequelize.STRING, 
bkd_swift: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

bkd_acc_mandatory: {type: Sequelize.BOOLEAN, defaultValue : false  },

bkd_userl01: {type: Sequelize.BOOLEAN, defaultValue : false  },


bkd_userd01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 


bkd_usert01: Sequelize.DATEONLY, 

bkd_pay_group: Sequelize.INTEGER, 

bkd_exceed_balance: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

bkd_recon_credit: {type: Sequelize.BOOLEAN, defaultValue : false  },

bkd_pip_sub: Sequelize.STRING, 

bkd_useri01: Sequelize.INTEGER, 

bkd_mod_date: Sequelize.DATEONLY, 
bkd_dy_code: Sequelize.STRING,

bkd_mod_userid: Sequelize.STRING, 
    bkd_domain: {
        type: Sequelize.STRING,
        defaultValue: "acsiome",
    },
    oid_bkd_det: Sequelize.STRING,
    ...base,
},
    {
    tableName: "bkd_det",
    }

)
export default BankDetail
