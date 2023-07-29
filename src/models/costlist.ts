import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Costlist = sequelize.define(
    "Costlist",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ltrc_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        ltrc_site: {
            type: Sequelize.STRING,
            references: {
                model: "si_mstr",
                key: "si_site",
            },
        
        },
        ltrc_curr: Sequelize.STRING,
           
        ltrc_desc: Sequelize.STRING,
        ltrc_type: Sequelize.STRING,
        ltrc_um : Sequelize.STRING,
        ltrc_trc_code: {
            type: Sequelize.STRING,
            references: {
                model: "trc_mstr",
                key: "trc_code",
            },
        
        },
        ltrc_trmode : Sequelize.STRING,
        ltrc_domain:  Sequelize.STRING,
       
        ...base,
    },
    {
        tableName: "ltrc_mstr",
    }
)
export default Costlist
