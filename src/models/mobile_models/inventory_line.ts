import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"
import { truncateSync } from "fs"


const sequelize = Container.get("sequelize")

const InventoryLine = sequelize.define(
    "InventoryLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        inventory_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_service",
                key: "service_code",
            },
        },

        product_code : {type: Sequelize.STRING},
        lot:{ type:Sequelize.STRING},
        expiringDate:{ type:Sequelize.STRING},
        availableQty:{ type:Sequelize.DOUBLE},
        qtyOnhand:{ type:Sequelize.DOUBLE},
       
        // ...base
    },
    {
        tableName: "aa_inventoryLine",
    }
)
export default  InventoryLine ;
