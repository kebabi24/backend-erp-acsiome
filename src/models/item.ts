import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Item = sequelize.define(
    "items",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pt_part: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        pt_desc1: Sequelize.STRING,
        pt_desc2: Sequelize.STRING,
        pt_um: Sequelize.STRING,
        pt_draw: Sequelize.STRING,
        pt_prod_line: {
            type: Sequelize.STRING,
            references:{
                model: "pl_mstr",
                key: "pl_prod_line",
            },

        },
        pt_group: Sequelize.STRING,
        pt_part_type: Sequelize.STRING,
        pt_status: Sequelize.STRING,
        pt_abc: Sequelize.STRING,
        pt_iss_pol: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_phantom: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_loc:{
            type: Sequelize.STRING,
            references:{
                model: "loc_mstr",
                key: "loc_loc",
            },

        },
        pt_abc_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_avg_int: Sequelize.INTEGER,
        pt_cyc_int: Sequelize.INTEGER,
        pt_ms: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_plan_ord: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_mrp: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_ord_pol: Sequelize.STRING,
        pt_ord_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_ord_per: Sequelize.INTEGER,
        pt_sfty_stk: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_sfty_time: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_rop: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_buyer: Sequelize.STRING,
        pt_vend: Sequelize.STRING,
        pt_pm_code: Sequelize.STRING,
        pt_mfg_lead: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_pur_lead: Sequelize.INTEGER,
        pt_insp_rqd: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_insp_lead: Sequelize.INTEGER,
        pt_cum_lead: Sequelize.INTEGER,
        pt_ord_min: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_ord_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_ord_mult: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_yield_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_setup: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_setup_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_run_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_run: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xmtl_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xlbr_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xbdn_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xsub_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xmtl_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xlbr_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xbdn_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xsub_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xtot_cur: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_cur_date: Sequelize.DATEONLY,
        pt_xmtl_stdtl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xlbr_stdtl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xbdn_stdtl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xsub_stdtl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xtot_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_std_date: Sequelize.DATEONLY,
        pt_ll_code: Sequelize.INTEGER,
        pt_abc_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_routing: Sequelize.STRING,
        pt_lot_ser: Sequelize.STRING,
        pt_timefence: Sequelize.INTEGER,
        pt_xmtl_stdll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xlbr_stdll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xbdn_stdll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xsub_stdll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_rev: Sequelize.STRING,
        pt_last_eco: Sequelize.DATEONLY,
        pt_qc_lead: Sequelize.INTEGER,
        pt_auto_lot: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_assay: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_batch: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_user3: Sequelize.STRING,
        pt_user2: Sequelize.STRING,
        pt_user1: Sequelize.STRING,
        pt_net_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_net_wt_um: Sequelize.STRING,
        pt_size: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_size_um: Sequelize.STRING,
        pt_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_taxc: Sequelize.STRING,
        pt_rollup: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_xovh_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xovh_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xovh_stdll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_xovh_stdtl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_site: Sequelize.STRING,
        pt_shelflife: Sequelize.INTEGER,
        pt_critical: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_sngl_lot: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_upc: Sequelize.STRING,
        pt_hazard: Sequelize.STRING,
        pt_added: Sequelize.DATEONLY,
        pt_length: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_height: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_width: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_dim_um: Sequelize.STRING,
        pt_pkg_code: Sequelize.STRING,
        pt_network: Sequelize.STRING,
        pt_fr_class: Sequelize.STRING,
        pt_spec_hdlg: Sequelize.STRING,
        pt_bom_code: Sequelize.STRING,
        pt_loc_type: Sequelize.STRING,
        pt_transtype: Sequelize.STRING,
        pt_warr_cd: Sequelize.STRING,
        pt_pvm_days: Sequelize.INTEGER,
        pt_isb: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_mttr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_mtbf: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_svc_type: Sequelize.STRING,
        pt_svc_group: Sequelize.STRING,
        pt_ven_warr: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_fru: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_mfg_mttr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_mfg_mtbf: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_sttr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_origin: Sequelize.STRING,
        pt_tariff: Sequelize.STRING,
        pt_sys_type: Sequelize.STRING,
        pt_inst_call: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_cover: Sequelize.STRING,
        pt_unit_isb: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_article: Sequelize.STRING,
        pt_ll_drp: Sequelize.INTEGER,
        pt_po_site: Sequelize.STRING,
        pt_ship_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_ship_wt_um: Sequelize.STRING,
        pt_userid: Sequelize.STRING,
        pt_mod_date: Sequelize.DATEONLY,
        pt_comm_code: Sequelize.STRING,
        pt_dea: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_formula: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_obs_date: Sequelize.DATEONLY,
        pt_pvm_bom: Sequelize.STRING,
        pt_pvm_route: Sequelize.STRING,
        pt_pvm_um: Sequelize.STRING,
        pt_rp_bom: Sequelize.STRING,
        pt_rp_route: Sequelize.STRING,
        pt_rp_vendor: Sequelize.STRING,
        pt_rctpo_status: Sequelize.STRING,
        pt_rollup_id: Sequelize.STRING,
        pt_spec_grav: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_joint_type: Sequelize.STRING,
        pt_mfg_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_pur_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_drp_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_pou_code: Sequelize.STRING,
        pt_wks_avg: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_wks_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_wks_min: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_pick_logic: Sequelize.INTEGER,
        pt_fiscal_class: Sequelize.STRING,
        pt_dsgn_grp: Sequelize.STRING,
        pt_drwg_loc: Sequelize.STRING,
        pt_ecn_rev: Sequelize.STRING,
        pt_drwg_size: Sequelize.STRING,
        pt_model: Sequelize.STRING,
        pt_repairable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_rctwo_status: Sequelize.STRING,
        pt_rctpo_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_lot_grp: Sequelize.STRING,
        pt_rctwo_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_break_cat: Sequelize.STRING,
        pt_fsc_code: Sequelize.STRING,
        pt_trace_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_trace_detail: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_pm_mrp: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_ins_call_type: Sequelize.STRING,
        pt_ins_bom: Sequelize.STRING,
        pt_ins_route: Sequelize.STRING,
        pt_promo: Sequelize.STRING,
        pt_meter_interval: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pt_meter_um: Sequelize.STRING,
        pt_wh: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_btb_type: Sequelize.STRING,
        pt_cfg_type: Sequelize.STRING,
        pt_app_owner: Sequelize.STRING,
        pt_op_yield: Sequelize.STRING,
        pt_run_seq1: Sequelize.STRING,
        pt_run_seq2: Sequelize.STRING,
        pt_atp_enforcement: Sequelize.STRING,
        pt_atp_family: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pt_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_pt_mstr: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "pt_mstr",
    }
)
export default Item
