import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Domain = sequelize.define(
    "domain",

    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },


dom_domain : Sequelize.STRING, 

dom_name : Sequelize.STRING, 

dom_type : Sequelize.STRING, 

dom_mod_userid : Sequelize.STRING, 

dom_mod_date: Sequelize.DATEONLY, 

dom_user1 : Sequelize.STRING, 

dom_user2 : Sequelize.STRING, 


dom_sname : Sequelize.STRING, 
dom_addr : Sequelize.STRING, 
dom_city:  Sequelize.STRING, 
dom_country :  Sequelize.STRING, 
dom_rc :  Sequelize.STRING, 
dom_nif :  Sequelize.STRING, 
dom_nis:  Sequelize.STRING, 
dom_ai :  Sequelize.STRING, 
dom_bank1:  Sequelize.STRING, 
dom_rib1 :  Sequelize.STRING, 
dom_bank2:  Sequelize.STRING, 
dom_rib2 :  Sequelize.STRING, 
dom_email:  Sequelize.STRING, 
dom_web :  Sequelize.STRING, 
dom_tel1:  Sequelize.STRING, 
dom_tel2:  Sequelize.STRING, 
dom_fax : Sequelize.STRING, 


dom_active: {type: Sequelize.BOOLEAN, defaultValue : false  }, 


...base,
},
{
    tableName: "dom_mstr",
}
)
export default Domain

