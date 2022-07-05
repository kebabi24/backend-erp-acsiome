import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        usrd_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        usrd_name: Sequelize.STRING,
        usrd_user_name: Sequelize.STRING,
        usrd_pwd: Sequelize.STRING,
        usrd_email: Sequelize.STRING,
        usrd_phone: Sequelize.STRING,
        usrd_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
        usrd_profile: {
          type: Sequelize.STRING,
            references: {
                model: "usrg_mstr",
                key: "usrg_code",
            },
        },
        oid_usrd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "usrd_det",
    }
)
export default User
