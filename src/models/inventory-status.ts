import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const InventoryStatus = sequelize.define(
    "InventoryStatus",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        is_status: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        is_avail: {type: Sequelize.BOOLEAN, defaultValue : false  },
        is_nettable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        is_frozen: {type: Sequelize.BOOLEAN, defaultValue : false  },
        is_overissue: {type: Sequelize.BOOLEAN, defaultValue : false  },
        is_user1: Sequelize.STRING,
        is_user2: Sequelize.STRING,
        is_userid: Sequelize.STRING,
        is_mod_date: Sequelize.DATEONLY,
        is_desc: Sequelize.STRING,
        is_cmtindx: Sequelize.INTEGER,
        is__qadc01: Sequelize.STRING,
        is_domain: Sequelize.STRING,
        oid_is_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "is_mstr",
    }
)
export default InventoryStatus
