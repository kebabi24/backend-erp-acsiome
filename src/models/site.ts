import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Site = sequelize.define(
    "site",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        si_site: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        si_desc: Sequelize.STRING,
        si_entity: Sequelize.STRING,
        si_status: Sequelize.STRING,
        si_auto_loc: {type: Sequelize.BOOLEAN, defaultValue : false  },
        si_default: {type: Sequelize.BOOLEAN, defaultValue : false  },
        si_user1: Sequelize.STRING,
        si_user2: Sequelize.STRING,
        si_gl_set: Sequelize.STRING,
        si_db: Sequelize.STRING,
        si_xfer_acct: Sequelize.STRING,
        si_cur_set: Sequelize.STRING,
        si_xfer_cc: Sequelize.STRING,
        si_git_acct: Sequelize.STRING,
        si_git_cc: Sequelize.STRING,
        si_canrun: Sequelize.STRING,
        si_ext_vd: {type: Sequelize.BOOLEAN, defaultValue : false  },
        si_btb_vend: Sequelize.STRING,
        si_git_sub: Sequelize.STRING,
        si_xfer_sub: Sequelize.STRING,
        si_decl: Sequelize.STRING,
        si_xfer_ownership: {type: Sequelize.BOOLEAN, defaultValue : false  },
        si_git_location: Sequelize.STRING,
        si_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        si_type: Sequelize.STRING,
        oid_si_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "si_mstr",
    }
)
export default Site
