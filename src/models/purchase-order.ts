import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"
import Sequence from './sequence';
const sequelize = Container.get("sequelize")

const PurchaseOrder = sequelize.define(
    "purchase-order",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        po_nbr: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
        },
        po_vend: {
            type: Sequelize.STRING,
            references:{
                model: "vd_mstr",
                key: "vd_addr",
            },

        },
        po_category: {
			type: Sequelize.STRING,
			references: {
			  model: 'seq_mstr',
			  key: 'seq_seq',
			},
          },
        po_ship: Sequelize.STRING,
        po_ord_date: Sequelize.DATEONLY,
        po_rmks: Sequelize.STRING,
        po_cr_terms: Sequelize.STRING,
        po_buyer: Sequelize.STRING,
        po_shipvia: Sequelize.STRING,
        po_fob: Sequelize.STRING,
        po_bill: Sequelize.STRING,
        po__qad04: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_partial: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_rev: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_stat: Sequelize.STRING,
        po_ap_acct: Sequelize.STRING,
        po_ap_cc: Sequelize.STRING,
        po_frt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_serv_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_spec_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_tax_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_prepaid: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_contact: Sequelize.STRING,
        po_confirm: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_cmtindx: Sequelize.INTEGER,
        po_print: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_cls_date: Sequelize.DATEONLY,
        po_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_user1: Sequelize.STRING,
        po_user2: Sequelize.STRING,
        po_curr: Sequelize.STRING,
        po_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_lang: Sequelize.STRING,
        po_fst_id: Sequelize.STRING,
        po_pst_id: Sequelize.STRING,
        po_pst: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_duty_type: Sequelize.STRING,
        po__qad05: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__qad07: Sequelize.STRING,
        po__qad08: Sequelize.STRING,
        po_site: Sequelize.STRING,
        po_blanket: Sequelize.STRING,
        po__qad01: Sequelize.DATEONLY,
        po__qad02: Sequelize.INTEGER,
        po__qad03: Sequelize.STRING,
        po_contract: Sequelize.STRING,
        po_del_to: Sequelize.STRING,
        po_due_date: Sequelize.DATEONLY,
        po_eff_strt: Sequelize.DATEONLY,
        po_eff_to: Sequelize.DATEONLY,
        po_est_value: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__qad06: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_project: Sequelize.STRING,
        po_rel_nbr: Sequelize.INTEGER,
        po_req_id: Sequelize.STRING,
        po_type: Sequelize.STRING,
        po_user_id: Sequelize.STRING,
        po__qad09: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_release: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_recurr: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_cycl: Sequelize.STRING,
        po__chr01: Sequelize.STRING,
        po__chr02: Sequelize.STRING,
        po__chr03: Sequelize.STRING,
        po__chr04: Sequelize.STRING,
        po__chr05: Sequelize.STRING,
        po__chr06: Sequelize.STRING,
        po__chr07: Sequelize.STRING,
        po__chr08: Sequelize.STRING,
        po__chr09: Sequelize.STRING,
        po__chr10: Sequelize.STRING,
        po__dte01: Sequelize.DATEONLY,
        po__dte02: Sequelize.DATEONLY,
        po__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_inv_mthd: Sequelize.STRING,
        po_fix_rate: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_tax_date: Sequelize.DATEONLY,
        po_fsm_type: Sequelize.STRING,
        po_bank: Sequelize.STRING,
        po_pr_list: Sequelize.STRING,
        po_tax_env: Sequelize.STRING,
        po_sched: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_pr_list2: Sequelize.STRING,
        po_tax_usage: Sequelize.STRING,
        po_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_taxc: {
            type: Sequelize.STRING,
            references:{
                model: "tx2_mstr",
                key: "tx2_tax_code",
            },

        },
        po_sch_mthd: Sequelize.STRING,
        po_priced_dt: Sequelize.DATEONLY,
        po_pricing_dt: Sequelize.DATEONLY,
        po_ers_opt: Sequelize.STRING,
        po_pr_lst_tp: Sequelize.INTEGER,
        po__qadc01: Sequelize.STRING,
        po__qadc02: Sequelize.STRING,
        po__qadd01: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__qadd02: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po__qadi01: Sequelize.INTEGER,
        po__qadi02: Sequelize.INTEGER,
        po_so_nbr: Sequelize.STRING,
        po_is_btb: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_so_hold: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_xmit: Sequelize.STRING,
        po_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_ex_ratetype: Sequelize.STRING,
        po_exru_seq: Sequelize.INTEGER,
        po_ap_sub: Sequelize.STRING,
        po_crt_int: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_consignment: {type: Sequelize.BOOLEAN, defaultValue : false  },
        po_max_aging_days: Sequelize.INTEGER,
        po_app_owner: Sequelize.STRING,
        po_tot_terms_code: Sequelize.STRING,
        po_translt_days: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_amt:  {type: Sequelize.DECIMAL, defaultValue : 0  },
		po_tax_amt:  {type: Sequelize.DECIMAL, defaultValue : 0  },
		po_trl1_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        po_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
    
        ...base,
    },
    {
        tableName: "po_mstr",
    }
)


PurchaseOrder.addHook('beforeCreate', async (instance, option) => {
    console.log(instance.po_category)
    const seq = await Sequence.findOne({ where: { seq_seq: instance.po_category} });
    instance.po_nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val)+1}`;
    await Sequence.update({ seq_curr_val: Number(seq.seq_curr_val )+1 }, { where: { seq_seq: instance.po_category } });
  });
export default PurchaseOrder
