import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Ps = sequelize.define(
    "Ps",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },


        ps_parent:  Sequelize.STRING,
         
       
       ps_comp: {
        type: Sequelize.STRING,
        references:{
            model: "pt_mstr",
            key: "pt_part",
        },

    }, 
       ps_ref: Sequelize.STRING, 
        
       ps_qty_per: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_scrp_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_ps_code: Sequelize.STRING, 
        
       ps_lt_off: Sequelize.INTEGER,
        
       ps_start: Sequelize.DATEONLY, 
        
       ps_end: Sequelize.DATEONLY, 
        
       ps_rmks: Sequelize.STRING, 
        
       ps_op: Sequelize.INTEGER,
        
       ps_item_no: Sequelize.INTEGER,
        
       ps_mandatory: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_exclusive: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_process: Sequelize.STRING, 
        
       ps_qty_type: Sequelize.STRING, 
        
       ps_user1: Sequelize.STRING, 
        
       ps_user2: Sequelize.STRING, 
        
       ps_fcst_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_default: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_group: Sequelize.STRING, 
        
       ps_critical : {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_qty_per_b: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_assay: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_comm_code: Sequelize.STRING, 
        
       ps_comp_um: Sequelize.STRING, 
        
       ps_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_userid: Sequelize.STRING, 
        
       ps_mod_date: Sequelize.DATEONLY, 
        
       ps__qad01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_non_bal: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps_batch_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_cmtindx: Sequelize.INTEGER,
        
       ps_start_ecn: Sequelize.STRING, 
        
       ps_end_ecn: Sequelize.STRING, 
        
       ps_joint_type: Sequelize.STRING, 
        
       ps_cop_qty: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_cst_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_prod_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_qty_cons: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_qty_exch: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps_qty_diag: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps__chr01: Sequelize.STRING, 
        
       ps__chr02: Sequelize.STRING, 
        
       ps__dte01: Sequelize.DATEONLY, 
        
       ps__dte02: Sequelize.DATEONLY, 
        
       ps__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps__log01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps__log02: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps__qadc01: Sequelize.STRING, 
        
       ps__qadc02: Sequelize.STRING, 
        
       ps__qadt01: Sequelize.DATEONLY, 
        
       ps__qadt02: Sequelize.DATEONLY, 
        
       ps__qadt03: Sequelize.DATEONLY, 
        
       ps__qadd01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps__qadd02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
       ps__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
       ps__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  }, 


        ps_domain: Sequelize.STRING,
        oid_ps_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
        },
        {
            tableName: "ps_mstr",
        }
    )
    export default Ps
    