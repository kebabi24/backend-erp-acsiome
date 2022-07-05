import { Service, Inject } from "typedi"

@Service()
export default class workcenterService {
    constructor(
        @Inject("workcenterModel") private workcenterModel: Models.WorkCenterModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const wc = await this.workcenterModel.create({ ...data })
            this.logger.silly("create wc mstr")
            return wc
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const wc = await this.workcenterModel.findOne({ where: query })
            this.logger.silly("find one wc mstr")
            return wc
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const wcs = await this.workcenterModel.findAll({ where: query })
            this.logger.silly("find All wcs mstr")
            return wcs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findsome(query: any): Promise<any> {
        try {
            const wcs = await this.workcenterModel.findAll( {attributes: ['wc_wkctr',  'wc_mch'], where: query })
            this.logger.silly("find All wcs mstr")
            return wcs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const wc = await this.workcenterModel.update(data, { where: query })
            this.logger.silly("update one wc mstr")
            return wc
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const wc = await this.workcenterModel.destroy({ where: query })
            this.logger.silly("delete one wc mstr")
            return wc
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
