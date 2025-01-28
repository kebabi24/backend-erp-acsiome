import { Service, Inject } from "typedi"

@Service()
export default class DecompteService {
    constructor(
        @Inject("decompteModel") private decompteModel: Models.DecompteModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const decompte = await this.decompteModel.create({ ...data })
            this.logger.silly("decompte", decompte)
            return decompte
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const decompte = await this.decompteModel.findOne({ where: query })
            this.logger.silly("find one decompte mstr")
            return decompte
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const decomptes = await this.decompteModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return decomptes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findS(query: any): Promise<any> {
        try {
          const decomptes = await this.decompteModel.findAll(query);
          return decomptes;
        } catch (e) {
          console.log('Error from service- getInvoice');
          this.logger.error(e);
          throw e;
        }
      }
    public async update(data: any, query: any): Promise<any> {
        try {
            const decompte = await this.decompteModel.update(data, { where: query })
            this.logger.silly("update one decompte mstr")
            return decompte
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const decompte = await this.decompteModel.destroy({ where: query })
            this.logger.silly("delete one decompte mstr")
            return decompte
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
