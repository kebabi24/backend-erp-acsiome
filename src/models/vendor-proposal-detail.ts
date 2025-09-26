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

        vpd_inv_nbr: {
            type: Sequelize.STRING,
            references: {
                model: "vp_mstr",
                key: "vp_inv_nbr",
            },
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
        vpd_taxable: { type: Sequelize.BOOLEAN, defaultValue: false },
        vpd_taxc: Sequelize.STRING,
        vpd_tax_code: {
            type: Sequelize.STRING,
            references: {
              model: 'tx2_mstr',
              key: 'tx2_tax_code',
            },
          },

        vpd_mfgr_part: Sequelize.STRING,
        vpd_domain:  Sequelize.STRING,
        ...base,
    },
    {
        tableName: "vpd_det",
    }
)
export default VendorProposalDetail
