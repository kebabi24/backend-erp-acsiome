import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Code = sequelize.define(
    "code",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        code_fldname: Sequelize.STRING,
        code_value: Sequelize.STRING,
        code_desc: Sequelize.STRING,
        code_cmmt: Sequelize.STRING,
        code_user1: Sequelize.STRING,
        code_user2: Sequelize.STRING,
        chr01: Sequelize.STRING,
        chr02: Sequelize.STRING,
        dec01: {type: Sequelize.DECIMAL, defaultValue : 0  },
        dec02: {type: Sequelize.DECIMAL, defaultValue : 0  },
        date01: Sequelize.DATEONLY,        
        date02: Sequelize.DATEONLY,
        bool01: {type: Sequelize.BOOLEAN, defaultValue : false  },
        bool02: {type: Sequelize.BOOLEAN, defaultValue : false  },
        code_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_code_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "code_mstr",
    }
)
export default Code
