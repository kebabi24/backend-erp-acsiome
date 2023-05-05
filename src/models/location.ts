import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Location = sequelize.define(
    "location",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        loc_loc: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        loc__qad01: {type: Sequelize.BOOLEAN, defaultValue : false  },
        loc_date: Sequelize.DATEONLY,
        loc_perm: {type: Sequelize.BOOLEAN, defaultValue : false  },
        loc__qadc01: Sequelize.STRING,
        loc__qadc02: Sequelize.STRING,
        loc_project: Sequelize.STRING,
        loc_site: Sequelize.STRING,
        loc_status: Sequelize.STRING,
        loc_user1: Sequelize.STRING,
        loc_user2: Sequelize.STRING,
        loc_single: {type: Sequelize.BOOLEAN, defaultValue : false  },
        loc_type: Sequelize.STRING,
        loc_desc: Sequelize.STRING,
        loc_cap: {type: Sequelize.DECIMAL, defaultValue : 0  },
        loc_cap_um: Sequelize.STRING,
        loc_phys_addr: Sequelize.STRING,
        loc_xfer_ownership: {type: Sequelize.BOOLEAN, defaultValue : false  },
        loc_domain: Sequelize.STRING,
        oid_loc_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "loc_mstr",
    }
)
export default Location
