import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Pricelist = sequelize.define(
    "pricelist",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pi_list: Sequelize.STRING,
        pi_desc: Sequelize.STRING,
        pi_cs_code: Sequelize.STRING,
        pi_part_code: Sequelize.STRING,
        pi_start:Sequelize.DATEONLY,
        pi_expire:Sequelize.DATEONLY,
        pi_comb_type: Sequelize.STRING,
        pi_amt_type: Sequelize.STRING,
        pi_break_cat: Sequelize.STRING,
        pi_um: Sequelize.STRING,
        pi_curr: Sequelize.STRING,
        pi_qty_type: Sequelize.STRING,
        pi_manual: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pi_max_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_cost_set: Sequelize.STRING,
        pi_disc_acct: Sequelize.STRING,
        pi_disc_sub: Sequelize.STRING,
        pi_disc_cc: Sequelize.STRING,
        pi_disc_proj: Sequelize.STRING,
        pi_list_id: Sequelize.STRING,
        pi_confg_disc: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pi_min_net: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_max_ord: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_list_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_min_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_max_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_userid: Sequelize.STRING,
        pi_mod_date: Sequelize.DATEONLY,
        pi_cs_type: Sequelize.STRING,
        pi_part_type: Sequelize.STRING,
        pi_user1: Sequelize.STRING,
        pi_user2: Sequelize.STRING,
        pi_terms: Sequelize.STRING,
        pi_srch_type: Sequelize.INTEGER,
        pi_accr_cc: Sequelize.STRING,
        pi_accr_proj: Sequelize.STRING,
        pi_accr_acct: Sequelize.STRING,
        pi_accr_sub: Sequelize.STRING,
        pi_print: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pi_disc_seq: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pi_extrec: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pi_promo1: Sequelize.STRING,
        pi_promo2: Sequelize.STRING,
        pi_promo3: Sequelize.STRING,
        pi_promo4: Sequelize.STRING,
        pi_pig_code: Sequelize.STRING,      
        pi_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_pi_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "pi_mstr",
    }
)
export default Pricelist
