import { Service, Inject } from 'typedi';

@Service()
export default class sequenceService {
  constructor(@Inject('sequenceModel') private sequenceModel: Models.SequenceModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const sequence = await this.sequenceModel.create({ ...data });
      this.logger.silly('create sequence mstr');
      return sequence;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const sequence = await this.sequenceModel.findOne({ where: query });
      this.logger.silly('find one sequence mstr');
      return sequence;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const sequences = await this.sequenceModel.findAll({ where: query });
      this.logger.silly('find All sequences mstr');
      return sequences;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const sequence = await this.sequenceModel.update(data, { where: query });
      this.logger.silly('update one sequence mstr');
      return sequence;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const sequence = await this.sequenceModel.destroy({ where: query });
      this.logger.silly('delete one sequence mstr');
      return sequence;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // GET AGENDA EVENT SEQUENCE NUMBER
  public async getCRMEVENTSeqNB(): Promise<any> {
    try {
      const sequence = await this.sequenceModel.findOne({
        where: { seq_seq: 'CRM-EVENT' },
        attributes: ['seq_curr_val'],
      });

      let event_nb = sequence.dataValues.seq_curr_val;

      const update = await this.sequenceModel.increment('seq_curr_val', {
        by: 1,
        where: { seq_seq: 'CRM-EVENT' },
      });

      this.logger.silly('find one order ');
      return event_nb;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async upsert(query: any): Promise<any> {
    try {
      const seqq = await this.sequenceModel.sync({ force: true });
      const sequences = query.sequences;
      for (const seq of sequences) {
        const seqs = await this.sequenceModel.create(seq);
      }
      this.logger.silly('update one user mstr');
      return seqq;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
