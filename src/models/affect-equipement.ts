import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AffectEquipement = sequelize.define(
    "AffectEquipement",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       
        ae_sup: Sequelize.STRING,
        ae_role:Sequelize.STRING,
        ae_itin: Sequelize.STRING,
        ae_cust: Sequelize.STRING,
        ae_eqp: Sequelize.STRING,
        ae_eqp_nbr: { type: Sequelize.INTEGER, defaultValue: 0 },
        ae_amt_un: { type: Sequelize.DECIMAL, defaultValue: 0 },
        ae_amt: { type: Sequelize.DECIMAL, defaultValue: 0 },
        ae_effdate:Sequelize.DATEONLY,
        ae_domain: {
            type: Sequelize.STRING,
            defaultValue: "acsiome",
        },
        



        ...base,
    },
        {
        tableName: "ae_mstr",
        }
    
    )
    export default AffectEquipement
    