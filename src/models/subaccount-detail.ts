import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const SubaccountDetail = sequelize.define(
    "subaccountDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        sbd_sub: {
            type: Sequelize.STRING,
            references: {
                model: "sb_mstr",
                key: "sb_sub",
            },
        },
        sbd_line: Sequelize.INTEGER,
        sbd_acc_beg: Sequelize.STRING,
        sbd_acc_end: Sequelize.STRING,
        sbd_user1: Sequelize.STRING,
        sbd_user2: Sequelize.STRING,  
        sbd__qadc01: Sequelize.STRING,
          sbd_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "sbd_det",
    }
)
export default SubaccountDetail
