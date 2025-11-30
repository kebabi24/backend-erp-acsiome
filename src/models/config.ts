import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Config = sequelize.define(
    "config",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        cfg_pm_module: {type: Sequelize.BOOLEAN, defaultValue : false  },
        cfg_pay_multiple: {type: Sequelize.BOOLEAN, defaultValue : false  },
        cfg_crm: {type: Sequelize.BOOLEAN, defaultValue : false  },     
        cfg_accounting: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        cfg_declared: {type: Sequelize.BOOLEAN, defaultValue : false  },    
        cfg_imput_auto:   {type: Sequelize.BOOLEAN, defaultValue : false  },
        cfg_po_threshold : {type: Sequelize.BIGINT, defaultValue : 0  },
        cfg_threshold_user : Sequelize.STRING,
        cfg_use_image: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
       
        ...base,
    },
    {
        tableName: "cfg_mstr",
    }
)
export default Config
