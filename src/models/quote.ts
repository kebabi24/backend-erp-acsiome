import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Sequence from './sequence';


const sequelize = Container.get('sequelize');

const Quote = sequelize.define(
    "Quote",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
        qo_nbr: {
            type: Sequelize.STRING,
            unique: true,
        },
        qo_cust: {
            type: Sequelize.STRING,
            references:{
                model: "cm_mstr",
                key: "cm_addr",
            },

        },
        qo_po: Sequelize.STRING,
        qo_ship: Sequelize.STRING,
        qo_ship_date: Sequelize.DATEONLY,
        qo_ord_date: Sequelize.DATEONLY,
        qo_due_date: Sequelize.DATEONLY,
        qo_req_date: Sequelize.DATEONLY,
        qo_rmks: Sequelize.STRING,
        qo_cr_terms: Sequelize.STRING,
        qo_fob: Sequelize.STRING,
        qo_shipvia: Sequelize.STRING,
        qo_user1: Sequelize.STRING,
        qo_user2: Sequelize.STRING,
        qo_curr: Sequelize.STRING,
        qo_pr_list: Sequelize.STRING,
        qo_xslspsn: Sequelize.STRING,
        qo_source: Sequelize.STRING,
        qo_xcomm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        qo_cr_card: Sequelize.STRING,
        qo_print_pl: {type: Sequelize.BOOLEAN, defaultValue : false  },
        qo_cr_init: Sequelize.STRING,
        qo_userid: Sequelize.STRING,
        qo_stat: Sequelize.STRING,
        qo_ar_acct: Sequelize.STRING,
        qo_partial: {type: Sequelize.BOOLEAN, defaultValue : false  },
        qo_prepaid: {type: Sequelize.DECIMAL, defaultValue : 0  },
        qo_print_qo: {type: Sequelize.BOOLEAN, defaultValue : false  },
        qo_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        qo_tax_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        qo_ar_cc: Sequelize.STRING,
        qo_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        qo_so_nbr: Sequelize.STRING,
        qo_confirm: Sequelize.DATEONLY,
	qo__qad01: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo__qad02: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo__qad03: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo__qad04: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_exp_DATE: Sequelize.DATEONLY,
	qo_rel_DATE: Sequelize.DATEONLY,
	qo_relee: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_recur: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_cycle: Sequelize.STRING,
	qo_rel_cnt: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_flw_DATE: Sequelize.DATEONLY,
	qo_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_lang	: Sequelize.STRING,
	qo__qad05: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_pst: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_fst_id: Sequelize.STRING,
	qo_pst_id: Sequelize.STRING,
	qo_trl1_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_trl1_cd: Sequelize.STRING,
	qo_trl2_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_trl2_cd: Sequelize.STRING,
	qo_trl3_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_trl3_cd: Sequelize.STRING,
	qo_weight: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_weight_um: Sequelize.STRING,
	qo_size: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_size_um: Sequelize.STRING,
	qo_cartons: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_bol: Sequelize.STRING,
	qo_site: Sequelize.STRING,
	qo_taxc: Sequelize.STRING,
	qo__chr01: Sequelize.STRING,
	qo__chr02: Sequelize.STRING,
	qo__chr03: Sequelize.STRING,
	qo__chr04: Sequelize.STRING,
	qo__chr05: Sequelize.STRING,
	qo__chr06: Sequelize.STRING,
	qo__chr07: Sequelize.STRING,
	qo__chr08: Sequelize.STRING,
	qo__chr09: Sequelize.STRING,
	qo__chr10: Sequelize.STRING,
	qo__dte01:Sequelize.DATEONLY,
	qo__dte02: Sequelize.DATEONLY,
	qo__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_project: Sequelize.STRING,
	qo_rev: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_pst_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_fr_list: Sequelize.STRING,
	qo_fr_terms: Sequelize.STRING,
	qo_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_slspsn: Sequelize.STRING,
	qo_fix_rate: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_bill: Sequelize.STRING,
	qo_print_bl: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_tax_DATE: Sequelize.DATEONLY,
	qo_channel: Sequelize.STRING,
	qo_inv_mthd: Sequelize.STRING,
	qo_bank: Sequelize.STRING,
	qo_fr_min_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_pr_list2: Sequelize.STRING,
	qo_tax_env: Sequelize.STRING,
	qo_tax_usage: Sequelize.STRING,
	qo_priced_dt: Sequelize.DATEONLY,
	qo_pricing_dt: Sequelize.DATEONLY,
	qo_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_ex_ratetype: Sequelize.STRING,
	qo_div: Sequelize.STRING,
	qo_exru_seq: {type: Sequelize.DECIMAL, defaultValue : 0  },
	qo_ar_sub: Sequelize.STRING,
	qo_app_owner: Sequelize.STRING,
	qo_manual_fr_terms: {type: Sequelize.BOOLEAN, defaultValue : false  },
	qo_domain: {
		type: Sequelize.STRING,
		defaultValue: 'zima'
	},
	oid_qo_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "qo_mstr",
    },
);
Quote.addHook('beforeCreate', async (instance, option) => {
	const seq = await Sequence.findOne({ where: {  seq_type: "QO"  } });
	instance.qo_nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val)+1}`;
	await Sequence.update({ seq_curr_val: Number(seq.seq_curr_val )+1 }, { where: { seq_type: "QO" } });
  });
  
export default Quote;
