import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Taxe = sequelize.define(
    "taxe",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        tx2_tax_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        tx2_tax_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tx2_trl_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_effdate: Sequelize.DATEONLY,
        tx2_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tx2_min: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tx2_userid: Sequelize.STRING,
        tx2_user1: Sequelize.STRING,
        tx2_user2: Sequelize.STRING,
        tx2_mod_date: Sequelize.DATEONLY,
        tx2_tax_type: Sequelize.STRING,
        tx2_method:  Sequelize.STRING,
        tx2_pt_taxc: Sequelize.STRING,
        tx2_tax_usage: Sequelize.STRING,
        tx2_desc: Sequelize.STRING,
        tx2_base: Sequelize.STRING,
        tx2_pct_recv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tx2_by_line: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_cmtindx: Sequelize.INTEGER,
        tx2_curr: Sequelize.STRING,
        tx2_inv_disc: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_pmt_disc: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_update_tax: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_rcpt_tax_point: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_ar_acct: Sequelize.STRING,
        tx2_ar_cc: Sequelize.STRING,
        tx2_ara_acct: Sequelize.STRING,
        tx2_ara_cc: Sequelize.STRING,
        tx2_ara_use: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_ap_acct: Sequelize.STRING,
        tx2_ap_cc: Sequelize.STRING,
        tx2_apr_acct: Sequelize.STRING,
        tx2_apr_cc: Sequelize.STRING,
        tx2_apr_use: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_exp_date: Sequelize.DATEONLY,
        tx2_ec_sales_list: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_ec_process_work: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tx2_apr_sub: Sequelize.STRING,
        tx2_ap_sub: Sequelize.STRING,
        tx2_ara_sub: Sequelize.STRING,
        tx2_ar_sub: Sequelize.STRING,
        tx2_ap_disc_acct: Sequelize.STRING,
        tx2_ap_disc_cc: Sequelize.STRING,
        tx2_ap_disc_sub: Sequelize.STRING,
        tx2_ar_disc_acct: Sequelize.STRING,
        tx2_ar_disc_cc: Sequelize.STRING,
        tx2_ar_disc_sub: Sequelize.STRING,
        tx2_group: Sequelize.STRING,
        tx2_stx_acct: Sequelize.STRING,
        tx2_stx_cc: Sequelize.STRING,
        tx2_stx_sub: Sequelize.STRING,
        tx2_register: Sequelize.STRING,
        tx2_usage_tax_point: {type: Sequelize.BOOLEAN, defaultValue : false  },





        tx2_domain: Sequelize.STRING,
        oid_ac_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "tx2_mstr",
    }
)
export default Taxe
