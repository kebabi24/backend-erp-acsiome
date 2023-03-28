import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const QuoteDetail = sequelize.define(
    "QuoteDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        qod_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "qo_mstr",
                key: "qo_nbr",
            },
        },
        qod_line: Sequelize.INTEGER,
        qod_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        qod_tax_code: {
            type: Sequelize.STRING,
            references: {
                model: "tx2_mstr",
                key: "tx2_tax_code",
            },
        },
qod_due_date: Sequelize.DATEONLY,
qod_per_date: Sequelize.DATEONLY,
qod_req_date: Sequelize.DATEONLY,
qod_loc: Sequelize.STRING, 
qod_type: Sequelize.STRING,
qod_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_std_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_acct: Sequelize.STRING,
qod_abnormal: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_serial: Sequelize.STRING,
qod_desc: Sequelize.STRING,
qod_um: Sequelize.STRING,
qod_cc: Sequelize.STRING,
qod__qad01: Sequelize.STRING,
qod_lot: Sequelize.STRING,
qod_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_fa_nbr: Sequelize.STRING,
qod_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_project: Sequelize.STRING,
qod_custpart: Sequelize.STRING,
qod__qad02: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_status: Sequelize.STRING,
qod_xslspsn: Sequelize.STRING,
qod_comm_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_dsc_acct: Sequelize.STRING,
qod_dsc_cc: Sequelize.STRING,
qod_list_pr: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_user1: Sequelize.STRING,
qod_user2: Sequelize.STRING,
qod_qty_ord: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_qty_quot: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_qty_rel: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_rel_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_rsn_lost: Sequelize.STRING,
qod_pst	: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_fst_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_fst_tax: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_pst_tax: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod__qad03: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_taxc: Sequelize.STRING,
qod_fst_list: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_site: Sequelize.STRING,
qod_qob_std: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_qob_rev: Sequelize.DATEONLY,
qod_prodline: Sequelize.STRING,
qod__chr01: Sequelize.STRING,
qod__chr02: Sequelize.STRING,
qod__chr03: Sequelize.STRING,
qod__chr04: Sequelize.STRING,
qod__chr05: Sequelize.STRING,
qod__chr06: Sequelize.STRING,
qod__chr07: Sequelize.STRING,
qod__chr08: Sequelize.STRING,
qod__chr09: Sequelize.STRING,
qod__chr10: Sequelize.STRING,
qod__dte01: Sequelize.DATEONLY,
qod__dte02: Sequelize.DATEONLY,
qod__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_tax_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_fr_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_slspsn: Sequelize.STRING,
qod_fr_chg: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_fr_cls: Sequelize.STRING,
qod_fr_wt: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_fr_wt_um: Sequelize.STRING,
qod_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_tax_usage: Sequelize.STRING,
qod_tax_env: Sequelize.STRING,
qod_fr_list: Sequelize.STRING,
qod_crt_int: {type: Sequelize.DECIMAL, defaultValue : 0  },
qod_pricing_dt: Sequelize.DATEONLY,
qod_bonus: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_cfg_type: Sequelize.STRING,
qod_div	: Sequelize.STRING,
qod_pl_priority: Sequelize.INTEGER,
qod_prig1: Sequelize.STRING,
qod_prig2: Sequelize.STRING,
qod_sub	: Sequelize.STRING,
qod_dsc_sub: Sequelize.STRING,
qod_dsc_project	: Sequelize.STRING,
qod_manual_fr_list: {type: Sequelize.BOOLEAN, defaultValue : false  },
qod_domain: Sequelize.STRING,
oid_qod_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
...base,
    },
    {
        tableName: "qod_det",
    }
)
export default QuoteDetail
