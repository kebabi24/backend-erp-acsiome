import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Tag = sequelize.define(
    "tag",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        tag_nbr:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: false
        },
        tag_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },
        },
        tag_loc: Sequelize.STRING,
        tag_serial: Sequelize.STRING,
        tag_cnt_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tag_cnt_nam: Sequelize.STRING,
        tag_cnt_dt: Sequelize.DATEONLY,
        tag_rcnt_qty: {type: Sequelize.DECIMAL},
        tag_rcnt_nam: Sequelize.STRING,
        tag_rcnt_dt: Sequelize.DATEONLY,
        tag_site: Sequelize.STRING,
        tag_type: Sequelize.STRING,
        tag_void: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tag_prt_dt: Sequelize.DATEONLY,
        tag_crt_dt: Sequelize.STRING,
        tag_posted: {type: Sequelize.BOOLEAN, defaultValue : false  },
        tag_cnt_um: Sequelize.STRING,
        tag_rcnt_um: Sequelize.STRING,
        tag_rcnt_cnv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tag_cnt_cnv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tag_rmks: Sequelize.STRING,
        tag__qad01: {type: Sequelize.DECIMAL, defaultValue : 0  },
        tag_user1: Sequelize.STRING,
        tag_user2: Sequelize.STRING,
        tag_ref: Sequelize.STRING,
        tag_domain:  Sequelize.STRING,
        oid_tag_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "tag_mstr",
    }
)
export default Tag
