import { Container } from "typedi"
import Sequelize from "sequelize"
import base from "./base"

const sequelize = Container.get("sequelize")

const AffectEmploye = sequelize.define(
    "AffectEmploye",
    {
   
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true

        },       




        pme_pm_code: Sequelize.STRING,
        pme_inst: Sequelize.STRING,
        pme_task: Sequelize.STRING,
        pme_task_status: Sequelize.STRING,
        pme_start_date: Sequelize.DATEONLY,
        pme_end_date: Sequelize.DATEONLY,
        pme_start_time: Sequelize.TIME,
        pme_end_time: Sequelize.TIME,
        pme_internal: Sequelize.BOOLEAN,
        pme_employe: Sequelize.STRING,
        pme_vend: Sequelize.STRING,
        
        pme_domain: {
            type: Sequelize.STRING,
            defaultValue: "acsiome",
        },
        



        ...base,
    },
        {
        tableName: "pme_det",
        }
    
    )
    export default AffectEmploye
    