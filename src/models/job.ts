import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Job = sequelize.define(
    "job",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        jb_code: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        jb_desc: Sequelize.STRING,
        jb_domain:  Sequelize.STRING,
        oid_jb_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },

        ...base,
    },
    {
        tableName: "jb_mstr",
    }
)
export default Job
