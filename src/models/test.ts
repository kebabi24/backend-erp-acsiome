import { Container } from 'typedi';
import Sequelize from 'sequelize'


const sequelize = Container.get('sequelize')

const test = sequelize.define('test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    test: Sequelize.STRING,
})
export default test
