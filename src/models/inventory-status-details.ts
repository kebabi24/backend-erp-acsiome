import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const InventoryStatusDetails = sequelize.define(
    "InventoryStatusDetails",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        isd_status: {
            type: Sequelize.STRING,
            references: {
                model: "is_mstr",
                key: "is_status",
            },
        },
        isd_tr_type: Sequelize.STRING,
        isd_user1: Sequelize.STRING,
        isd_user2: Sequelize.STRING,
        isd_type: Sequelize.STRING,
        isd_bdl_allowed: {type: Sequelize.BOOLEAN, defaultValue : false  },
        isd__qadc01: Sequelize.STRING,
        isd_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_isd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "isd_det",
    }
)
export default InventoryStatusDetails
