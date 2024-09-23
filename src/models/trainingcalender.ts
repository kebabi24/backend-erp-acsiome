import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const Trainingcalender = sequelize.define(
    "Trainingcalender",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },
       
        tc_year: Sequelize.INTEGER,
        tc_site: Sequelize.STRING,
        tc_service:Sequelize.STRING,
        tc_part: {
          type: Sequelize.STRING,
          references: {
            model: 'pt_mstr',
            key: 'pt_part',
          },
        },
        tc_desc: Sequelize.STRING,
        tc_pop: Sequelize.STRING,
        tc_session_nbr: Sequelize.INTEGER,  
        tc_vend:  {
            type: Sequelize.STRING,
            references: {
              model: 'vd_mstr',
              key: 'vd_addr',
            },
          },
        tc_start_date:  Sequelize.DATEONLY,
        tc_end_date: Sequelize.DATEONLY,
        tc_domain:  Sequelize.STRING,
           
        ...base,
    },
    {
        tableName: "tc_mstr",
    }
)
export default Trainingcalender
