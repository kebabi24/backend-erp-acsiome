import { Service, Inject, Container } from "typedi"

@Service()
export default class vendorPropsalService {
    constructor(
        @Inject("vendorProposalModel") private vendorProposalModel: Models.VendorPropasalModel,
        @Inject("providerModel") private providerModel: Models.ProviderModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("requisitionModel") private requisitionModel: Models.RequisitionModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const vendorPropsal = await this.vendorProposalModel.create({
                ...data,
            })
            this.logger.silly("create vendorPropsal mstr")
            return vendorPropsal
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const vendorPropsal = await this.vendorProposalModel.findOne({
                where: query,
                include: [this.providerModel, this.requisitionModel],
            })
            this.logger.silly("find one vendorPropsal mstr")
            return vendorPropsal
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const vendorPropsals = await this.vendorProposalModel.findAll({
                where: query,
                include: [this.providerModel, this.requisitionModel,this.addressModel],
            })
            this.logger.silly("find All vendorPropsals mstr")
            return vendorPropsals
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const vendorPropsal = await this.vendorProposalModel.update(data, {
                where: query,
            })
            this.logger.silly("update one vendorPropsal mstr")
            return vendorPropsal
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const vendorPropsal = await this.vendorProposalModel.destroy({
                where: query,
            })
            this.logger.silly("delete one vendorPropsal mstr")
            return vendorPropsal
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
