import { Service, Inject } from 'typedi';
import { Op ,Sequelize } from "sequelize";


@Service()
export default class QualityControl {
  constructor(
    @Inject('specificationModel') private specificationModel: Models.specificationModel,
    @Inject('specificationDetailsModel') private specificationDetailsModel: Models.specificationDetailsModel,
    @Inject('SpecificationTestResultsModel') private specificationTestResultsModel: Models.SpecificationTestResultsModel,
    @Inject('specificationTestHistoryModel')  private specificationTestHistoryModel: Models.SpecificationTestHistoryModel,
    @Inject('itemSpecificationDetailsModel')  private itemSpecificationDetailsModel: Models.itemSpecificationDetailsModel,
    @Inject('qualityInspectionRoutingDetailsModel')  private qualityInspectionRoutingDetailsModel: Models.QualityInspectionRoutingDetailsModel,
    @Inject('qualityTestBillDetailsModel')  private qualityTestBillDetailsModel: Models.QualityTestBillDetails, // qps
    @Inject('pjdDetailsModel') private pjdDetailsModel: Models.PjdDetailsModel,
    @Inject('codeModel') private codeModel: Models.CodeModel,
   

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
                 attributes:["id","mpd_nbr","mpd_label","mpd_chr01","mpd_type"]
                })
            this.logger.silly("find specification details")
            return specification
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findSpecificationsBy(query: any): Promise<any> {
      try {
          const specifications = await this.specificationModel.findAll({
               where: query ,
              })
          this.logger.silly("find specification details")
          return specifications
      } catch (e) {
          this.logger.error(e)
          throw e
      }
  }

  public async getSpecifications(): Promise<any> {
    try {
      const specifications = await this.specificationModel.findAll({
        attributes: ['id','mp_nbr','mp_desc','mp_expire'],
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
      //console.log(data)
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

  public async getDocumentTriggers(): Promise<any> {
    try {
      const triggers = await this.codeModel.findAll({
        where: {code_fldname : "pj_trigger"},
        attributes: ["id", "code_value","code_desc"]
      });
      this.logger.silly('find triggers ');
      return triggers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getDocumentTriggersByProject(code_project : any): Promise<any> {
    try {
      const docs = await this.pjdDetailsModel.findAll({
        where:Sequelize.and(
          {pjd_nbr : code_project},
          {pjd_trigger : "launch"}
        ),
        attributes: ["mp_nbr"]
      });
      this.logger.silly('find docs ');
      return docs;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


   public async getSpecificationTestResult(query : any): Promise<any> {
     try {
       const specs = await this.specificationTestResultsModel.findAll({
         where : query
       });
       this.logger.silly('find specs ');
       return specs;
     } catch (e) {
       this.logger.error(e);
       throw e;
     }
   }


   public async findSpecification(query: any): Promise<any> {
    try {
      const specification = await this.specificationModel.findOne({ where: query });
      this.logger.silly('find one specification');
      return specification;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findQualityInspectionRouting(query: any): Promise<any> {
    try {
      const qualityInspection = await this.qualityInspectionRoutingDetailsModel.findOne({ where: query });
      this.logger.silly('find one qualityInspection');
      return qualityInspection;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findQualityInspectionRoutesBy(query: any): Promise<any> {
    try {
      const qualityInspection = await this.qualityInspectionRoutingDetailsModel.findAll({ where: query });
      this.logger.silly('find all quality inspection routes');
      return qualityInspection;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findItemSpecificationDetails(query: any): Promise<any> {
    try {
      const itemSpecDetails = await this.itemSpecificationDetailsModel.findAll({ where: query });
      this.logger.silly('find one itemSpecDetails');
      return itemSpecDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async createIp(data: any): Promise<any> {
    try {
      const ip = await this.specificationTestResultsModel.create({ ...data });
      this.logger.silly('ip created ', ip);
      return ip;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createIpds(data: any): Promise<any> {
    try {
      const ipds = await this.itemSpecificationDetailsModel.bulkCreate(data);
      this.logger.silly('ipds created ', ipds);
      return ipds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createQro(data: any): Promise<any> {
    try {
      const qro = await this.qualityInspectionRoutingDetailsModel.create({ ...data });
      this.logger.silly('qro created ', qro);
      return qro;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
  public async createQps(data: any): Promise<any> {
    try {
      const qps = await this.qualityTestBillDetailsModel.bulkCreate(data);
      this.logger.silly('qps created ', qps);
      return qps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllQros(): Promise<any> {
    try {
      const qros = await this.qualityInspectionRoutingDetailsModel.findAll({});
      this.logger.silly('qros found ', qros);
      return qros;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
