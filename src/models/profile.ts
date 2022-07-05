import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Profile = sequelize.define(
    "profile",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        usrg_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        usrg_description: Sequelize.STRING,
        usrg_val_st_date: Sequelize.DATEONLY,
        usrg_val_en_date: Sequelize.DATEONLY,
        usrg_menus: Sequelize.TEXT,
        oid_usrg_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "usrg_mstr",
    }
)
export default Profile
