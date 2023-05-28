import { Service, Inject } from 'typedi';

@Service()
export default class printerService {
  constructor(@Inject('printerModel') private printerModel: Models.PrinterModel, @Inject('logger') private logger) {}

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
}
