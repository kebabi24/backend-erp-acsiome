import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const PayMethDetail = sequelize.define(
    "payMethDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ctd_code: {
            type: Sequelize.STRING,
            references: {
                model: "ct_mstr",
                key: "ct_code",
            },
        },
        ctd_term: Sequelize.STRING,
        ctd_desc: Sequelize.STRING,
        ctd_due_day: {type: Sequelize.INTEGER, defaultValue : 0  }, 
        ctd_pct:Sequelize.DECIMAL, 
        
        ctd_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        
        ...base,
    },
    {
        tableName: "ctd_det",
    }
)
export default PayMethDetail
