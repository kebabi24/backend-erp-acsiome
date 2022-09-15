import { Service, Inject } from "typedi"
import argon2 from 'argon2'
@Service()
export default class UserMobileService {
    constructor(
        @Inject("userMobileModel") private userMobileModel: Models.UserMobileModel,
        @Inject("profileMobileModel") private profileMobileModel: Models.Profile_menuModel,
        @Inject("roleModel") private roleModel: Models.RoleModel,
        @Inject("menuModel") private menuModel: Models.MenuModel,
        @Inject("profile_menuModel") private profile_menuModel: Models.Profile_menuModel,
        @Inject("serviceModel") private serviceModel: Models.ServiceModel,
        @Inject("itineraryModel") private itineraryModel: Models.ItineraryModel,
        @Inject("customerMobileModel") private customerMobileModel: Models.CustomerMobileModel,
        @Inject("itinerary_CustomerModel") private itineraryCustomerModel: Models.Itinerary_CustomerModel,
        @Inject("checklistModel") private checklistModel: Models.ChecklistModel,
        @Inject("role_itineraryModel") private role_itineraryModel: Models.Role_itineraryModel,
        @Inject("parameterModel") private parameterModel: Models.ParameterModel,
        @Inject("tokenSerieModel") private tokenSerieModel: Models.TokenSerieModel,
        @Inject("categoryModel") private categoryModel: Models.CategoryModel,
        @Inject("categoryTypeModel") private categoryTypeModel: Models.CategoryTypeModel,
        @Inject("clusterModel") private clusterModel: Models.ClusterModel,
        @Inject("subClusterModel") private subClusterModel: Models.SubClusterModel,
        @Inject("visitresultModel") private visitresultModel: Models.visitresultModel,
        @Inject("salesChannelModel") private salesChannelModel: Models.salesChannelModel,
        @Inject("logger") private logger
    ) {}


    // ******************** CREATE **************************
    public async create(data: any): Promise<any> {
        try {
            const password = await argon2.hash(data.password)
            const user = await this.userMobileModel.create({ ...data, password })
            this.logger.silly("user mobile created")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** FIND ONE  **************************
    public async findOne(query: any): Promise<any> {
        try {
            console.log( typeof query.username)
            const user = await this.userMobileModel.findOne({ where: query })
            this.logger.silly("find one user mobile")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** FIND **************************
    public async find(query: any): Promise<any> {
        try {
            const users = await this.userMobileModel.findAll({ where: query })
            this.logger.silly("find All users mstr")
            return users
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** UPDATE **************************
    public async update(data: any, query: any): Promise<any> {
        const password = await argon2.hash(data.password.value)
        try {
            const user = await this.userMobileModel.update({ ...data, password }, { where: query })
            this.logger.silly("update one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** UPDATED **************************
    public async updated(data: any, query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.update(data, {
                where: query,
            })
            this.logger.silly("update one tool mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** DELETE **************************
    public async delete(query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.destroy({ where: query })
            this.logger.silly("delete one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET ROLE **************************
    public async getRole(query: any): Promise<any> {
        try {
            const role = await this.roleModel.findOne({ where: query})
            return role.dataValues;
        } catch (e) {
            console.log('Error from service-getRole')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET PARAMETER **************************
    public async getParameter(query: any): Promise<any> {
        try {
            const parameter = await this.parameterModel.findOne({ where: query})
            return parameter.dataValues;
        } catch (e) {
            console.log('Error from service-getParameter')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET USER **************************
    public async getUser(query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.findOne({ where: query})

            return user.dataValues;
        } catch (e) {
            console.log('Error from service-getUser')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET PROFILE **************************
    public async getProfile(query: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.findOne({ where: query})
            return profile.dataValues;
        } catch (e) {
            console.log('Error from service-getProfile')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET MENUS **************************
    public async getMenus(query: any): Promise<any> {
        try {    
            const menusData = await this.profile_menuModel.findAll({
                where: query ,  
            })
            var menusCodes = []
            menusData.forEach(menu => {
                menusCodes.push(menu.dataValues.menu_code);
            });

            const menus = await this.menuModel.findAll({
                where: { menu_code : menusCodes}
            })

            const menusFinal =[]
            menus.forEach(menusData => {
                menusFinal.push(menusData.dataValues);
            });


            return menusFinal;
        } catch (e) {
            console.log('Error from service-getMenus')
            this.logger.error(e)
            throw e
        }
        this.logger.silly("find one user mstr")
    }

    // ******************** GET SERVICE **************************
    public async getService(query: any): Promise<any> {
        try {
            
                const service = await this.serviceModel.findOne({ where: query})
                return service.dataValues;
             
        } catch (e) {
            console.log('Error from service-getService')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET ITINERARY FROM SERVICE **************************
    public async getItineraryFromService(query: any): Promise<any> {
        try {
            const itinerary = await this.itineraryModel.findOne({ where: query})
            return itinerary.dataValues;
        } catch (e) {
            console.log('Error from service-getItinerary')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET ITINEREARY FROM ROLE_ITINERARY **************************
    public async getItineraryFromRoleItinerary(query: any): Promise<any>{
        try{
            const it = await this.role_itineraryModel.findOne({where : query})
            const itinerary_code = it.dataValues.itinerary_code
            const itinerary = await this.itineraryModel.findOne({ where: {itinerary_code  :itinerary_code }})
            
            return itinerary.dataValues;
        }catch(e){
            console.log('Error from service-getInineraryV2')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CUSTOMERS **************************
    public async getCustomers(query: any): Promise<any> {
        try {
            
            const customersCodesData = await this.itineraryCustomerModel.findAll({
                where: query,  
            })  

             var customersCodes = []
             customersCodesData.forEach(customer => {
                customersCodes.push(customer.dataValues.customer_code);
            });

            const customers = await this.customerMobileModel.findAll({
                where: { customer_code : customersCodes}
            })

            const customersFinal =[]
            customers.forEach(customer => {
                customersFinal.push(customer.dataValues);
            });


            return customersFinal;
        } catch (e) {
            console.log('Error from service-getCustomers')
            this.logger.error(e)
            throw e
        }
        this.logger.silly("find one user mstr")
    }

    // ******************** GET CHECKLIST **************************
    public async getChecklist(): Promise<any> {
        try {
            const checklistData = await this.checklistModel.findAll()
           

            const checklist = []
            checklistData.forEach(element => {
                checklist.push(element.dataValues)
            });
            
            return checklist
        } catch (e) {
            console.log('Error from service-getChecklist')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET ITINERARIES **************************
    public async getItineraries(query: any): Promise<any>{
        try{

            // getting itineraries data from role-itinerary table
            const itinerariesIdsData= await this.role_itineraryModel.findAll({
                where: query
            })

            // getting pure data
            const itinerariesCodes = []
            itinerariesIdsData.forEach(element => {
                itinerariesCodes.push(element.dataValues.itinerary_code, )
            });

           
            const itinerariesData = await this.itineraryModel.findAll({
                where :{
                    itinerary_code : itinerariesCodes
                }
            })
            
            const itineraries =  []
            itinerariesData.forEach(itinerary => {
                itineraries.push(itinerary.dataValues)
            });

            const customers = []
            
            for(const itinerary of itineraries ){
                const customer = await this.getCustomers({itinerary_code:itinerary.itinerary_code})
                
                customers.push( customer)
            }


            const response = []

            for (let i = 0; i < itineraries.length; i ++) {
                response.push({
                    'itinerary': itineraries[i],
                    'customers': customers[i]
                })
                
            }

            return response

        } catch (e) {
            console.log('Error from service-getItineraries')
            this.logger.error(e)
            throw e
        }
    }


    // ******************** GET TOKENSERIE **************************
    public async getTokenSerie(query: any): Promise<any> {
        try {
            
                const tokenSerie = await this.tokenSerieModel.findOne({ where: query})

                return tokenSerie.dataValues;
             
        } catch (e) {
            console.log('Error from service-getTokenSerie')
            this.logger.error(e)
            throw e
        }
    }

    
    // ******************** GET ITINERARIES ONLY**************************
    public async getItinerariesOnly(query: any): Promise<any>{
        try{

            // getting itineraries data from role-itinerary table
            const itinerariesIdsData= await this.role_itineraryModel.findAll({
                where: query
            })

            // getting pure data
            const itinerariesCodes = []
            itinerariesIdsData.forEach(element => {
                itinerariesCodes.push(element.dataValues.itinerary_code, )
            });

           
            const itinerariesData = await this.itineraryModel.findAll({
                where :{
                    itinerary_code : itinerariesCodes
                }
            })
            
            const itineraries =  []
            itinerariesData.forEach(itinerary => {
                itineraries.push(itinerary.dataValues)
            });

            return itineraries

        } catch (e) {
            console.log('Error from service-getItineraries')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET ITINERARIES CUSTOMERS **************************
    public async getItinerariesCustomers(query: any): Promise<any>{
        try{

            // getting itineraries data from role-itinerary table
            const itinerariesIdsData= await this.role_itineraryModel.findAll({
                where: query
            })

            // getting pure data
            const itinerariesCodes = []
            itinerariesIdsData.forEach(element => {
                itinerariesCodes.push(element.dataValues.itinerary_code)
            });

            const customersCodesData = await this.itineraryCustomerModel.findAll({
                where: {itinerary_code: itinerariesCodes},  
            })  

             var customersCodes = []
             customersCodesData.forEach(customer => {
                customersCodes.push(customer.dataValues);
            });

            return customersCodes

        } catch (e) {
            console.log('Error from service-getItineraries')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CUSTOMERS ONLY **************************
    public async getCustomersOnly(query: any): Promise<any>{
        try{

            // getting itineraries data from role-itinerary table
            const itinerariesIdsData= await this.role_itineraryModel.findAll({
                where: query
            })

            // getting pure data
            const itinerariesCodes = []
            itinerariesIdsData.forEach(element => {
                itinerariesCodes.push(element.dataValues.itinerary_code)
            });

           
            const itinerariesData = await this.itineraryModel.findAll({
                where :{
                    itinerary_code : itinerariesCodes
                }
            })
            
            const itineraries =  []
            itinerariesData.forEach(itinerary => {
                itineraries.push(itinerary.dataValues)
            });

            const customers = []
            
            for(const itinerary of itineraries ){
                const customer = await this.getCustomers({itinerary_code:itinerary.itinerary_code})
                
                customers.push( ...customer)
            }

            return customers

        } catch (e) {
            console.log('Error from service-getItineraries')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CATEGORIES  **************************
    public async getCategories(customers : any): Promise<any> {
        try {
            const categoriesCodes = []

            customers.forEach(customer => {
                if(categoriesCodes.indexOf(customer.category_code) === -1 ){
                    categoriesCodes.push(customer.category_code) 
                }
            });

            const categories = await this.categoryModel.findAll({
                where :{ category_code : categoriesCodes}
            })
        
            return categories
        } catch (e) {
            console.log('Error from controller : usermobile : getCAtegories')
            console.log('Error from service-getChecklist')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CATEGORIES TYPES  **************************
    public async getCategoriesTypes(customers : any): Promise<any> {
        try {
            const categoriesTypesCodes = []

            customers.forEach(customer => {
                if(categoriesTypesCodes.indexOf(customer.category_type_code) === -1 ){
                    categoriesTypesCodes.push(customer.category_type_code) 
                }
            });

            const categoriesTypes = await this.categoryTypeModel.findAll({
                where :{ category_type_code : categoriesTypesCodes}
            })
        
            return categoriesTypes
        } catch (e) {
            console.log('Error from controller : usermobile : getCategoriesTypes')
            console.log('Error from service-getChecklist')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CLUSTERS   **************************
     public async getClusters(customers : any): Promise<any> {
        try {
            const clustersCodes = []

            customers.forEach(customer => {
                if(clustersCodes.indexOf(customer.cluster_code) === -1 ){
                    clustersCodes.push(customer.cluster_code) 
                }
            });

            const clusters = await this.clusterModel.findAll({
                where :{ cluster_code : clustersCodes}
            })
        
            return clusters
        } catch (e) {
            console.log('Error from controller : usermobile : getCategoriesTypes')
            console.log('Error from service-getChecklist')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET SUB CLUSTERS   **************************
    public async getSubClusters(customers : any): Promise<any> {
        try {
            const subClustersCode = []

            customers.forEach(customer => {
                if(subClustersCode.indexOf(customer.sub_cluster_code) === -1 ){
                    subClustersCode.push(customer.sub_cluster_code) 
                }
            });

            const subClusters = await this.subClusterModel.findAll({
                where :{ sub_cluster_code : subClustersCode}
            })
        
            return subClusters
        } catch (e) {
            console.log('Error from controller : usermobile : getCategoriesTypes')
            console.log('Error from service-getChecklist')
            this.logger.error(e)
            throw e
        }
    }

  

    public async findAllClusters(query: any): Promise<any> {
        try {
            const clusters = await this.clusterModel.findAll({})
            this.logger.silly("clusters", clusters)
            return clusters
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllCategories(query: any): Promise<any> {
        try {
            const categories = await this.categoryModel.findAll({})
            this.logger.silly("categories", categories)
            return categories
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllSubClusters(query: any): Promise<any> {
        try {
            const subClusters = await this.subClusterModel.findAll({})
            this.logger.silly("sub clusters", subClusters)
            return subClusters
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllGategoryTypes(query: any): Promise<any> {
        try {
            const categoryTypes = await this.categoryTypeModel.findAll({})
            this.logger.silly("category types", categoryTypes)
            return categoryTypes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getSalesChannels(query: any): Promise<any> {
        try {
            const salesChannel = await this.salesChannelModel.findAll({})
            this.logger.silly("sales channel", salesChannel)
            return salesChannel
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

     // ******************** GET VISITLIST  **************************
     public async getVisitList(): Promise<any> {
        try {
            const visitresultData = await this.visitresultModel.findAll()
            
            const visititresult = []
            visitresultData.forEach(element => {
                visititresult.push(element.dataValues)
            });
            
            // console.log(visititresult)
            return visititresult
        } catch (e) {
            console.log('Error from service-getVisitlist')
            this.logger.error(e)
            throw e
        }
    }

   
}

