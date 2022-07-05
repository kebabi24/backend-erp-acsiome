import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Costsub = sequelize.define(
    "costsub",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ccd2_cc: {
            type: Sequelize.STRING,
            references: {
                model: "cc_mstr",
                key: "cc_ctr",
            },
        },
        ccd2_line: Sequelize.INTEGER,
        ccd2_sub_beg: Sequelize.STRING,
        ccd2_sub_end: Sequelize.STRING,
        ccd2_user1: Sequelize.STRING,
        ccd2_user2: Sequelize.STRING,  
        ccd2__qadc01: Sequelize.STRING,
        ccd2_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        ...base,
    },
    {
        tableName: "ccd2_det",
    }
)
export default Costsub

