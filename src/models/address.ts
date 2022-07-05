import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"
import Provider from './provider'
const sequelize = Container.get("sequelize")

const Address = sequelize.define(
    "address",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        ad_addr: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        ad_name: Sequelize.STRING,
        ad_line1: Sequelize.STRING,
        ad_line2: Sequelize.STRING,
        ad_city: Sequelize.STRING,
        ad_state: Sequelize.STRING,
        ad_zip: Sequelize.STRING,
        ad_type: Sequelize.STRING,
        ad_attn: Sequelize.STRING,
        ad_phone: Sequelize.STRING,
        ad_ext: Sequelize.STRING,
        ad_ref: Sequelize.STRING,
        ad_sort: Sequelize.STRING,
        ad_country: Sequelize.STRING,
        ad_attn2: Sequelize.STRING,
        ad_phone2: Sequelize.STRING,
        ad_ext2: Sequelize.STRING,
        ad_fax: Sequelize.STRING,
        ad_fax2: Sequelize.STRING,
        ad_line3: Sequelize.STRING,
        ad_user1: Sequelize.STRING,
        ad_user2: Sequelize.STRING,
        ad_lang: Sequelize.STRING,
        ad_pst_id: Sequelize.STRING,
        ad_date: Sequelize.DATEONLY,
        ad_county: Sequelize.STRING,
        ad_temp: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ad_bk_acct1: Sequelize.STRING,
        ad_bk_acct2: Sequelize.STRING,
        ad_format: Sequelize.INTEGER,
        ad_vat_reg: Sequelize.STRING,
        ad_coc_reg: Sequelize.STRING,
        ad_gst_id: Sequelize.STRING,
        ad_tax_type: Sequelize.STRING,
        ad_taxc: Sequelize.STRING,
        ad_taxable: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ad_tax_in: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ad_conrep: Sequelize.STRING,
        ad_edi_tpid: Sequelize.STRING,
        ad_edi_ctrl: Sequelize.STRING,
        ad_timezone: Sequelize.STRING,
        ad_userid: Sequelize.STRING,
        ad_mod_date: Sequelize.DATEONLY,
        ad_edi_id: Sequelize.STRING,
        ad_barlbl_prt: Sequelize.STRING,
        ad_barlbl_val: Sequelize.STRING,
        ad_calendar: Sequelize.STRING,
        ad_edi_std: Sequelize.STRING,
        ad_edi_level: Sequelize.STRING,
        ad_tp_loc_code: Sequelize.STRING,
        ad_tax_zone: Sequelize.STRING,
        ad_tax_usage: Sequelize.STRING,
        ad_misc1_id: Sequelize.STRING,
        ad_misc2_id: Sequelize.STRING,
        ad_misc3_id: Sequelize.STRING,
        ad_wk_offset: Sequelize.INTEGER,
        ad_inv_mthd: Sequelize.STRING,
        ad_sch_mthd: Sequelize.STRING,
        ad_po_mthd: Sequelize.STRING,
        ad_asn_data: Sequelize.STRING,
        ad_intr_division: Sequelize.STRING,
        ad_tax_report: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ad_name_control: Sequelize.STRING,
        ad_last_file: {type: Sequelize.BOOLEAN, defaultValue : false  },
        ad_domain: {
            type: Sequelize.STRING,
            defaultValue: 'zima'
        },
        oid_ad_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
        ...base,
    },
    {
        tableName: "ad_mstr",
    }
)

export default Address
