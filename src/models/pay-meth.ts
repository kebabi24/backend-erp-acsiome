import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';


const sequelize = Container.get('sequelize');

const PayMeth = sequelize.define(
    "paymeth",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,

        },
        ct_code: {
            type: Sequelize.STRING,
            unique: true,
        },
        ct_desc: Sequelize.STRING,
		
		ct_domain: Sequelize.STRING,
		
		...base,
			},
			{
				tableName: "ct_mstr",
			}
		)
	
export default PayMeth;
