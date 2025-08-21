import { Service, Inject, Container } from "typedi"

@Service()
export default class AffectEquipementService {
    constructor(
        @Inject("affectEquipementModel")
        private affectEquipementModel: Models.AffectEquipementModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const Equipement = await this.affectEquipementModel.create({ ...data })
            this.logger.silly("create affect Equipement mstr")
            return Equipement
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const Equipement = await this.affectEquipementModel.findOne({
                where: query,
            })
            this.logger.silly("find one Equipement mstr")
            return Equipement
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const Equipements = await this.affectEquipementModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All Equipements mstr")
            return Equipements
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findspecial(query: any): Promise<any> {
        try {
            const Equipements = await this.affectEquipementModel.findAll(query)
            this.logger.silly("find All Equipements mstr")
            return Equipements
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const Equipement = await this.affectEquipementModel.update(data, {
                where: query,
            })
            this.logger.silly("update one Equipement mstr")
            return Equipement
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const Equipement = await this.affectEquipementModel.destroy({
                where: query,
            })
            this.logger.silly("delete one Equipement mstr")
            return Equipement
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
