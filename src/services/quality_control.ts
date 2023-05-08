import { Service, Inject } from 'typedi';

@Service()
export default class QualityControl {
  constructor(
    @Inject('specificationModel') private specificationModel: Models.specificationModel,
    @Inject('specificationDetailsModel') private specificationDetailsModel: Models.specificationDetailsModel,
    @Inject('specificationTestHistoryModel')
    private specificationTestHistoryModel: Models.SpecificationTestHistoryModel,

    @Inject('logger') private logger,
  ) {}

  public async createStandartSpecificationHeader(data: any): Promise<any> {
    try {
      const specificationHeader = await this.specificationModel.create({ ...data });
      this.logger.silly('specificationHeader created ', specificationHeader);
      return specificationHeader;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createStandartSpecificationDetails(data: any): Promise<any> {
    try {
      const specificationDetails = await this.specificationDetailsModel.bulkCreate(data);
      this.logger.silly('specificationDetails created ', specificationDetails);
      return specificationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findSpecificationByCode(data: any): Promise<any> {
    try {
      const specification = await this.specificationModel.findOne({ where: { mp_nbr: data } });
      this.logger.silly('find one specification');
      return specification;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

    public async findSpecificationDetailsByCode(data: any): Promise<any> {
        try {
            const specification = await this.specificationDetailsModel.findAll({
                 where: {mpd_nbr :data },
                 attributes:["id","mpd_nbr","mpd_label","mpd_chr01"]
                })
            this.logger.silly("find specification details")
            return specification
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

  public async getSpecifications(): Promise<any> {
    try {
      const specifications = await this.specificationModel.findAll({
        attributes: ['mp_nbr'],
      });
      this.logger.silly('find categories ');
      return specifications;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getSpecificationsDetails(query: any): Promise<any> {
    try {
      const specifications = await this.specificationDetailsModel.findAll({
        where: query,
      });
      this.logger.silly('find categories ');
      return specifications;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createTestsHistory(data: any): Promise<any> {
    try {
      const testsHistory = await this.specificationTestHistoryModel.bulkCreate(data);
      this.logger.silly('testsHistory created ', testsHistory);
      return testsHistory;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async create(data: any): Promise<any> {
    try {
      const testsHistory = await this.specificationTestHistoryModel.create(data);
      this.logger.silly('testsHistory created ', testsHistory);
      return testsHistory;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
