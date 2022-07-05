import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ProjectTaskDetail = sequelize.define(
    "projetTaskDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pmt_code: {
            type: Sequelize.STRING,
            references: {
                model: "pm_mstr",
                key: "pm_code",
            },
        },
        pmt_inst: {
            type: Sequelize.STRING,
            references: {
                model: "tk_mstr",
                key: "tk_code",
            },
        },
        pmt_task: Sequelize.STRING,
        pmt_desc: Sequelize.STRING,
        pmt_job: Sequelize.STRING,
        pmt_tool: Sequelize.STRING,
        pmt_status: Sequelize.STRING,
        pmt_close: {type: Sequelize.BOOLEAN, defaultValue : false  }, 
        
        pmt_level: Sequelize.STRING,
        pmt_duration: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
        pmt_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        
        ...base,
    },
    {
        tableName: "pmt_det",
    }
)
export default ProjectTaskDetail
