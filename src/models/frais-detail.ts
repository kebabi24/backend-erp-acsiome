
import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const FraisDetail = sequelize.define(
    "fraisDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },






frpd_part : Sequelize.STRING,


frpd_prh_nbr : Sequelize.STRING,

frpd_po_nbr : Sequelize.STRING, 

frpd_inv_nbr : Sequelize.STRING,


frpd_amt : { type: Sequelize.DECIMAL, defaultValue: 0 },

frpd_qty_rcvd : { type: Sequelize.DECIMAL, defaultValue: 0 },

frpd_imput: { type: Sequelize.BOOLEAN, defaultValue: false },


frpd_inv_date: Sequelize.DATEONLY,


frpd_date: Sequelize.DATEONLY,


frpd_line: { type: Sequelize.INTEGER, defaultValue: 1 }, 




frpd_prh_date: Sequelize.DATEONLY,

frpd_domain: Sequelize.STRING,

...base,
},
{
tableName: "frpd_det",
}
)
export default FraisDetail
