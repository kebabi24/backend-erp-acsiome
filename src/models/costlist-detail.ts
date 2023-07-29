import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const CostlistDetail = sequelize.define(
    "CostlistDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        ltrcd_code: {
            type: Sequelize.STRING,
            references: {
                model: "ltrc_mstr",
                key: "ltrc_code",
            },
        
        },
        

       
        ltrcd_weight_min: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ltrcd_weight_max: {type: Sequelize.DECIMAL, defaultValue : 0  },
       
        ltrcd_start_date: Sequelize.DATEONLY,
        ltrcd_end_date: Sequelize.DATEONLY,
        ltrcd_un_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ltrcd_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ltrcd_liste_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ltrcd_domain:  Sequelize.STRING,
       
        ...base,
    },
    {
        tableName: "ltrcd_det",
    }
)
export default CostlistDetail
