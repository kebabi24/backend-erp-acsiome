import { Service, Inject, Container } from "typedi"

@Service()
export default class requisitionService {
    constructor(
        @Inject("requisitionModel")
        private requisitionModel: Models.RequisitionModel,
        @Inject("providerModel") private providerModel: Models.ProviderModel,
        @Inject("sequenceModel") private sequenceModel: Models.SequenceModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const requisition = await this.requisitionModel.create({ ...data })
            this.logger.silly("create requisition mstr")
            return requisition
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const requisition = await this.requisitionModel.findOne({
                where: query, include:[this.providerModel,this.sequenceModel]
            })
            this.logger.silly("find one requisition mstr")
            return requisition
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }



    public async find(query: any): Promise<any> {
        try {
            const requisitions = await this.requisitionModel.findAll({
                where: query,  order: [
                    ['rqm_req_date', 'ASC'],
                    
                  ],
                include:[this.providerModel,this.sequenceModel]
            })
            this.logger.silly("find All requisitions mstr")
            return requisitions
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const requisition = await this.requisitionModel.update(data, {
                where: query,
            })
            this.logger.silly("update one requisition mstr")
            return requisition
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const requisition = await this.requisitionModel.destroy({
                where: query,
            })
            this.logger.silly("delete one requisition mstr")
            return requisition
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
