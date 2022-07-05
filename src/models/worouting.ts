import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Worouting = sequelize.define(
    "worouting",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },


wr_nbr: Sequelize.STRING,

wr_op: Sequelize.INTEGER,

wr_desc: Sequelize.STRING,

wr_wkctr: Sequelize.STRING,

wr_mch_op: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_setup: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_run: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_move: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_act_setup: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_act_run: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_ord: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_wip: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_comp: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_rjct: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_rwrk: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_status: Sequelize.STRING,

wr_tool: Sequelize.STRING,

wr_vend: Sequelize.STRING,

wr_po_nbr: Sequelize.STRING,

wr_start: Sequelize.DATEONLY,

wr_due: Sequelize.DATEONLY,

wr_lot: Sequelize.INTEGER,

wr_sub_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_yield_pct: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_part: Sequelize.STRING,

wr_bdn_std: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lbr_std: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lbr_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_std: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_cmtindx: Sequelize.INTEGER,

wr_mch: Sequelize.STRING,

wr_milestone: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_user1: Sequelize.STRING,

wr_user2: Sequelize.STRING,

wr_std_op: Sequelize.STRING,

wr_setup_men: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_men_mch: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_tran_qty: Sequelize.INTEGER,

wr_lbr_ovhd: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_queue: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_wait: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_lead: Sequelize.INTEGER,

wr_qty_move: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__chr01: Sequelize.STRING,

wr__chr02: Sequelize.STRING,

wr__chr03: Sequelize.STRING,

wr__chr04: Sequelize.STRING,

wr__chr05: Sequelize.STRING,

wr__dte01: Sequelize.DATEONLY,

wr__dte02: Sequelize.DATEONLY,

wr__dec01: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__dec02: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__log01: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_mtl_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lbr_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_ovh_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvuse_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvuse_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_svuse_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_comp: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvrte_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvrte_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_svrte_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvrte_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvuse_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvrte_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvuse_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_svrte_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_svuse_accr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvrte_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lvuse_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvrte_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bvuse_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_svrte_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,


wr_svuse_rval: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_cost: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_setup_rte: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lbr_rate: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_pct: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_rate: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_mch_bdn: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_slvuse_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sbvuse_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_inque: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_outque: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_rejque: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_inqueb: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_outqueb: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_rejqueb: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumrjct: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumoscrap: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumrscrap: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumoadj: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumradj: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cummove: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumproc: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_qty_cumrwrk: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_po_line: Sequelize.INTEGER,

wr_wipmtl_part: Sequelize.STRING,

wr_mtl_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_mv_nxt_op: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_lbr_ll_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_ll_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_ll_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_mtl_ll_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_ovh_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_ovh_ll_act: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_lbr_ll_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_bdn_ll_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sub_ll_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_mtl_ll_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_ovh_ll_totx: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_auto_lbr: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_ca_int_type: Sequelize.STRING,

wr_covered_amt: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_curr: Sequelize.STRING,

wr_end_time: Sequelize.STRING,

wr_eng_code: Sequelize.STRING,

wr_fcg_code: Sequelize.STRING,

wr_fcg_index: Sequelize.INTEGER,

wr_fis_column: Sequelize.INTEGER,

wr_fis_sort: Sequelize.STRING,

wr_fsc_code: Sequelize.STRING,

wr_fsm_type: Sequelize.STRING,

wr_list_pr: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_price: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_prod_line: Sequelize.STRING,

wr_flbr_std: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_posted_run: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_st_time: Sequelize.STRING,

wr_act_posted: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_expense: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_flbr_cstd: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_covered_post: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_project: Sequelize.STRING,

wr_um: Sequelize.STRING,

wr__qadd05: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_fbdn_std: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_sv_code: Sequelize.STRING,

wr_itm_line: Sequelize.INTEGER,

wr__qadc01: Sequelize.STRING,

wr__qadc02: Sequelize.STRING,

wr__qadc03: Sequelize.STRING,

wr__qadc04: Sequelize.STRING,

wr__qade01: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__qade02: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__qade03: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__qade04: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr__qadi01: Sequelize.INTEGER,

wr__qadi02: Sequelize.INTEGER,

wr__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false },

wr__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false },

wr_unprocessed_amt: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

wr_domain: Sequelize.STRING,

oid_wr_route: {type: Sequelize.DECIMAL, defaultValue : 0 } ,

...base,
    },
    {
        tableName: "wr_route",
    }
)
export default Worouting
