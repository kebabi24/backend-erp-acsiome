import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Costcenter = sequelize.define(
    "costcenter",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },


cc_ctr:  {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true
},
cc_desc: Sequelize.STRING,

cc_user1: Sequelize.STRING,

cc_user2: Sequelize.STRING,

cc_active: {type: Sequelize.BOOLEAN, defaultValue : false  },

cc__qadc01: Sequelize.STRING,

cc_domain: Sequelize.STRING,
    },

{
    tableName: "cc_mstr",
}
)
export default Costcenter
