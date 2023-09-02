import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AccountUnplanifed = sequelize.define(
    "account-unplanifed",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        au_nbr:{
            type: Sequelize.STRING,
            unique: true,
        },
        au_vend: {
            type: Sequelize.STRING,
            references:{
                model: "vd_mstr",
                key: "vd_addr",
            },

        },
       
    au_type: Sequelize.STRING, 
    au_so_nbr: Sequelize.STRING, 
    au_xcomm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_effdate: Sequelize.DATEONLY, 
    au_date: Sequelize.DATEONLY, 
    au_cr_terms: Sequelize.STRING, 
    au_po: Sequelize.STRING, 
    au_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_applied: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_disc_date: Sequelize.DATEONLY, 
    au_due_date: Sequelize.DATEONLY, 
    au_expt_date: Sequelize.DATEONLY, 
    au_acct: Sequelize.STRING, 
    au_cc: Sequelize.STRING, 
    au_sales_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_xslspsn1: Sequelize.STRING, 
    au_xslspsn2: Sequelize.STRING, 
    au_paid_date: Sequelize.DATEONLY, 
    au_batch: Sequelize.STRING, 
    au_disc_acct: Sequelize.STRING, 
    au_disc_cc: Sequelize.STRING, 
    au_ship: Sequelize.STRING, 
    au_open: {type: Sequelize.BOOLEAN, defaultValue : true  }, 
    au_contested: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_check: Sequelize.STRING, 
    au_cmtindx: Sequelize.INTEGER, 
    au_user1: Sequelize.STRING, 
    au_user2: Sequelize.STRING, 
    au_curr: Sequelize.STRING, 
    au_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_vau_acct: Sequelize.STRING, 
    au_vau_cc: Sequelize.STRING, 
    au_bank: Sequelize.STRING, 
    au_mrgn_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_entity: Sequelize.STRING, 
    au_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au__chr01: Sequelize.STRING, 
    au__chr02: Sequelize.STRING, 
    au__chr03: Sequelize.STRING, 
    au__chr04: Sequelize.STRING, 
    au__chr05: Sequelize.STRING, 
    au__dte01: Sequelize.DATEONLY, 
    au__dte02: Sequelize.DATEONLY, 
    au__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au__log01: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_draft: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_ldue_date: Sequelize.DATEONLY, 
    au_print: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_inv_cr: Sequelize.STRING, 
    au_fr_terms: Sequelize.STRING, 
    au_slspsn: Sequelize.STRING, 
    au_tax_date: Sequelize.DATEONLY, 
    au_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_tax_env: Sequelize.STRING, 
    au__qad01: Sequelize.STRING, 
    au__qad02: Sequelize.STRING, 
    au__qad03: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_drft_sel: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_coll_mthd: Sequelize.STRING, 
    au_amt_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_disc_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_base_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_fsm_type: Sequelize.STRING, 
    au_comm_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_dy_code: Sequelize.STRING, 
    au_dun_level: Sequelize.INTEGER, 
    au_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_ex_ratetype: Sequelize.STRING, 
    au_base_amt_chg: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_base_applied: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_base_comm_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_exru_seq: Sequelize.INTEGER, 
    au_dd_curr: Sequelize.STRING, 
    au_dd_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_dd_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
    au_dd_exru_seq: Sequelize.INTEGER, 
    au_app_owner: Sequelize.STRING, 
    au_sub: Sequelize.STRING, 
    au_disc_sub: Sequelize.STRING, 
    au_vau_sub: Sequelize.STRING, 
    au_prepayment: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_shipfrom: Sequelize.STRING, 
    au_customer_bank: Sequelize.STRING, 
    au_draft_disc_date: Sequelize.DATEONLY, 
    au_recon_date: Sequelize.DATEONLY, 
    au_status: Sequelize.STRING, 
    au_customer_initiated: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
    au_draft_submit_date: Sequelize.DATEONLY, 
    au_pay_method: Sequelize.STRING, 
    au_void_date: Sequelize.DATEONLY, 
    au_domain: Sequelize.STRING,
    oid_au_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
    },
    {
        tableName: "au_mstr",
    }
)
export default AccountUnplanifed
