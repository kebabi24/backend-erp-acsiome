import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const RequisitionDetail = sequelize.define(
    "RequisitionDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        rqd_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "rqm_mstr",
                key: "rqm_nbr",
            },
        },
        rqd_line: Sequelize.INTEGER,
        rqd_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        rqd_req_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_vend: Sequelize.STRING,
        rqd_ship: Sequelize.STRING,
        rqd_vpart: Sequelize.STRING,
        rqd_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        rqd_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_due_date: Sequelize.DATEONLY,
        rqd_desc: Sequelize.STRING,
        rqd_type: Sequelize.STRING,
        rqd_max_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_category: Sequelize.STRING,
        rqd_status: Sequelize.STRING,
        rqd_rev: Sequelize.STRING,
        rqd_loc: Sequelize.STRING,
        rqd_insp_rqd: {type: Sequelize.BOOLEAN, defaultValue : false  },
        rqd_acct: Sequelize.STRING,
        rqd_cc: Sequelize.STRING,
        rqd_project: Sequelize.STRING,
        rqd_need_date: Sequelize.DATEONLY,
        rqd_pur_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_aprv_stat: Sequelize.STRING,
        rqd_rel_date: Sequelize.DATEONLY,
        rqd_site: Sequelize.STRING,
        rqd_um: Sequelize.STRING,
        rqd_cmtindx: Sequelize.INTEGER,
        rqd_oot_ponetcst: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_oot_poum: Sequelize.STRING,
        rqd_oot_rqnetcst: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_oot_rqum: Sequelize.STRING,
        rqd_pr_list: Sequelize.STRING,
        rqd_pr_list2: Sequelize.STRING,
        rqd_grade: Sequelize.STRING,
        rqd_expire: Sequelize.DATEONLY,
        rqd_rctstat: Sequelize.STRING,
        rqd_assay: {type: Sequelize.DECIMAL, defaultValue : 0  },
        rqd_lot_rcpt: {type: Sequelize.BOOLEAN, defaultValue : false  },
        rqd_open: {type: Sequelize.BOOLEAN, defaultValue : false  },
        rqd_oot_extra: Sequelize.STRING,
        rqd_rqby_userid: Sequelize.STRING,
        rqd_domain: Sequelize.STRING,
        oid_rqd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "rqd_det",
    }
)
export default RequisitionDetail
