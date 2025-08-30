import { Service, Inject, Container } from "typedi"
import { Op, Sequelize } from 'sequelize';
@Service()
export default class voucherProformaService {
    constructor(
        @Inject("voucherProformaModel")
        private voucherProformaModel: Models.VoucherProformaModel,
        @Inject("providerModel") private providerModel: Models.ProviderModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const voucherProforma = await this.voucherProformaModel.create({ ...data })
            this.logger.silly("create voucherProforma mstr")
            return voucherProforma
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const voucherProforma = await this.voucherProformaModel.findOne({
                where: query, include:this.addressModel
            })
            this.logger.silly("find one voucherProforma mstr")
            return voucherProforma
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const voucherProformas = await this.voucherProformaModel.findAll({
                where: query,
                include:this.providerModel
            })
            this.logger.silly("find All voucherProformas mstr")
            return voucherProformas
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findbetween(query: any): Promise<any> {
        
        try {
            console.log(query.date)
            const accountPayables = await this.voucherProformaModel.findAll(  {where :{
                vhp_inv_date: { [Op.between]: [query.date, query.date1]}},
               include: this.addressModel,} )
            // console.log(accountPayables)
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const voucherProforma = await this.voucherProformaModel.update(data, {
                where: query,
            })
            this.logger.silly("update one voucherProforma mstr")
            return voucherProforma
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const voucherProforma = await this.voucherProformaModel.destroy({
                where: query,
            })
            this.logger.silly("delete one voucherProforma mstr")
            return voucherProforma
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
