import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Forcast = sequelize.define(
    "forcast",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },

        frc_year: Sequelize.INTEGER,
        frc_month: Sequelize.INTEGER,
        frc_day: Sequelize.INTEGER,
        frc_dayname: Sequelize.STRING,
        frc_date: Sequelize.DATEONLY,
        frc_site:  {
            type: Sequelize.STRING,
            references:{
                model: "si_mstr",
                key: "si_site",
            },

        },
        frc_cust: Sequelize.STRING,
        frc_type:Sequelize.STRING,
        frc_part: Sequelize.STRING,
        frc_dsgn_grp: Sequelize.STRING,
        frc_part_type: Sequelize.STRING,
        frc_part_group: Sequelize.STRING,
        frc_promo: Sequelize.STRING,
        frc_qty: { type: Sequelize.DECIMAL, defaultValue: 0 },
        frc_amt: { type: Sequelize.DECIMAL, defaultValue: 0 },
        frc_domain: Sequelize.STRING,
        ...base,
    },
    {
        tableName: "frc_mstr",
    }
)
export default Forcast
