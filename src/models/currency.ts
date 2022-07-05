import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Currency = sequelize.define(
    "currency",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        cu_curr: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        cu_desc: Sequelize.STRING,
        cu_rnd_mthd: Sequelize.STRING,
        cu_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        cu_mod_userid: Sequelize.STRING,
        cu_mod_date: Sequelize.DATEONLY,
        cu_user1: Sequelize.STRING,
        cu_user2: Sequelize.STRING,
        cu_iso_curr: Sequelize.STRING,
        cu_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_cu_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "cu_mstr",
    }
)
export default Currency
