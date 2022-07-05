import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Entity = sequelize.define(
    "entity",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        en_entity: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        en_name: Sequelize.STRING,
        en_primary: {type: Sequelize.BOOLEAN, defaultValue : false  },
        en_curr: Sequelize.STRING,
        en_adj_bs: Sequelize.STRING,
        en_page_num: Sequelize.INTEGER,
        en_next_prot: Sequelize.INTEGER,
        en_src_desc_lang: Sequelize.STRING,
        en_addr: Sequelize.STRING,
        en_consolidation: {type: Sequelize.BOOLEAN, defaultValue : false  },
        en_type: Sequelize.STRING,
        en_user1: Sequelize.STRING,
        en_user2: Sequelize.STRING,
        en_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_en_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "en_mstr",
    }
)
export default Entity
