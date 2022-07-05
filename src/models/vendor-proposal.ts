import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const VendorProposal = sequelize.define(
    "vendorProposal",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        vp_nbr: {
            type: Sequelize.STRING,
            unique: true
        },
        vp_vend: {
            type: Sequelize.STRING,
            references:{
                model: "vd_mstr",
                key: "vd_addr",
            },

        },
        vp_rqm_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "rqm_mstr",
                key: "rqm_nbr",
            },
        },
        vp_vend_lead: Sequelize.INTEGER,
        vp_date: Sequelize.DATEONLY,
        vp_q_date: Sequelize.DATEONLY,
        vp_comment: Sequelize.STRING,
        vp_pr_list: Sequelize.STRING,
        vp_user1: Sequelize.STRING,
        vp_user2: Sequelize.STRING,
        vp_curr: Sequelize.STRING,
        vp_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_ex_rate2: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_bkage_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_duty_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_duty_type: Sequelize.STRING,
        vp_frt_amt: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_sch_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_appr_date: Sequelize.DATEONLY,
        vp_pay_meth: Sequelize.STRING,
        vp_userid: Sequelize.STRING,
        vp_mod_date: Sequelize.DATEONLY,
        vp_pkg_code: Sequelize.STRING,
        vp_ins_rqd: {type: Sequelize.BOOLEAN, defaultValue : false  },
        vp_rcpt_stat: Sequelize.STRING,
        vp_tp_use_pct: {type: Sequelize.BOOLEAN, defaultValue : false  },
        vp_tp_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_total_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vp_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        ...base,
    },
    {
        tableName: "vp_mstr",
    }
)
export default VendorProposal
