import { Service, Inject } from "typedi"

@Service()
export default class tagService {
    constructor(
        @Inject("tagModel") private tagModel: Models.TagModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const tag = await this.tagModel.create({ ...data })
            this.logger.silly("create tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const tag = await this.tagModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const tags = await this.tagModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All tags mstr")
            return tags
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    

    public async update(data: any, query: any): Promise<any> {
        try {
            const tag = await this.tagModel.upsert(data, { where: query })
            this.logger.silly("update one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async reupdate(data: any, query: any): Promise<any> {
        try {
            const tag = await this.tagModel.update(data, { where: query })
            this.logger.silly("update one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const tag = await this.tagModel.destroy({ where: query })
            this.logger.silly("delete one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async max(field: any): Promise<any> {
        try {
            const max = await this.tagModel.max(field)
            this.logger.silly("delete one tag mstr")
            return max
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

