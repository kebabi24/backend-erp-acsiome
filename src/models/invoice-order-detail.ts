import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const InvoiceOrderDetail = sequelize.define(
    "InvoiceOrderDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       
        idh_inv_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "ih_hist",
                key: "ih_inv_nbr",
            },
        },
        idh_line: Sequelize.INTEGER,
        idh_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },

        idh_tax_code: {
            type: Sequelize.STRING,
            references: {
                model: "tx2_mstr",
                key: "tx2_tax_code",
            },
        },
idh_due_date: Sequelize.DATEONLY,
idh_per_date: Sequelize.DATEONLY,
idh_req_date: Sequelize.DATEONLY,
idh_qty_ord:  {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_all: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_pick: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_ship: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_inv: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_loc: Sequelize.STRING,
idh_type: Sequelize.STRING,
idh_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_std_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_bo_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_acct: Sequelize.STRING,
idh_abnormal: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_serial: Sequelize.STRING,
idh_desc: Sequelize.STRING,
idh_um: Sequelize.STRING,
idh_cc: Sequelize.STRING,
idh_comment: Sequelize.STRING,
idh_lot: Sequelize.STRING,
idh_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_fa_nbr: Sequelize.STRING,
idh_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_project: Sequelize.STRING,
idh_cmtindx: Sequelize.INTEGER,
idh_custpart: Sequelize.STRING,
idh__qad01: Sequelize.INTEGER,
idh_status: Sequelize.STRING,
idh_xslspsn: Sequelize.STRING,
idh_xcomm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_dsc_acct: Sequelize.STRING,
idh_dsc_cc: Sequelize.STRING,
idh_list_pr: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_user1: Sequelize.STRING,
idh_user2: Sequelize.STRING,
idh_sob_rev: Sequelize.DATEONLY,
idh_sob_std: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_qty_qote: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_consume: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_expire: Sequelize.DATEONLY,
idh__qad02: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_taxc: Sequelize.STRING,
idh_partial: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_site: Sequelize.STRING,
idh_prodline: Sequelize.STRING,
idh_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_fst_list: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_pst: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh__chr01: Sequelize.STRING,
idh__chr02: Sequelize.STRING,
idh__chr03: Sequelize.STRING,
idh__chr04: Sequelize.STRING,
idh__chr05: Sequelize.STRING,
idh__chr06: Sequelize.STRING,
idh__chr07: Sequelize.STRING,
idh__chr08: Sequelize.STRING,
idh__chr09: Sequelize.STRING,
idh__chr10: Sequelize.STRING,
idh__dte01: Sequelize.DATEONLY,
idh__dte02: Sequelize.DATEONLY,
idh__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_tax_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_curr: Sequelize.STRING,
idh_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_curr_rlse_id: Sequelize.STRING,
idh_sched: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_contr_id: Sequelize.STRING,
idh_pickdate: Sequelize.DATEONLY,
idh_confirm: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_cum_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_cum_date: Sequelize.DATEONLY,
idh_for: Sequelize.STRING,
idh_ref: Sequelize.INTEGER,
idh_qty_per: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_item: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_rma_type: Sequelize.STRING,
idh_owner: Sequelize.STRING,
idh_calc_isb: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_fr_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_slspsn: Sequelize.STRING,
idh_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_ord_mult: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_pkg_code: Sequelize.STRING,
idh_translt_days: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_fsm_type: Sequelize.STRING,
idh_conrep: Sequelize.STRING,
idh_sch_data: Sequelize.STRING,
idh_sch_mrp: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_rlse_nbr: Sequelize.INTEGER,
idh_start_eff: Sequelize.DATEONLY,
idh_end_eff: Sequelize.DATEONLY,
idh_dock: Sequelize.STRING,
idh_pr_list: Sequelize.STRING,
idh_translt_hrs: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_out_po: Sequelize.STRING,
idh_raw_days: Sequelize.INTEGER,
idh_fab_days: Sequelize.INTEGER,
idh_tax_usage: Sequelize.STRING,
idh_rbkt_days: Sequelize.INTEGER,
idh_rbkt_weeks: Sequelize.INTEGER,
idh_rbkt_mths: Sequelize.INTEGER,
idh_sched_chgd: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_pastdue: Sequelize.STRING,
idh_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_fr_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_fr_wt_um: Sequelize.STRING,
idh_fr_class: Sequelize.STRING,
idh_fr_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_ship: Sequelize.STRING,
idh_sa_nbr: Sequelize.STRING,
idh_enduser: Sequelize.STRING,
idh_isb_loc: Sequelize.STRING,
idh_upd_isb: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_isb_ref: Sequelize.INTEGER,
idh_auto_ins: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_drp_ref: Sequelize.STRING,
idh_tax_env: Sequelize.STRING,
idh_crt_int: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_fr_list: Sequelize.STRING,
idh_pricing_dt: Sequelize.DATEONLY,
idh_act_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_covered_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_fixed_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_inv_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_car_load: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_ca_line: Sequelize.INTEGER,
idh_qty_cons: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_qty_ret: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_ca_nbr: Sequelize.STRING,
idh_qty_pend: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_to_loc: Sequelize.STRING,
idh_to_site: Sequelize.STRING,
idh_to_ref: Sequelize.STRING,
idh_ln_ref: Sequelize.STRING,
idh_qty_exch: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_sad_line: Sequelize.INTEGER,
idh_warr_start: Sequelize.DATEONLY,
idh_mod_userid: Sequelize.STRING,
idh_mod_date: Sequelize.DATEONLY,
idh_sv_code: Sequelize.STRING,
idh_alt_pkg: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_for_serial: Sequelize.STRING,
idh_override_lmt: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh__qadc01: Sequelize.STRING,
idh__qadc02: Sequelize.STRING,
idh__qadc03: Sequelize.STRING,
idh__qadc04: Sequelize.STRING,
idh__qadt01: Sequelize.DATEONLY,
idh__qadt02: Sequelize.DATEONLY,
idh__qadt03: Sequelize.DATEONLY,
idh__qadt04: Sequelize.DATEONLY,
idh__qadd01: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh__qadd02: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh__qadd03: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh__qadl03: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh__qadi01: Sequelize.INTEGER,
idh__qadi02: Sequelize.INTEGER,
idh_bonus: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_btb_type: Sequelize.STRING,
idh_btb_po: Sequelize.STRING,
idh_btb_pod_line: Sequelize.INTEGER,
idh_btb_vend: Sequelize.STRING,
idh_exp_del: Sequelize.DATEONLY,
idh_dir_all: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_cfg_type: Sequelize.STRING,
idh_div: Sequelize.STRING,
idh_pl_priority: Sequelize.INTEGER,
idh_prig1: Sequelize.STRING,
idh_prig2: Sequelize.STRING,
idh__qadd04: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_sub: Sequelize.STRING,
idh_dsc_sub: Sequelize.STRING,
idh_dsc_project: Sequelize.STRING,
idh_qty_ivcd: {type: Sequelize.DECIMAL, defaultValue : 0  },
idh_cum_time: Sequelize.INTEGER,
idh_ship_part: Sequelize.STRING,
idh_promise_date: Sequelize.DATEONLY,
idh_charge_type: Sequelize.STRING,
idh_order_category: Sequelize.STRING,
idh_modelyr: Sequelize.STRING,
idh_custref: Sequelize.STRING,
idh_consignment: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_max_aging_days: Sequelize.INTEGER,
idh_consign_loc: Sequelize.STRING,
idh_intrans_loc: Sequelize.STRING,
idh_auto_replenish: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_manual_fr_list: {type: Sequelize.BOOLEAN, defaultValue : false  },
idh_req_time: Sequelize.STRING,

idh_draw: Sequelize.STRING,
idh_prod_line: Sequelize.STRING,
idh_promo: Sequelize.STRING,    
idh_group: Sequelize.STRING,
idh_part_type: Sequelize.STRING,
idh_dsgn_grp : Sequelize.STRING,
idh_inv_date : Sequelize.DATEONLY,
idh_rev: Sequelize.STRING,
idh_domain: Sequelize.STRING,
oid_idh_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
...base,
    },
    {
        tableName: "idh_det",
    }
)
export default InvoiceOrderDetail
