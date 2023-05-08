import { Service, Inject } from 'typedi';

@Service()
export default class inventoryStatusMouvementService {
  constructor(
    @Inject('inventoryStatusMouvementsModel') private inventoryStatusMouvementModel: Models.InventoryStatusMouvementModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const inventoryStatusMouvement = await this.inventoryStatusMouvementModel.create({ ...data });
      this.logger.silly('create inventoryStatusMouvement mstr');
      return inventoryStatusMouvement;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const inventoryStatusMouvement = await this.inventoryStatusMouvementModel.findOne({ where: query });
      this.logger.silly('find one inventoryStatusMouvement mstr');
      return inventoryStatusMouvement;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const requisitionMouvements = await this.inventoryStatusMouvementModel.findAll({ where: query });
      this.logger.silly('find All requisitionMouvements mstr');
      return requisitionMouvements;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const inventoryStatusMouvement = await this.inventoryStatusMouvementModel.update(data, { where: query });
      this.logger.silly('update one inventoryStatusMouvement mstr');
      return inventoryStatusMouvement;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const inventoryStatusMouvement = await this.inventoryStatusMouvementModel.destroy({ where: query });
      this.logger.silly('delete one inventoryStatusMouvement mstr');
      return inventoryStatusMouvement;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async upsert(query: any): Promise<any> {
    try {
      const is = await this.inventoryStatusMouvementModel.sync({ force: true });
      const isd = query.isdd;
      for (const u of isd) {
        const utilis = await this.inventoryStatusMouvementModel.create(u);
      }
      this.logger.silly('update one code mstr');
      return is;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
