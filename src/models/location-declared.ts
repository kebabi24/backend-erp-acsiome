import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const LocationDeclared = sequelize.define(
    "locationDeclared",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ldd_loc: Sequelize.STRING,
        ldd_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        ldd_date: Sequelize.DATEONLY,
        ldd_qty_oh: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_lot: Sequelize.STRING,
        ldd_ref: Sequelize.STRING,
        ldd_cnt_date:Sequelize.DATEONLY,
        ldd_assay: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_expire: Sequelize.DATEONLY,
        ldd_user1: Sequelize.STRING,
        ldd_user2: Sequelize.STRING,
        ldd_site: Sequelize.STRING,
        ldd_status: Sequelize.STRING,
        ldd_qty_all: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_grade: Sequelize.STRING,
        ldd_qty_frz: Sequelize.DECIMAL,
        ldd_date_frz: Sequelize.DATEONLY,
        ldd_vd_lot: Sequelize.STRING,
        ldd_cmtindx: Sequelize.INTEGER,
        ldd_work: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd__chr01:Sequelize.STRING,
        ldd__chr02:Sequelize.STRING,
        ldd__chr03:Sequelize.STRING,
        ldd__chr04:Sequelize.STRING,
        ldd__chr05:Sequelize.STRING,
        ldd__dte01:Sequelize.DATEONLY,
        ldd__dte02:Sequelize.DATEONLY,
        ldd__dec01:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd__dec02:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd__log01:Sequelize.BOOLEAN,
        ldd_cost:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_rev:Sequelize.STRING,
        ldd_cust_consign_qty:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_supp_consign_qty:{type: Sequelize.DECIMAL, defaultValue : 0  },
        ldd_domain: Sequelize.STRING,

        ...base,
    },
    {
        tableName: "ldd_det",
    }
)
export default LocationDeclared
