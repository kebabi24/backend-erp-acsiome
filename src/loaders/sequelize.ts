import { Sequelize } from "sequelize"
import config from "../config"

export default async (): Promise<any> => {
    const sequelize = new Sequelize(config.databaseURL, { logging: false, dialectOptions: {
        useUTC: false, // for reading from database
      },
      timezone: '+01:00', })

    await sequelize.authenticate()

    return sequelize
}
