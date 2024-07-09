import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';

const sequelize = Container.get('sequelize');

const ItemDetail = sequelize.define(
  'itemDetail',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    ptd_part: {
      type: Sequelize.STRING,
      references: {
        model: 'pt_mstr',
        key: 'pt_part',
      },
    },
    ptd_desc : Sequelize.STRING,
    ptd_gol: Sequelize.STRING,
    ptd_domain: Sequelize.STRING,
   
    ...base,
  },
  {
    tableName: 'ptd_det',
  },
);
export default ItemDetail;
