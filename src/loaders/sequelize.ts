import { Sequelize } from "sequelize"
import config from "../config"

export default async (): Promise<any> => {
    const sequelize = new Sequelize(config.databaseURL, { logging: false, dialectOptions: {
        useUTC: false, // for reading from database
      },
      timezone: '+01:00', })
// console.log(config.database,config.user,config.host,config.password)
//     const sequelize = new Sequelize({
//       dialect: 'mssql',
//       database: config.database,
//       username: config.user,
//       host: config.host,
//       password: config.password,
//       logging: true,
//   },)
    await sequelize.authenticate()

    return sequelize
}
