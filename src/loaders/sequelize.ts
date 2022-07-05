import { Sequelize } from "sequelize"
import config from "../config"

export default async (): Promise<any> => {
    const sequelize = new Sequelize(config.databaseURL, { logging: false })

    await sequelize.authenticate()

    return sequelize
}
