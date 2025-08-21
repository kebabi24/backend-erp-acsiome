import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ProfileService = sequelize.define(
    "profileService",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        usgs_code: {
            type: Sequelize.STRING,
            references: {
                model: "usrg_mstr",
                key: "usrg_code",
            },
        },
        usgs_service: Sequelize.STRING,
        usgs_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "usgs_det",
    }
)
export default ProfileService
