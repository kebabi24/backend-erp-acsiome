import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const LocationDetail = sequelize.define(
    "locationDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ld_loc: Sequelize.STRING,
        ld_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        ld_date: Sequelize.DATEONLY,
        ld_qty_oh: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_lot: Sequelize.STRING,
        ld_ref: Sequelize.STRING,
        ld_cnt_date:Sequelize.DATEONLY,
        ld_assay: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_expire: Sequelize.DATEONLY,
        ld_user1: Sequelize.STRING,
        ld_user2: Sequelize.STRING,
        ld_site: Sequelize.STRING,
        ld_status: Sequelize.STRING,
        ld_qty_all: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_grade: Sequelize.STRING,
        ld_qty_frz: Sequelize.DECIMAL,
        ld_date_frz: Sequelize.DATEONLY,
        ld_vd_lot: Sequelize.STRING,
        ld_cmtindx: Sequelize.INTEGER,
        ld_work: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ld__chr01:Sequelize.STRING,
        ld__chr02:Sequelize.STRING,
        ld__chr03:Sequelize.STRING,
        ld__chr04:Sequelize.STRING,
        ld__chr05:Sequelize.STRING,
        ld__dte01:Sequelize.DATEONLY,
        ld__dte02:Sequelize.DATEONLY,
        ld__dec01:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ld__dec02:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ld__log01:Sequelize.BOOLEAN,
        ld_cost:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_rev:Sequelize.STRING,
        ld_cust_consign_qty:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_supp_consign_qty:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ld_domain: Sequelize.STRING,

        ...base,
    },
    {
        tableName: "ld_det",
    }
)
export default LocationDetail
