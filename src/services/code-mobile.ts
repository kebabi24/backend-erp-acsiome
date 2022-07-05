import { Service, Inject } from "typedi"

@Service()
export default class codeMobileService {
    constructor(
        @Inject("codeMobileModel") private codeMobileModel: Models.CodeMobileModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const codeMobile = await this.codeMobileModel.create({ ...data })
            this.logger.silly("create code mobile mstr")
            return codeMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const codeMobile = await this.codeMobileModel.findOne({ where: query })
            this.logger.silly("find one code mstr")
            return codeMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const codesMobile = await this.codeMobileModel.findAll({ where: query })
            this.logger.silly("find All Mobile Codes mstr")
            return codesMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findsome(query: any): Promise<any> {
        try {
            const codesMobile = await this.codeMobileModel.findAll( {attributes: ['code_value',  'code_cmmt'], where: query })
            this.logger.silly("find some mobile Codes mstr")
            return codesMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const codeMobile = await this.codeMobileModel.update(data, { where: query })
            this.logger.silly("update one mobile code mstr")
            return codeMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const codeMobile = await this.codeMobileModel.destroy({ where: query })
            this.logger.silly("delete one mobile code mstr")
            return codeMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
