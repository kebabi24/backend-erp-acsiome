
import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const WorkOrder = sequelize.define(
    "work-order",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },

wo_nbr: Sequelize.STRING, 

wo_lot: Sequelize.STRING, 

wo_so_job: Sequelize.STRING, 

wo_ord_date: Sequelize.DATEONLY, 

wo_rel_date: Sequelize.DATEONLY, 

wo_due_date: Sequelize.DATEONLY, 

wo_per_date: Sequelize.DATEONLY, 

wo_part: {
    type: Sequelize.STRING,
    references:{
        model: "pt_mstr",
        key: "pt_part",
    },

},

wo_type: Sequelize.STRING, 

wo_qty_ord: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_qty_comp: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_qty_rjct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_status: Sequelize.STRING, 

wo_vend: Sequelize.STRING, 

wo_rmks: Sequelize.STRING, 

wo_qty_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_rjct_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_bo_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_yield_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_rev: Sequelize.STRING, 

wo_acct: Sequelize.STRING, 

wo_cc: Sequelize.STRING, 

wo__qad01: Sequelize.STRING, 

wo_lot_prev: Sequelize.STRING, 

wo_schd_type: Sequelize.STRING, 

wo_cmtindx: Sequelize.INTEGER, 

wo_project: Sequelize.STRING, 

wo_lead_time: Sequelize.INTEGER, 

wo_wip_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_lbr_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_mtl_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_bdn_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_sub_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_user1: Sequelize.STRING, 

wo_user2: Sequelize.STRING, 

wo_ovh_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_loc: Sequelize.STRING, 

wo_serial: Sequelize.STRING, 

wo_routing: Sequelize.STRING, 

wo_bom_code: Sequelize.STRING, 

wo_site: Sequelize.STRING, 

wo_queue_eff: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_draw: Sequelize.STRING, 

wo_lbr_up: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_bdn_up: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_gl_lbr: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_gl_bdn: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo__chr01: Sequelize.STRING, 

wo__chr02: Sequelize.STRING, 

wo__chr03: Sequelize.STRING, 

wo__chr04: Sequelize.STRING, 

wo__chr05: Sequelize.STRING, 

wo__dte01: Sequelize.DATEONLY, 

wo__dte02: Sequelize.DATEONLY, 

wo__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo__log01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_line: Sequelize.STRING, 

wo_var: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_mtl_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_lbr_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_bdn_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_sub_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_mvar_acct: Sequelize.STRING, 

wo_mvar_cc: Sequelize.STRING, 

wo_mvrr_acct: Sequelize.STRING, 

wo_mvrr_cc: Sequelize.STRING, 

wo_svar_acct: Sequelize.STRING, 

wo_svar_cc: Sequelize.STRING, 

wo_svrr_acct: Sequelize.STRING, 

wo_svrr_cc: Sequelize.STRING, 

wo_flr_acct: Sequelize.STRING, 

wo_flr_cc: Sequelize.STRING, 

wo__dec03: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_rjct_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_mthd_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_rval_tot: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_acct_close: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_close_date: Sequelize.DATEONLY, 

wo_close_eff: Sequelize.DATEONLY, 

wo_fsm_type: Sequelize.STRING, 

wo_xvar_acct: Sequelize.STRING, 

wo_xvar_cc: Sequelize.STRING, 

wo_myld_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_joint_type: Sequelize.STRING, 

wo_prod_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_qty_type: Sequelize.STRING, 

wo__dec04: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_base_id: Sequelize.STRING, 

wo_unit_cost: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_mix_var: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_bdn_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_lbr_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_mtl_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_sub_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_ovh_totx: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_batch: Sequelize.STRING, 

wo_assay: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo_grade: Sequelize.STRING, 

wo_expire: Sequelize.DATEONLY, 

wo_rctstat: Sequelize.STRING, 

wo_lot_next: Sequelize.STRING, 

wo_lot_rcpt: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_rctstat_active: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_ca_int_type: Sequelize.STRING, 

wo_date_posted: Sequelize.DATEONLY, 

wo_iss_site: Sequelize.STRING, 

wo_itm_line: Sequelize.INTEGER, 

wo__qadc01: Sequelize.STRING, 

wo__qadc02: Sequelize.STRING, 

wo__qadc03: Sequelize.STRING, 

wo__qadt01: Sequelize.DATEONLY, 

wo__qadt02: Sequelize.DATEONLY, 

wo__qade01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo__qade02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo__qade03: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

wo__qadi01: Sequelize.INTEGER, 

wo__qadi02: Sequelize.INTEGER, 

wo__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

wo_eng_code: Sequelize.STRING, 

wo_sub: Sequelize.STRING, 

wo_flr_sub: Sequelize.STRING, 

wo_mvar_sub: Sequelize.STRING, 

wo_mvrr_sub: Sequelize.STRING, 

wo_svar_sub: Sequelize.STRING, 

wo_svrr_sub: Sequelize.STRING, 

wo_xvar_sub: Sequelize.STRING, 

wo_ref: Sequelize.STRING, 

wo_record_date: Sequelize.DATEONLY, 

wo_stat_close_date: Sequelize.DATEONLY, 

wo_stat_close_userid: Sequelize.STRING, 

wo_app_owner: Sequelize.STRING, 




wo_domain: {type: Sequelize.STRING,	defaultValue: 'zima'	},
oid_wo_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
        },
        {
            tableName: "wo_mstr",
        }
    )
export default WorkOrder;
