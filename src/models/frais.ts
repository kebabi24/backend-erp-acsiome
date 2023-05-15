import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Frais = sequelize.define(
    "frais",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        frp_inv_nbr: Sequelize.STRING,
        frp_prh_nbr: Sequelize.STRING,
        frp_type_affect: Sequelize.STRING,
        frp_effdate: Sequelize.DATEONLY,
        frp_val: Sequelize.DECIMAL,
        frp_rmks: Sequelize.STRING,
        frp_user1: Sequelize.STRING,
        frp_user2: Sequelize.STRING,
        
        frp_domain: Sequelize.STRING,
        oid_frp_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "frp_mstr",
    }
)
export default Frais
