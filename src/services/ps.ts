import { Service, Inject } from 'typedi';
import sequelize from '../loaders/sequelize';
import { QueryTypes, Sequelize } from "sequelize"
import config from "../config"

@Service()
export default class psService {
  
  constructor(
    @Inject('psModel') private psModel: Models.PsModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const ps = await this.psModel.create({ ...data });
      this.logger.silly('create ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const ps = await this.psModel.findOne({ where: query, include: this.itemModel });
      this.logger.silly('find one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    const sequelize = new Sequelize(config.databaseURL, { logging: false })
    try {
      const pss = await this.psModel.findAll({
        where: query,
        include: this.itemModel,
        attributes: ['ps_parent', 'ps_comp', 'ps_qty_per'],
      });
      const t = await sequelize.query("SELECT ps_parent, ps_comp, ps_ref, ps_qty_per, ld_qty_oh FROM ps_mstr as P JOIN ld_det as L ON P.ps_comp = L.ld_part WHERE ps_parent = '10105'",  {
        type: QueryTypes.SELECT
      });
      console.log(t)
      this.logger.silly('find All pss mstr');

      return pss;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findQtyOnStock(query: any): Promise<any> {
    const sequelize = new Sequelize(config.databaseURL, { logging: false })
    try {
   
      const pss = await sequelize.query("SELECT ps_parent, ps_comp, ps_ref, ps_qty_per, ld_qty_oh FROM ps_mstr as P JOIN ld_det as L ON P.ps_comp = L.ld_part WHERE ps_parent = '10105'",  {
        type: QueryTypes.SELECT
      });
      this.logger.silly('find All pss mstr');

      return pss;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findby(query: any): Promise<any> {
    try {
      const pss = await this.psModel.findAll({
        where: query,
        include: this.itemModel,
      });
      this.logger.silly('find All pss mstr');

      return pss;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findAll(query: any): Promise<any> {
    try {
      const pss = await this.psModel.findAll({
        where: query,
        include: this.itemModel,
        
      });
      this.logger.silly('find All pss mstr');

      return pss;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(data: any, query: any): Promise<any> {
    try {
      const ps = await this.psModel.update(data, { where: query });
      this.logger.silly('update one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const ps = await this.psModel.destroy({ where: query });
      this.logger.silly('delete one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
