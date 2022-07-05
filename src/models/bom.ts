import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Bom = sequelize.define(
    "Bom",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },


        bom_parent: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
           

    bom_desc: Sequelize.STRING, 

    bom_rmks: Sequelize.STRING, 

    bom_batch: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

    bom_batch_um: Sequelize.STRING, 

    bom_cmtindx: Sequelize.INTEGER, 

    bom_ll_code: Sequelize.INTEGER, 

    bom_user1: Sequelize.STRING, 

    bom_user2: Sequelize.STRING, 

    bom_userid: Sequelize.STRING, 

    bom_mod_date: Sequelize.DATEONLY,

    bom__chr01: Sequelize.STRING, 

    bom__chr02: Sequelize.STRING, 

    bom__chr03: Sequelize.STRING, 

    bom__chr04: Sequelize.STRING, 

    bom__chr05: Sequelize.STRING, 

    bom__dte01: Sequelize.DATEONLY,

    bom__dte02: Sequelize.DATEONLY,

    bom__dec01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

    bom__dec02: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

    bom__log01: {type: Sequelize.BOOLEAN, defaultValue : false  },

    bom_formula: {type: Sequelize.BOOLEAN, defaultValue : false  },

    bom_mthd: Sequelize.STRING, 

    bom_fsm_type: Sequelize.STRING, 

    bom_site: Sequelize.STRING, 

    bom_loc: Sequelize.STRING, 

    bom__qadc01: Sequelize.STRING, 

    bom__qadc02: Sequelize.STRING, 

    bom__qadc03: Sequelize.STRING, 

    bom__qadd01: {type: Sequelize.DECIMAL, defaultValue : 0  }, 

    bom__qadi01: Sequelize.INTEGER, 

    bom__qadi02: Sequelize.INTEGER, 

    bom__qadt01: Sequelize.DATEONLY,

    bom__qadt02: Sequelize.DATEONLY,

    bom__qadl01: {type: Sequelize.BOOLEAN, defaultValue : false  },

    bom__qadl02: {type: Sequelize.BOOLEAN, defaultValue : false  },

    bom_mthd_qtycompl: Sequelize.STRING, 




    bom_domain: {
        type: Sequelize.STRING,
        defaultValue: 'zima'
    },
    oid_bom_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
    },
    {
        tableName: "bom_mstr",
    }
)
export default Bom
