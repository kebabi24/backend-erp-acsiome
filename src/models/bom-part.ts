import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const BomPart = sequelize.define(
    "bompart",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ptb_part: {
            type: Sequelize.STRING,
            references: {
                model: "pt_mstr",
                key: "pt_part",
            },
        },
        ptb_bom:  {
            type: Sequelize.STRING,
            unique: true,
            references: {
                model: "bom_mstr",
                key: "bom_parent",
            },
        },
            
        ptb_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        
        ...base,
    },
    {
        tableName: "ptb_det",
    }
)
export default BomPart
