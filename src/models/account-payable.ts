import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AccountPayable = sequelize.define(
    "account-payable",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ap_nbr:{
            type: Sequelize.STRING,
            unique: true,
        },
        ap_vend: {
            type: Sequelize.STRING,
            references:{
                model: "vd_mstr",
                key: "vd_addr",
            },

        },
        
    ap_type: Sequelize.STRING, 
    ap_po_nbr: Sequelize.STRING, 
    ap_xcomm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_effdate: Sequelize.DATEONLY, 
    ap_date: Sequelize.DATEONLY, 
    ap_cr_terms: Sequelize.STRING, 
    ap_po: Sequelize.STRING, 
    ap_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_applied: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_disc_date: Sequelize.DATEONLY, 
    ap_due_date: Sequelize.DATEONLY, 
    ap_expt_date: Sequelize.DATEONLY, 
    ap_acct: Sequelize.STRING, 
    ap_cc: Sequelize.STRING, 
    ap_sales_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_xslspsn1: Sequelize.STRING, 
    ap_xslspsn2: Sequelize.STRING, 
    ap_paid_date: Sequelize.DATEONLY, 
    ap_batch: Sequelize.STRING, 
    ap_disc_acct: Sequelize.STRING, 
    ap_disc_cc: Sequelize.STRING, 
    ap_ship: Sequelize.STRING, 
    ap_open: {type: Sequelize.BOOLEAN, defaultValue : true  }, 
    ap_contested: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_check: Sequelize.STRING, 
    ap_cmtindx: Sequelize.INTEGER, 
    ap_user1: Sequelize.STRING, 
    ap_user2: Sequelize.STRING, 
    ap_curr: Sequelize.STRING, 
    ap_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_vap_acct: Sequelize.STRING, 
    ap_vap_cc: Sequelize.STRING, 
    ap_bank: Sequelize.STRING, 
    ap_mrgn_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_entity: Sequelize.STRING, 
    ap_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap__chr01: Sequelize.STRING, 
    ap__chr02: Sequelize.STRING, 
    ap__chr03: Sequelize.STRING, 
    ap__chr04: Sequelize.STRING, 
    ap__chr05: Sequelize.STRING, 
    ap__dte01: Sequelize.DATEONLY, 
    ap__dte02: Sequelize.DATEONLY, 
    ap__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap__log01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_draft: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_ldue_date: Sequelize.DATEONLY, 
    ap_print: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_inv_cr: Sequelize.STRING, 
    ap_fr_terms: Sequelize.STRING, 
    ap_slspsn: Sequelize.STRING, 
    ap_tax_date: Sequelize.DATEONLY, 
    ap_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_tax_env: Sequelize.STRING, 
    ap__qad01: Sequelize.STRING, 
    ap__qad02: Sequelize.STRING, 
    ap__qad03: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_drft_sel: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_coll_mthd: Sequelize.STRING, 
    ap_amt_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_disc_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_base_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_fsm_type: Sequelize.STRING, 
    ap_comm_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_dy_code: Sequelize.STRING, 
    ap_dun_level: Sequelize.INTEGER, 
    ap_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_ex_ratetype: Sequelize.STRING, 
    ap_base_amt_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_base_applied: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_base_comm_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_exru_seq: Sequelize.INTEGER, 
    ap_dd_curr: Sequelize.STRING, 
    ap_dd_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_dd_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    ap_dd_exru_seq: Sequelize.INTEGER, 
    ap_app_owner: Sequelize.STRING, 
    ap_sub: Sequelize.STRING, 
    ap_disc_sub: Sequelize.STRING, 
    ap_vap_sub: Sequelize.STRING, 
    ap_prepayment: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_shipfrom: Sequelize.STRING, 
    ap_customer_bank: Sequelize.STRING, 
    ap_draft_disc_date: Sequelize.DATEONLY, 
    ap_recon_date: Sequelize.DATEONLY, 
    ap_status: Sequelize.STRING, 
    ap_customer_initiated: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    ap_draft_submit_date: Sequelize.DATEONLY, 
    ap_pay_method: Sequelize.STRING, 
    ap_void_date: Sequelize.DATEONLY, 
    ap_domain: Sequelize.STRING,
    oid_ap_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
    },
    {
        tableName: "ap_mstr",
    }
)
export default AccountPayable
