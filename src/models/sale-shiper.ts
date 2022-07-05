import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const SaleShiper = sequelize.define(
    "SaleShiper",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        psh_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "so_mstr",
                key: "so_nbr",
            },
        },
        psh_line: Sequelize.INTEGER,
        psh_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        psh_tax_code: {
            type: Sequelize.STRING,
            references: {
                model: "tx2_mstr",
                key: "tx2_tax_code",
            },
        },
        psh_ship_date: Sequelize.DATEONLY,
       
        psh_qty_ship: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_so_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_shiper: Sequelize.STRING,
        psh_cust: Sequelize.STRING,
        psh_lot: Sequelize.STRING,
        psh_ps_nbr: Sequelize.STRING,

        psh_ps_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },

        psh_bo_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_xinvoice: Sequelize.STRING,
        psh_xinv_dt: Sequelize.DATEONLY,
        psh_xinv_cst: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_rev: Sequelize.STRING,
        psh_type: Sequelize.STRING,
        psh_print: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_invoiced: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_lbr_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_mtl_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_bdn_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_ovh_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_sub_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_buyer: Sequelize.STRING,
        psh_shipto: Sequelize.STRING,
        psh_cst_up: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_um: Sequelize.STRING,
        psh_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_status: Sequelize.STRING,
        psh_expire: Sequelize.DATEONLY,
        psh_curr: Sequelize.STRING,
        psh_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_curr_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_pay_um: Sequelize.STRING,
        psh_user1: Sequelize.STRING,
        psh_user2: Sequelize.STRING,
        psh_site: Sequelize.STRING,
        psh_loc: Sequelize.STRING,
        psh_serial: Sequelize.STRING,
        psh_ship: Sequelize.STRING,
        psh_qty_ord: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_per_date: Sequelize.DATEONLY,
        psh_rcp_type: Sequelize.STRING,
        psh_reason: Sequelize.STRING,
        psh_request: Sequelize.STRING,
        psh_approve: Sequelize.STRING,
        psh_tax_at: Sequelize.STRING,
        psh_rma_type: Sequelize.STRING,
        psh_fix_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_so_site: Sequelize.STRING,
        psh_cum_req: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_cum_rcvd: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_fsm_type: Sequelize.STRING,
        psh_cr_terms: Sequelize.STRING,
        psh_bank: Sequelize.STRING,
        psh_curr_rlse_id: Sequelize.STRING,
        psh_element: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_so_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_crt_int: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_tax_env: Sequelize.STRING,
        psh_tax_usage: Sequelize.STRING,
        psh_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
        psh_taxc: Sequelize.STRING,

        psh_vend_lot: Sequelize.STRING,
        psh_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
        psh_ex_ratetype: Sequelize.STRING,
        psh_rmks: Sequelize.STRING,

        psh_exru_seq: Sequelize.INTEGER,
        psh_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_psh_hist: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "psh_hist",
    }
)
export default SaleShiper
