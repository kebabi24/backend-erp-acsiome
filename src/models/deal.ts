import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Deal = sequelize.define(
    "Deal",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        deal_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        deal_desc:Sequelize.STRING,
        
        deal_start_date: Sequelize.DATEONLY,
        deal_end_date: Sequelize.DATEONLY,
        deal_status: Sequelize.STRING,
        deal_amt : {type: Sequelize.DECIMAL, defaultValue : 0  },
        deal_inv_meth: Sequelize.STRING,
        deal_pay_meth: Sequelize.STRING,
        deal_pen_cust: {type: Sequelize.DECIMAL, defaultValue : 0  },
        deal_pen_prov: {type: Sequelize.DECIMAL, defaultValue : 0  },
        deal_delai_cust: {type: Sequelize.DECIMAL, defaultValue : 0  },
        deal_delai_prov: {type: Sequelize.DECIMAL, defaultValue : 0  },
        deal_attach: Sequelize.STRING,
        deal_sign_cust: Sequelize.STRING,
        deal_sign_prov: Sequelize.STRING,
        deal_cust: Sequelize.STRING,
    

        deal_open: {type: Sequelize.BOOLEAN, defaultValue : false  },
        deal_inv: {type: Sequelize.BOOLEAN, defaultValue : false  },
        deal_domain:  Sequelize.STRING,
        
        ...base,
    },
    {
        tableName: "deal_mstr",
    }
)
export default Deal
