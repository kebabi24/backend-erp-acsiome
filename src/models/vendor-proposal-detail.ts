import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const VendorProposalDetail = sequelize.define(
    "VendorProposalDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        vpd_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "vp_mstr",
                key: "vp_nbr",
            },
        },
        vpd_line: Sequelize.INTEGER,
        vp_part: {
            type: Sequelize.STRING,
            references:{
                model: "pt_mstr",
                key: "pt_part",
            },

        },
        vpd_vend_part: Sequelize.STRING,
        vpd_um: Sequelize.STRING,
        vpd_q_price: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vpd_q_qty: {type: Sequelize.DECIMAL, defaultValue : 0  },
        vpd_mfgr: Sequelize.STRING,
        vpd_mfgr_part: Sequelize.STRING,
        vpd_domain:  {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        ...base,
    },
    {
        tableName: "vpd_det",
    }
)
export default VendorProposalDetail
