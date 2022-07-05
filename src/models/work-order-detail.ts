import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const WorkOrderDetail = sequelize.define(
    "WorkOrderDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       
        wod_nbr: Sequelize.STRING,
            

        wod_lot: {
            type: Sequelize.INTEGER,
            references: {
                model: "wo_mstr",
                key: "id",
            },
        },


wod_iss_date: Sequelize.DATEONLY,

wod_part: {
    type: Sequelize.STRING,
    references: {
        model: "pt_mstr",
        key: "pt_part",
    },
},

wod_qty_req: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_qty_all: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_qty_pick: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_qty_iss: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_tot_std: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_deliver: Sequelize.STRING, 

wod_qty_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_bo_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_loc: Sequelize.STRING, 
wod_um: Sequelize.STRING,

wod_serial: Sequelize.STRING, 

wod_cmtindx: Sequelize.INTEGER,

wod_user1: Sequelize.STRING, 

wod_user2: Sequelize.STRING, 

wod_op: Sequelize.INTEGER,

wod_critical: {type: Sequelize.BOOLEAN, defaultValue : false  },

wod_site: Sequelize.STRING, 

wod__chr01: Sequelize.STRING, 

wod__chr02: Sequelize.STRING, 

wod__chr03: Sequelize.STRING, 

wod__chr04: Sequelize.STRING, 

wod__chr05: Sequelize.STRING, 

wod__dte01: Sequelize.DATEONLY,

wod__dte02: Sequelize.DATEONLY,

wod__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },


wod_bom_qty: {type: Sequelize.DECIMAL, defaultValue : 0  }, 


wod_mtl_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvuse_post: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_bom_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvrte_post: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvrte_rval: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvuse_rval: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvrte_accr: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_mvuse_accr: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_ca_int_type: Sequelize.STRING, 

wod_covered_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_eng_code: Sequelize.STRING, 

wod_fcg_code: Sequelize.STRING, 

wod_fcg_index: Sequelize.INTEGER,

wod_fis_column: Sequelize.INTEGER,

wod_fis_sort: Sequelize.STRING, 

wod_fsc_code: Sequelize.STRING, 

wod_fsm_type: Sequelize.STRING, 

wod_list_pr: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_price: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_prod_line: Sequelize.STRING, 

wod_qty_posted: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_qty_ret: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_status: Sequelize.STRING, 

wod_line_price: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_covered_post: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_project: Sequelize.STRING, 

wod_ret_iss: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_exg_price: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_sv_code: Sequelize.STRING, 

wod_ret_site: Sequelize.STRING, 

wod_ret_loc: Sequelize.STRING, 

wod_std_cost: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod_itm_line: Sequelize.INTEGER,

wod_sod_line: Sequelize.INTEGER,

wod_sod_nbr: Sequelize.STRING, 

wod_seo_load: {type: Sequelize.BOOLEAN, defaultValue : false  },

wod_from_loc: Sequelize.STRING, 

wod_from_site: Sequelize.STRING, 

wod_ref: Sequelize.STRING, 

wod_ret_serial: Sequelize.STRING, 

wod__qadc01: Sequelize.STRING, 

wod__qadc02: Sequelize.STRING, 

wod__qadc03: Sequelize.STRING, 

wod__qadt01: Sequelize.DATEONLY,

wod__qadt02: Sequelize.DATEONLY,

wod__qade01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod__qade02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wod__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  },

wod__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  },

wod_isb_ref: Sequelize.INTEGER,

wod_ret_ref: Sequelize.STRING, 

wod_yield_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 


wod_domain: {
    type: Sequelize.STRING,
    defaultValue: 'zima'
},
oid_wod_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
...base,
    },
    {
        tableName: "wod_det",
    }
)
export default WorkOrderDetail
