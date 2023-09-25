import { Service, Inject } from 'typedi';

@Service()
export default class printerService {
  constructor(
    @Inject('printerModel') private printerModel: Models.PrinterModel,
    @Inject('userPrinterModel') private userPrinterModel: Models.UserPrinterModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const pricelist = await this.printerModel.create({ ...data });
      this.logger.silly('create pricelist mstr');
      return pricelist;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const printers = await this.printerModel.findAll({ where: query });
      this.logger.silly('find All users mstr');
      return printers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findByPrinters(query: any): Promise<any> {
    try {
      const users = await this.userPrinterModel.findAll({ where: query });
      this.logger.silly('find All users mstr');
      return users;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // public async find(query: any): Promise<any> {
  //   try {
  //     const users = await this.userModel.findAll({ where: query });
  //     this.logger.silly('find All users mstr');
  //     return users;
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }

  public async affectPrinter(data: any): Promise<any> {
    try {
      const pricelist = await this.userPrinterModel.create({ ...data });
      this.logger.silly('create pricelist mstr');
      return pricelist;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
