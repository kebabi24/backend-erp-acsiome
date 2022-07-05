import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const JobDetail = sequelize.define(
    "JobDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        jbd_code: {
            type: Sequelize.STRING,
            references: {
                model: "jb_mstr",
                key: "jb_code",
            },
        },
        jbd_level: Sequelize.STRING,
        
        jbd_desc: Sequelize.STRING,
        jbd_time_rate: {type: Sequelize.DECIMAL, defaultValue : 0  }, 
        jbd_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_jbd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "jbd_det",
    }
)
export default JobDetail
