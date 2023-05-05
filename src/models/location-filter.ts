import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Location = sequelize.define(
    "loc_det",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
         loc_loc: {
            type: Sequelize.STRING,
            // references:{
            //     model: "loc_mstr",
            //     key: "loc_loc",
            // },
        },
         loc_site: {
            type: Sequelize.STRING,
            // references:{
            //     model: "loc_mstr",
            //     key: "loc_site",
            // },
        },
        chr01:Sequelize.STRING,
        chr02:Sequelize.STRING,
        chr03:Sequelize.STRING,
        chr04:Sequelize.STRING,
        chr05:Sequelize.STRING,
        chr06:Sequelize.STRING,
        chr07:Sequelize.STRING,
        chr08:Sequelize.STRING,

        // loc_loc: Sequelize.STRING,
        // loc_site: Sequelize.STRING,
        // loc__qad01: {type: Sequelize.BOOLEAN, defaultValue : false  },
        // loc_date: Sequelize.DATEONLY,
        // loc_cap: {type: Sequelize.DECIMAL, defaultValue : 0  },
     
        // ...base,
    },
    {
        tableName: "loc_det",
    }
)
export default Location
