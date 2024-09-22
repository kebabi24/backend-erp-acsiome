import { Service, Inject, Container } from "typedi"

@Service()
export default class TrainingcalenderService {
    constructor(
        @Inject("TrainingcalenderModel") private trainingcalenderModel: Models.TrainingcalenderModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const trainingcalender = await this.trainingcalenderModel.create({ ...data })
            this.logger.silly("create trainingcalender mstr")
            return trainingcalender
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const trainingcalender = await this.trainingcalenderModel.findOne({
                where: query,
            })
            this.logger.silly("find one trainingcalender mstr")
            return trainingcalender
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const trainingcalenders = await this.trainingcalenderModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All trainingcalenders mstr")
            return trainingcalenders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const trainingcalender = await this.trainingcalenderModel.update(data, {
                where: query,
            })
            this.logger.silly("update one trainingcalender mstr")
            return trainingcalender
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const trainingcalender = await this.trainingcalenderModel.destroy({
                where: query,
            })
            this.logger.silly("delete one trainingcalender mstr")
            return trainingcalender
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
