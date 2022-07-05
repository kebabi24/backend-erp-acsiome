import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Sequence = sequelize.define(
    "sequence",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        seq_seq: {
            type: Sequelize.STRING,
            unique: true
        },
        seq_desc: Sequelize.STRING,
        seq_type: Sequelize.STRING,
        seq_profile: {
            type: Sequelize.STRING,
            references: {
                model: "usrg_mstr",
                key: "usrg_code",
            },
        },
        seq_appr1: {
            type: Sequelize.STRING,
            references: {
                model: "usrd_det",
                key: "usrd_code",
            },
        },
        seq_appr1_lev: Sequelize.INTEGER,
        seq_appr1_thr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_appr2: {
            type: Sequelize.STRING,
            references: {
                model: "usrd_det",
                key: "usrd_code",
            },
        },
        seq_appr2_lev: Sequelize.INTEGER,
        seq_appr2_thr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_appr3: {
            type: Sequelize.STRING,
            references: {
                model: "usrd_det",
                key: "usrd_code",
            },
        },
        seq_appr3_lev: Sequelize.INTEGER,
        seq_appr3_thr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_valid_date_start: Sequelize.DATEONLY,
        seq_valid_date_end: Sequelize.DATEONLY,
        seq_prefix: Sequelize.STRING,
        seq_dig_range_inf: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_dig_range_sup: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_curr_val: {type: Sequelize.DECIMAL, defaultValue : 0  },
        seq_domain: {
            type: Sequelize.STRING,
            defaultValue: "acsiome",
        },
        oid_seq_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "seq_mstr",
    }
)
export default Sequence
