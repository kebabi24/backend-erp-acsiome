import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Mesure = sequelize.define(
    "mesure",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        um_um: Sequelize.STRING,
        um_alt_um: Sequelize.STRING,
        um_part: Sequelize.STRING,
        um_conv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        um_user1: Sequelize.STRING,
        um_user2: Sequelize.STRING,
        
        um_domain: Sequelize.STRING,
        oid_um_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "um_mstr",
    }
)
export default Mesure
