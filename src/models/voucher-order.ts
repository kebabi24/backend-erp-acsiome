import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';



const sequelize = Container.get('sequelize');

const VoucherOrder = sequelize.define(
    "voucher-Order",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
        vh_inv_nbr: {
            type: Sequelize.STRING,
            unique: true,
        },
        vh_vend: {
            type: Sequelize.STRING,
            references:{
                model: "vd_mstr",
                key: "vd_addr",
            },

        },
        
		vh_category: {
			type: Sequelize.STRING,
			references: {
			  model: 'seq_mstr',
			  key: 'seq_seq',
			},
          },
        vh_nbr: Sequelize.STRING,
        vh_ship: Sequelize.STRING,
        vh_inv_date: Sequelize.DATEONLY,
        vh_ord_date: Sequelize.DATEONLY,
		vh_req_date: Sequelize.DATEONLY,
		vh_due_date: Sequelize.DATEONLY,
		vh_rmks: Sequelize.STRING,
		vh_cr_terms: Sequelize.STRING,
		vh_fob: Sequelize.STRING,
		vh_po: Sequelize.STRING,
		vh_shipvia: Sequelize.STRING,
		vh_partial: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_print_so: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_pr_list: Sequelize.STRING,
		vh_xslspsn: Sequelize.STRING,
		vh_source: Sequelize.STRING,
		vh_xcomm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_cr_card: Sequelize.STRING,
		vh_print_pl: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_cr_init: Sequelize.STRING,
		vh_stat: Sequelize.STRING,
		vh__qad01: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qad02: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qad03: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_tax_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_prepaid: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_to_inv: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_invoiced: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_ar_acct: Sequelize.STRING,
		vh_ar_cc: Sequelize.STRING,
		
		vh_ship_date: Sequelize.DATEONLY,
		vh_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_cmtindx: Sequelize.INTEGER,
		vh__qad04: Sequelize.INTEGER,
		vh_user1: Sequelize.STRING,
		vh_user2: Sequelize.STRING,
		vh_curr: Sequelize.STRING,
		vh_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_lang: Sequelize.STRING,
		vh_type: Sequelize.STRING,
		vh_conf_date: Sequelize.DATEONLY,
		vh_rev: Sequelize.INTEGER,
		vh_bol: Sequelize.STRING,
		vh__qad05: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_pst: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_fst_id: Sequelize.STRING,
		vh_amt:  {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_tax_amt:  {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_trl1_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_trl1_cd: Sequelize.STRING,
		vh_trl2_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_trl2_cd: Sequelize.STRING,
		vh_trl3_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_trl3_cd: Sequelize.STRING,
		vh_weight: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_weight_um: Sequelize.STRING,
		vh_size: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_size_um: Sequelize.STRING,
		vh_cartons: Sequelize.INTEGER,
		vh_site: Sequelize.STRING,
		vh_pst_id: Sequelize.STRING,
		vh_cncl_date: Sequelize.DATEONLY,
		vh_quote: Sequelize.STRING,
		vh_taxc: Sequelize.STRING,
		vh__chr01: Sequelize.STRING,
		vh__chr02: Sequelize.STRING,
		vh__chr03: Sequelize.STRING,
		vh__chr04: Sequelize.STRING,
		vh__chr05: Sequelize.STRING,
		vh__chr06: Sequelize.STRING,
		vh__chr07: Sequelize.STRING,
		vh__chr08: Sequelize.STRING,
		vh__chr09: Sequelize.STRING,
		vh__chr10: Sequelize.STRING,
		vh__dte01: Sequelize.DATEONLY,
		vh__dte02: Sequelize.DATEONLY,
		vh__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_credit: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_inv_cr: Sequelize.STRING,
		vh_project: Sequelize.STRING,
		vh_channel: Sequelize.STRING,
		vh_pst_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_fr_list: Sequelize.STRING,
		vh_fr_terms: Sequelize.STRING,
		vh_slspsn: Sequelize.STRING,
		vh_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_inv_mthd: Sequelize.STRING,
		vh_fix_rate: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_print_bl: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_userid: Sequelize.STRING,
		vh_tax_date: Sequelize.DATEONLY,
        vh_fsm_type: Sequelize.STRING,
		vh_conrep: Sequelize.STRING,
		vh_bank: Sequelize.STRING,
		vh_tax_env: Sequelize.STRING,
		vh_sched: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_fr_min_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_pr_list2: Sequelize.STRING,
		vh_tax_usage: Sequelize.STRING,
		vh_sa_nbr: Sequelize.STRING,
		vh_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_sch_mthd: Sequelize.STRING,
		vh_pricing_dt: Sequelize.DATEONLY,
		vh_priced_dt: Sequelize.DATEONLY,
		vh_ca_nbr: Sequelize.STRING,
		vh_eng_code: Sequelize.STRING,
		vh_fcg_code: Sequelize.STRING,
		vh_ship_eng: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_crprlist: Sequelize.STRING,
		vh__qadc01: Sequelize.STRING,
		vh__qadc02: Sequelize.STRING,
		vh__qadc03: Sequelize.STRING,
		vh__qadc04: Sequelize.STRING,
		vh__qadc05: Sequelize.STRING,
		vh__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_incl_iss: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh__qadi01: Sequelize.INTEGER,
		vh__qadi02: Sequelize.INTEGER,
		vh__qadi03: Sequelize.INTEGER,
		vh__qadd01: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qadd02: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qadd03: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qadt01: Sequelize.DATEONLY,
		vh__qadt02: Sequelize.DATEONLY,
		vh__qadt03: Sequelize.DATEONLY,
		vh_auth_days: Sequelize.INTEGER,
		vh_cum_acct: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_merge_rss: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_ship_cmplt: Sequelize.INTEGER,
		vh_bump_all: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_primary: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_cust_po: Sequelize.STRING,
		vh_secondary: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_ship_po: Sequelize.STRING,
		vh_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh_ex_ratetype: Sequelize.STRING,
		vh_div: Sequelize.STRING,
		vh_exru_seq: Sequelize.INTEGER,
		vh_app_owner: Sequelize.STRING,
		vh_ar_sub: Sequelize.STRING,
		vh_seq_order: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_inc_in_rss: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_firm_seq_days: Sequelize.INTEGER,
		vh_prep_tax: {type: Sequelize.DECIMAL, defaultValue : 0  },
		vh__qadl04: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_custref_val: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_consignment: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_max_aging_days: Sequelize.INTEGER,
		vh_consign_loc: Sequelize.STRING,
		vh_intrans_loc: Sequelize.STRING,
		vh_auto_replenish: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_revenue: Sequelize.STRING,
		vh_fsaccr_acct: Sequelize.STRING,
		vh_fsaccr_sub: Sequelize.STRING,
		vh_fsaccr_cc: Sequelize.STRING,
		vh_fsdef_acct: Sequelize.STRING,
		vh_fsdef_sub: Sequelize.STRING,
		vh_fsdef_cc: Sequelize.STRING,
		vh_manual_fr_terms: {type: Sequelize.BOOLEAN, defaultValue : false  },
		vh_req_time: Sequelize.STRING,
		vh_domain: Sequelize.STRING,
		oid_vh_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
		...base,
			},
			{
				tableName: "vh_hist",
			}
		)
export default VoucherOrder;
