import { Service, Inject, Container } from "typedi"

@Service()
export default class projectService {
    constructor(
        @Inject("projectModel")
        private projectModel: Models.ProjectModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const project = await this.projectModel.create({ ...data })
            this.logger.silly("create project mstr")
            return project
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const project = await this.projectModel.findOne({
                where: query,
            })
            this.logger.silly("find one project mstr")
            return project
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const projects = await this.projectModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All projects mstr")
            return projects
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const project = await this.projectModel.update(data, {
                where: query,
            })
            this.logger.silly("update one project mstr")
            return project
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const project = await this.projectModel.destroy({
                where: query,
            })
            this.logger.silly("delete one project mstr")
            return project
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
