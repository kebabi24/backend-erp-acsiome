import { Service, Inject } from "typedi"

@Service()
export default class codeService {
    constructor(
        @Inject("codeModel") private codeModel: Models.CodeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const code = await this.codeModel.create({ ...data })
            this.logger.silly("create code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const code = await this.codeModel.findOne({ where: query })
            this.logger.silly("find one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const codes = await this.codeModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return codes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findsome(query: any): Promise<any> {
        try {
            const codes = await this.codeModel.findAll( {attributes: ['code_value',  'code_cmmt'], where: query })
            this.logger.silly("find All Codes mstr")
            return codes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const code = await this.codeModel.update(data, { where: query })
            this.logger.silly("update one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const code = await this.codeModel.destroy({ where: query })
            this.logger.silly("delete one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
