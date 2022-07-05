import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const TaskDetail = sequelize.define(
    "taskDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        tkd_code: {
            type: Sequelize.STRING,
            references: {
                model: "tk_mstr",
                key: "tk_code",
            },
        },
        tkd_nbr: Sequelize.STRING,
        tkd_desc: Sequelize.STRING,
        tkd_job: Sequelize.STRING,
        tkd_tool: Sequelize.STRING,
        
        tkd_level: Sequelize.STRING,
        tkd_duration: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        
        tkd_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_tkd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "tkd_det",
    }
)
export default TaskDetail
