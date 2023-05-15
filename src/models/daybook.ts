import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Daybook = sequelize.define(
    "Daybook",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        dy_dy_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
      
        dy_desc: Sequelize.STRING, 
        
        dy_type: Sequelize.STRING, 
        
        dy_next_pgdet: Sequelize.INTEGER, 
        
        dy_next_pgcen: Sequelize.INTEGER, 
        
        dy_last_entdet: Sequelize.STRING, 
        
        dy_last_entcen: Sequelize.STRING, 
        
        dy_user1: Sequelize.STRING, 
        
        dy_user2: Sequelize.STRING, 
        
        dy__qadc01: Sequelize.STRING, 

        dy_domain: Sequelize.STRING,
        oid_dy_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "dy_mstr",
    }
)
export default Daybook
