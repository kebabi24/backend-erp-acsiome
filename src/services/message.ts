import { Service, Inject } from "typedi"

@Service()
export default class messageService {
    constructor(
        @Inject("messagesModel") private messagesModel: Models.messagesModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const message = await this.messagesModel.create({ ...data })
            this.logger.silly("create mesure mstr")
            return message
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const message = await this.messagesModel.findOne({ where: query })
            this.logger.silly("find one mesure mstr")
            return message
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const messages = await this.messagesModel.findAll({ where: query })
            this.logger.silly("find All mesures mstr")
            return messages
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const message = await this.messagesModel.update(data, { where: query })
            this.logger.silly("update one mesure mstr")
            return message
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const message = await this.messagesModel.destroy({ where: query })
            this.logger.silly("delete one mesure mstr")
            return message
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
