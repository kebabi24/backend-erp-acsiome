
import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const ProductLine = sequelize.define(
    "productLine",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
        pl_prod_line: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        pl_desc: Sequelize.STRING,
        pl_sls_acct: Sequelize.STRING,
        pl_inv_acct: Sequelize.STRING,
        pl_wip_acct: Sequelize.STRING,
        pl_cog_acct: Sequelize.STRING,
        pl_pur_acct: Sequelize.STRING,
        pl_scrp_acct: Sequelize.STRING,
        pl_dscr_acct: Sequelize.STRING,
        pl_sls_cc: Sequelize.STRING,
        pl_inv_cc: Sequelize.STRING,
        pl_wip_cc: Sequelize.STRING,
        pl_cog_cc: Sequelize.STRING,
        pl_pur_cc: Sequelize.STRING,
        pl_scrp_cc: Sequelize.STRING,
        pl_dscr_cc: Sequelize.STRING,
        pl_ppv_acct: Sequelize.STRING,
        pl_ppv_cc: Sequelize.STRING,
        pl_rcpt_acct: Sequelize.STRING,
        pl_rcpt_cc: Sequelize.STRING,
        pl_dsc_acct: Sequelize.STRING,
        pl_dsc_cc: Sequelize.STRING,
        pl_wvar_acct: Sequelize.STRING,
        pl_wvar_cc: Sequelize.STRING,
        pl_taxc: Sequelize.STRING,
        pl_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pl_user1: Sequelize.STRING,
        pl_user2: Sequelize.STRING,
        pl_pst: {type: Sequelize.BOOLEAN, defaultValue : false  },
        pl_esls_acct: Sequelize.STRING,
        pl_esls_cc: Sequelize.STRING,
        pl_group: Sequelize.STRING,
        pl_division: Sequelize.STRING,
        pl_cchg_acct: Sequelize.STRING,
        pl_cchg_cc: Sequelize.STRING,
        pl_userid: Sequelize.STRING,
        pl_mod_date: Sequelize.DATEONLY,
        pl_cmtl_acct: Sequelize.STRING,
        pl_cmtl_cc: Sequelize.STRING,
        pl_clbr_acct: Sequelize.STRING,
        pl_clbr_cc: Sequelize.STRING,
        pl_cbdn_acct: Sequelize.STRING,
        pl_cbdn_cc: Sequelize.STRING,
        pl_covh_acct: Sequelize.STRING,
        pl_covh_cc: Sequelize.STRING,
        pl_csub_acct: Sequelize.STRING,
        pl_csub_cc: Sequelize.STRING,
        pl_apvr_acct: Sequelize.STRING,
        pl_apvr_cc: Sequelize.STRING,
        pl_apvu_acct: Sequelize.STRING,
        pl_apvu_cc: Sequelize.STRING,
        pl_ovh_acct: Sequelize.STRING,
        pl_ovh_cc: Sequelize.STRING,
        pl_mvar_acct: Sequelize.STRING,
        pl_mvar_cc: Sequelize.STRING,
        pl_mvrr_acct: Sequelize.STRING,
        pl_mvrr_cc: Sequelize.STRING,
        pl_svar_acct: Sequelize.STRING,
        pl_svar_cc: Sequelize.STRING,
        pl_svrr_acct: Sequelize.STRING,
        pl_svrr_cc: Sequelize.STRING,
        pl_cop_acct: Sequelize.STRING,
        pl_cop_cc: Sequelize.STRING,
        pl_flr_acct: Sequelize.STRING,
        pl_flr_cc: Sequelize.STRING,
        pl_rmar_acct: Sequelize.STRING,
        pl_rmar_cc: Sequelize.STRING,
        pl_fiscal_class: Sequelize.STRING,
        pl_xvar_acct: Sequelize.STRING,
        pl_xvar_cc: Sequelize.STRING,
        pl_fslbr_acct: Sequelize.STRING,
        pl_fsbdn_acct: Sequelize.STRING,
        pl_fsexp_acct: Sequelize.STRING,
        pl_fsexd_acct: Sequelize.STRING,
        pl_fslbr_cc: Sequelize.STRING,
        pl_fsbdn_cc: Sequelize.STRING,
        pl_fsexp_cc: Sequelize.STRING,
        pl_fsexd_cc: Sequelize.STRING,
        pl_fsrc_inv_acct: Sequelize.STRING,
        pl_fsrc_inv_cc: Sequelize.STRING,
        pl_fscm_inv_acct: Sequelize.STRING,
        pl_fscm_inv_cc: Sequelize.STRING,
        pl_apvr_sub: Sequelize.STRING,
        pl_apvu_sub: Sequelize.STRING,
        pl_cbdn_sub: Sequelize.STRING,
        pl_cchg_sub: Sequelize.STRING,
        pl_clbr_sub: Sequelize.STRING,
        pl_cmtl_sub: Sequelize.STRING,
        pl_cog_sub: Sequelize.STRING,
        pl_cop_sub: Sequelize.STRING,
        pl_covh_sub: Sequelize.STRING,
        pl_csub_sub: Sequelize.STRING,
        pl_dscr_sub: Sequelize.STRING,
        pl_dsc_sub: Sequelize.STRING,
        pl_flr_sub: Sequelize.STRING,
        pl_fsbdn_sub: Sequelize.STRING,
        pl_fscm_inv_sub: Sequelize.STRING,
        pl_fsexd_sub: Sequelize.STRING,
        pl_fsexp_sub: Sequelize.STRING,
        pl_fslbr_sub: Sequelize.STRING,
        pl_fsrc_inv_sub: Sequelize.STRING,
        pl_inv_sub: Sequelize.STRING,
        pl_mvar_sub: Sequelize.STRING,
        pl_mvrr_sub: Sequelize.STRING,
        pl_ovh_sub: Sequelize.STRING,
        pl_ppv_sub: Sequelize.STRING,
        pl_pur_sub: Sequelize.STRING,
        pl_rcpt_sub: Sequelize.STRING,
        pl_rmar_sub: Sequelize.STRING,
        pl_scrp_sub: Sequelize.STRING,
        pl_sls_sub: Sequelize.STRING,
        pl_svar_sub: Sequelize.STRING,
        pl_svrr_sub: Sequelize.STRING,
        pl_wip_sub: Sequelize.STRING,
        pl_wvar_sub: Sequelize.STRING,
        pl_xvar_sub: Sequelize.STRING,
        pl_xfer_acct: Sequelize.STRING,
        pl_xfer_sub: Sequelize.STRING,
        pl_xfer_cc: Sequelize.STRING,
        pl_fsdef_acct: Sequelize.STRING,
        pl_fsdef_sub: Sequelize.STRING,
        pl_fsdef_cc: Sequelize.STRING,
        pl_fsaccr_acct: Sequelize.STRING,
        pl_fsaccr_sub: Sequelize.STRING,
        pl_fsaccr_cc: Sequelize.STRING,
        pl_domain: Sequelize.STRING,
        oid_pl_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "pl_mstr",
    }
)
export default ProductLine
