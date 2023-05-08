import { Service, Inject, Container } from "typedi"

@Service()
export default class projectService {
    constructor(
        @Inject("projectModel") private projectModel: Models.ProjectModel,
        @Inject("pjdDetailsModel") private pjdDetailsModel: Models.PjdDetailsModel,
        @Inject("projectDetailModel") private projectDetailModel: Models.ProjectDetailModel,
        @Inject("affectEmployeModel") private affectEmployeModel: Models.AffectEmployeModel,
        @Inject('employeModel')private employeModel: Models.EmployeModel,
        @Inject("codeModel") private codeModel: Models.CodeModel,
        @Inject("projectAssetDownDetailsModel") private projectAssetDownDetailsModel: Models.projectAssetDownDetailsModel,
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

    public async createDocsDetails(data: any): Promise<any> {
        try {
            const details = await this.pjdDetailsModel.bulkCreate(data)
            this.logger.silly("create details")
            return details
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

    public async getProjectTypes(): Promise<any> {
        try {
            const project_types = await this.codeModel.findAll({
                where:{code_fldname :"pj_type" },
                attributes: ["id","code_value","code_desc"]
            })
            this.logger.silly("find project_types ")
            return project_types
        } catch (e) {
            this.logger.error(e)
            throw e
        }
      }

      public async findAllProjectDetails(query: any): Promise<any> {
        try {
            const project_details = await this.affectEmployeModel.findAll({
                where: query,
            })
            for(const emp of project_details ){
                console.log(emp.dataValues.pme_employe)
                const empData = await this.employeModel.findOne({
                    where :{emp_addr : emp.dataValues.pme_employe}
                })
                emp.dataValues.emp_fname = empData.dataValues.emp_fname
                emp.dataValues.emp_lname = empData.dataValues.emp_lname
                console.log(empData)
            };

            this.logger.silly("find All project_details ")
            return project_details
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllProjectDetailsByCode(query: any): Promise<any> {
        try {
            const project_details = await this.affectEmployeModel.findAll({
                where: query,
            })
            
            this.logger.silly("find All project_details ")
            return project_details
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createAssetDown(data: any): Promise<any> {
        try {
            const assetsDown = await this.projectAssetDownDetailsModel.bulkCreate(data)
            this.logger.silly("create assets down")
            return assetsDown
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getAssetDownTypes(): Promise<any> {
        try {
            const types = await this.codeModel.findAll({
                where:{code_fldname :"asset_down_type" },
                attributes: ["id","code_value","code_desc"]
            })
            this.logger.silly("find types ")
            return types
        } catch (e) {
            this.logger.error(e)
            throw e
        }
      }
}
