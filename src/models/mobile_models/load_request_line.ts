import { Container } from "typedi"


import Sequelize from "sequelize"

import base from "../base"


const sequelize = Container.get("sequelize")

const LoadRequestLine = sequelize.define(
    "loadRequestLine",
    {   
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        date_creation:{type:Sequelize.DATE},
        date_charge:{type:Sequelize.DATE},
        line:{type: Sequelize.INTEGER},

        
        product_code:{
            type: Sequelize.STRING,
            references: {
                model: "pt_mstr",
                key: "pt_part",
            },
        },

        load_request_code:{
            type: Sequelize.STRING,
            references: {
                model: "aa_loadRequest",
                key: "load_request_code",
            },
        },

        
        qt_request:{type: Sequelize.INTEGER},
        qt_validated:{type: Sequelize.INTEGER},
        qt_effected:{type: Sequelize.INTEGER},
        pt_price : {type : Sequelize.DOUBLE}

        // ...base
    },
    {
        tableName: "aa_loadRequestLine",
    }
)
export default  LoadRequestLine ;
