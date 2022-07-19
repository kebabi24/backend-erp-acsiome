import { Service, Inject } from "typedi"

@Service()
export default class MenuService {
    constructor(
        @Inject("menuModel") private menuModel: Models.MenuModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const menu = await this.menuModel.create({ ...data })
            this.logger.silly("create menu mstr")
            return menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const menu = await this.menuModel.findOne({ where: query })
            this.logger.silly("find one menu mstr")
            return menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const menu = await this.menuModel.findAll({ where: query })
            this.logger.silly("find All menu mstr")
            return menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const menu = await this.menuModel.update(data, { where: query })
            this.logger.silly("update one menu mstr")
            return menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const menu = await this.menuModel.destroy({ where: query })
            this.logger.silly("delete one menu mstr")
            return menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
