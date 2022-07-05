import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const CostSimulation = sequelize.define(
    "CostSimulation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        sct_sim: Sequelize.STRING,
        sct_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        sct_cst_tot: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_mtl_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_lbr_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_bdn_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_ovh_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_sub_tl: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_mtl_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_lbr_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_bdn_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_ovh_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_sub_ll: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct_cst_date: Sequelize.DATEONLY,
        sct_user1: Sequelize.STRING,
        sct_user2: Sequelize.STRING,
        sct_serial: Sequelize.STRING,
        sct_site: Sequelize.STRING,
        sct_rollup: {type: Sequelize.BOOLEAN, defaultValue : false  },
        sct_rollup_id: Sequelize.STRING,
        sct_nrv: {type: Sequelize.DECIMAL, defaultValue : 0  },
        sct__qadc01: Sequelize.STRING,
        sct_cost_changed: {type: Sequelize.BOOLEAN, defaultValue : false  },
        sct_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_sct_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "sct_det",
    }
)
export default CostSimulation
