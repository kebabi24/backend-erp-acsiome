import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Costaccount = sequelize.define(
    "costaccount",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ccd1_cc: {
            type: Sequelize.STRING,
            references: {
                model: "cc_mstr",
                key: "cc_ctr",
            },
        },
        ccd1_line: Sequelize.INTEGER,
        ccd1_acc_beg: Sequelize.STRING,
        ccd1_acc_end: Sequelize.STRING,
        ccd1_user1: Sequelize.STRING,
        ccd1_user2: Sequelize.STRING,  
        ccd1__qadc01: Sequelize.STRING,
        ccd1_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        ...base,
    },
    {
        tableName: "ccd1_det",
    }
)
export default Costaccount

