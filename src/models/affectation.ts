
import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"
import Address from "./address"
const sequelize = Container.get("sequelize")

const Affectation = sequelize.define(
    "affectation",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },




gmbtd_nbr: Sequelize.STRING,  

gmbtd_resp: Sequelize.STRING,  

gmbtd_job: Sequelize.STRING,  

gmbtd_job_count: Sequelize.INTEGER,

gmbtd_job_level: Sequelize.STRING,  

gmbtd_req_date: Sequelize.DATEONLY,

gmbtd_deb_date: Sequelize.DATEONLY,

gmbtd_prevue: {type: Sequelize.BOOLEAN, defaultValue : false  }, 

gmbtd_down_code: Sequelize.STRING,  

gmbtd_find_code: Sequelize.STRING,  

gmbtd_end_code: Sequelize.STRING,  

gmbtd_instr_nbr: Sequelize.STRING,  

gmbtd_bm_nbr: Sequelize.STRING,  

gmbtd_tool_nbr: Sequelize.STRING,  

gmbtd_maint: Sequelize.STRING,  

gmbtd_deb_houre: Sequelize.STRING,  

gmbtd_end_date: Sequelize.DATEONLY,


gmbtd_end_hour: Sequelize.STRING,  

gmbtd_domain: Sequelize.STRING,
oid_gmbtd_det: {type: Sequelize.DECIMAL, defaultValue : 0  },
...base,
},
{
tableName: "gmbtd_det",
}
)
export default Affectation

