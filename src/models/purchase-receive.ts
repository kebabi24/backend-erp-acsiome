import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const PurchaseReceive = sequelize.define(
    "PurchaseReceive",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        prh_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "po_mstr",
                key: "po_nbr",
            },
        },
        prh_line: Sequelize.INTEGER,
        prh_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        prh_tax_code: {
            type: Sequelize.STRING,
            references: {
                model: "tx2_mstr",
                key: "tx2_tax_code",
            },
        },
        prh_rcp_date: Sequelize.DATEONLY,
       
        prh_rcvd: {type:  Sequelize.DECIMAL, defaultValue : 0  }, 
        prh_pur_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_pur_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_receiver: Sequelize.STRING,
        prh_vend: Sequelize.STRING,
        prh_lot: Sequelize.STRING,
        prh_ps_nbr: Sequelize.STRING,

        prh_ps_qty: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        prh_bo_qty: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        prh_xinvoice: Sequelize.STRING,
        prh_inv_nbr: Sequelize.STRING,
        prh_invoiced: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_xinv_dt: Sequelize.DATEONLY,
        prh_xinv_cst: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_rev: Sequelize.STRING,
        prh_type: Sequelize.STRING,
        prh_print: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_lbr_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_mtl_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_bdn_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_ovh_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_sub_std: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_buyer: Sequelize.STRING,
        prh_shipto: Sequelize.STRING,
        prh_cst_up: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_um: Sequelize.STRING,
        prh_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_curr: Sequelize.STRING,
        prh_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_curr_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_pay_um: Sequelize.STRING,
        prh_user1: Sequelize.STRING,
        prh_user2: Sequelize.STRING,
        prh_site: Sequelize.STRING,
        prh_loc: Sequelize.STRING,
        prh_serial: Sequelize.STRING,
        prh_ship: Sequelize.STRING,
        prh_qty_ord: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_per_date: Sequelize.DATEONLY,
        prh_rcp_type: Sequelize.STRING,
        prh_reason: Sequelize.STRING,
        prh_request: Sequelize.STRING,
        prh_approve: Sequelize.STRING,
        prh_tax_at: Sequelize.STRING,
        prh_rma_type: Sequelize.STRING,
        prh_fix_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_po_site: Sequelize.STRING,
        prh_cum_req: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_cum_rcvd: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_fsm_type: Sequelize.STRING,
        prh_bank: Sequelize.STRING,
        prh_curr_rlse_id: Sequelize.STRING,
        prh_element: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_crt_int: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_tax_env: Sequelize.STRING,
        prh_tax_usage: Sequelize.STRING,
        prh_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
        prh_taxc: Sequelize.STRING,
        prh_vend_lot: Sequelize.STRING,
        prh_ship_date: Sequelize.DATEONLY,
        prh_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
        prh_ex_ratetype: Sequelize.STRING,
        prh_rmks: Sequelize.STRING,

        prh_exru_seq: Sequelize.INTEGER,
        prh_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_prh_hist: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "prh_hist",
    }
)
export default PurchaseReceive
