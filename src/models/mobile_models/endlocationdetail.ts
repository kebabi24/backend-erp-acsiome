import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const EndLocationDetail = sequelize.define(
    "endlocationDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        eld_service_code : Sequelize.STRING,
        eld_loc: Sequelize.STRING,
        eld_part: Sequelize.STRING,
            
        eld_date: Sequelize.DATEONLY,
        eld_qty_oh: {type: Sequelize.DECIMAL, defaultValue : 0  },
        eld_lot: Sequelize.STRING,
        eld_ref: Sequelize.STRING,
        eld_expire: Sequelize.DATEONLY,
       
        eld_site: Sequelize.STRING,
        eld_status: Sequelize.STRING,
        eld_domain: Sequelize.STRING,

       
    },
    {
        tableName: "aa_eld_det",
    }
)
export default EndLocationDetail
