import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const InventoryStatusMouvement = sequelize.define(
    "InventoryStatusMouvements",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ism_loc_start: {
            type: Sequelize.STRING,
            references: {
                model: "loc_mstr",
                key: "loc_loc",
            },
        },
        ism_loc_end: {
            type: Sequelize.STRING,
            references: {
                model: "loc_mstr",
                key: "loc_loc",
            },
        },
        ism_status_start: {
            type: Sequelize.STRING,
            references: {
                model: "is_mstr",
                key: "is_status",
            },
        },
        ism_status_end: {
            type: Sequelize.STRING,
            references: {
                model: "is_mstr",
                key: "is_status",
            },
        },
        ism_tr_type: Sequelize.STRING,
        ism_type: Sequelize.STRING,
        ism_domain: Sequelize.STRING,
       
        ...base,
    },
    {
        tableName: "ism_det",
    }
)
export default InventoryStatusMouvement
