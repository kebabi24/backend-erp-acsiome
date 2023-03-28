import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Sbaccount = sequelize.define(
    "sbaccount",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        sb_sub: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },


        
sb_desc: Sequelize.STRING,
  
sb_user1: Sequelize.STRING, 
  
sb_user2: Sequelize.STRING, 
  
sb_active: {type: Sequelize.BOOLEAN, defaultValue : false  },
  
sb__qadc01: Sequelize.STRING, 

        sb_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "sb_mstr",
    }
)
export default Sbaccount
