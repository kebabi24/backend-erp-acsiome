import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Sequence from './sequence';


const sequelize = Container.get('sequelize');

const Repertory = sequelize.define(
    "Repertory",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
        rep_type: Sequelize.STRING,    
        rep_code: Sequelize.STRING,
        rep_contact: Sequelize.STRING,
        rep_post: Sequelize.STRING,            
        rep_tel: Sequelize.STRING,
        rep_tel2: Sequelize.STRING,
        rep_email: Sequelize.STRING,
        rep_domain: Sequelize.STRING,
        
        ...base,
    },
    {
        tableName: "rep_mstr",
    },
);
  
export default Repertory;
