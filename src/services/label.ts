import { Service, Inject, Container } from "typedi"

@Service()
export default class LabelService {
    constructor(
        @Inject("labelModel")
        private labelModel: Models.LabelModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const label = await this.labelModel.create({ ...data })
            this.logger.silly("create label mstr")
            return label
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const label = await this.labelModel.findOne({
                where: query,
            })
            this.logger.silly("find one label mstr")
            return label
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const labels = await this.labelModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All labels mstr")
            return labels
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const label = await this.labelModel.update(data, {
                where: query,
            })
            this.logger.silly("update one label mstr")
            return label
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const label = await this.labelModel.destroy({
                where: query,
            })
            this.logger.silly("delete one label mstr")
            return label
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
