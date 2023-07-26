import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Transportcost = sequelize.define(
    "Transportcost",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        trc_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        trc_desc: Sequelize.STRING,
        trc_domain:  Sequelize.STRING,
        trc_acct: Sequelize.STRING,
        trc_project: {
            type: Sequelize.STRING,
            references: {
                model: "pm_mstr",
                key: "pm_code",
            },
        
        },
        trc_taxable:{type: Sequelize.BOOLEAN, defaultValue : false  },     
        trc_taxc: Sequelize.STRING,
           
        trc_disc:{type: Sequelize.BOOLEAN, defaultValue : false  },       
        ...base,
    },
    {
        tableName: "trc_mstr",
    }
)
export default Transportcost
