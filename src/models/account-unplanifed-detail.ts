import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AccountUnplanifedDetail = sequelize.define(
    "account-unplanifed-detail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        aud_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "au_mstr",
                key: "au_nbr",
            },
        },
 
        aud_fc_code: {
            type: Sequelize.STRING,
            references: {
                model: "fc_mstr",
                key: "fc_code",
            },
        },
        aud_desc: Sequelize.STRING,
        aud_so_nbr: Sequelize.STRING,

        aud_amt: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

        
        aud_domain: Sequelize.STRING,
  
    ...base,
    },
    {
        tableName: "aud_det",
    }
)
export default AccountUnplanifedDetail
