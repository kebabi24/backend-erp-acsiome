import { Service, Inject } from 'typedi';

@Service()
export default class vendorProposalDetailService {
  constructor(
    @Inject('vendorProposalDetailModel') private vendorProposalDetailModel: Models.VendorPropasalDetailModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('taxeModel') private taxeModel: Models.TaxeModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const vendorProposalDetail = await this.vendorProposalDetailModel.create({ ...data });
      this.logger.silly('create vendorProposalDetail mstr');
      return vendorProposalDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const vendorProposalDetail = await this.vendorProposalDetailModel.findOne({
        where: query,
        include: [
          {
            model: this.itemModel,
            as: 'item',
            required: true,
            include: [{ model: this.taxeModel, as: 'taxe', required: true }],
          },
        ],
      });
      this.logger.silly('find one vendorProposalDetail mstr');
      return vendorProposalDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const vendorProposalDetails = await this.vendorProposalDetailModel.findAll({
        where: query,
        include: [
          {
            model: this.itemModel,
            as: 'item',
            required: true,
            include: [{ model: this.taxeModel, as: 'taxe', required: true }],
          },
        ],
      });
      this.logger.silly('find All vendorProposalDetails mstr');
      return vendorProposalDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const vendorProposalDetail = await this.vendorProposalDetailModel.update(data, { where: query });
      this.logger.silly('update one vendorProposalDetail mstr');
      return vendorProposalDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const vendorProposalDetail = await this.vendorProposalDetailModel.destroy({ where: query });
      this.logger.silly('delete one vendorProposalDetail mstr');
      return vendorProposalDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
