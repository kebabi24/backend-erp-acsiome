import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ProjectDetail = sequelize.define(
    "projectDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pmd_line: Sequelize.INTEGER,
        pmd_code: {
            type: Sequelize.STRING,
            references: {
                model: "pm_mstr",
                key: "pm_code",
            },
        },
        pmd_task: {
            type: Sequelize.STRING,
            references:{
                model: "tk_mstr",
                key: "tk_code",
            },

        },
        pmd_status: Sequelize.STRING,
        pmd_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pmd_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pmd_cost: {type: Sequelize.DECIMAL, defaultValue : 0  },
        pmd_start: Sequelize.DATEONLY,
        pmd_end: Sequelize.DATEONLY,
        pmd_bom_code: Sequelize.STRING,
        pmd_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        pmd_um: Sequelize.STRING,
        pmd_vend: Sequelize.STRING,
        pmd_domain: Sequelize.STRING,
        
        oid_pmd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "pmd_det",
    }
)
export default ProjectDetail
