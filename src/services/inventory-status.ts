import { Service, Inject, Container } from 'typedi';

@Service()
export default class inventoryStatusService {
  constructor(
    @Inject('inventoryStatusModel')
    private inventoryStatusModel: Models.InventoryStatusModel,

    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const inventoryStatus = await this.inventoryStatusModel.create({ ...data });
      this.logger.silly('create inventoryStatus mstr');
      return inventoryStatus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const inventoryStatus = await this.inventoryStatusModel.findOne({
        where: query,
      });
      this.logger.silly('find one inventoryStatus mstr');
      return inventoryStatus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const inventoryStatus = await this.inventoryStatusModel.findAll({
        where: query,
      });
      this.logger.silly('find All inventoryStatus mstr');
      return inventoryStatus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const inventoryStatus = await this.inventoryStatusModel.update(data, {
        where: query,
      });
      this.logger.silly('update one inventoryStatus mstr');
      return inventoryStatus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const inventoryStatus = await this.inventoryStatusModel.destroy({
        where: query,
      });
      this.logger.silly('delete one inventoryStatus mstr');
      return inventoryStatus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
