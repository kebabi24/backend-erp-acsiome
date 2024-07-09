import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Sequence from './sequence';


const sequelize = Container.get('sequelize');

const RepertoryDetail = sequelize.define(
    "RepertoryDetail",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
       
        repd_contact: Sequelize.STRING,
        repd_job: Sequelize.STRING,
        repd_code: Sequelize.STRING,            
        repd_domain: Sequelize.STRING,
        
        ...base,
    },
    {
        tableName: "repd_det",
    },
);
  
export default RepertoryDetail;
