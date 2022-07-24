import { Service, Inject } from "typedi"
import customer from "../../api/controllers/customer";



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
        @Inject("logger") private logger
    ) {}

   

    public async getRole(query: any): Promise<any> {
        try {
            const role = await this.roleModel.findOne({ where: query})
            return role.dataValues;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    public async getParameter(query: any): Promise<any> {
        try {
            const parameter = await this.parameterModel.findOne({ where: {profileId : 1}})
            return parameter.dataValues;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    public async getUser(query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.findOne({ where: query})

            return user.dataValues;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    public async getProfile(query: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.findOne({ where: query})
            return profile.dataValues;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    public async getMenus(query: any): Promise<any> {
        try {
            // const menus = await this.menuModel.findAll({ 
            //     where:{ profileId : 1 },
            //     include:{
            //         model: this.profileMobileModel,
            //     }
               
            // })
            // const menus = await this.profile_menuModel.findAll({
            //     where:{profile_id :1},
            //     include: {
            //         model: this.menuModel,
            //         where:{
                        
            //         }
            //       }
            // })
            // const menus = await this.menuModel.findAll({
            //     where:{},
            //     include:{
            //         model : this.profile_menuModel,
            //          where :{
            //             profile_menu_id : 1
            //          },
            //         //  through: { attributes: [] }
            //     },
            // })
            const menusData = await this.profile_menuModel.findAll({
                where: query ,
                include:{
                    model : this.menuModel,
                }
            })
            var menusIDs = []
            menusData.forEach(menu => {
               menusIDs.push(menu.dataValues.menuId);
            });

            const menus = await this.menuModel.findAll({
                where: { menu_id : menusIDs}
            })

            const menusFinal =[]
            menus.forEach(menusData => {
                menusFinal.push(menusData.dataValues);
            });


            return menusFinal;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        this.logger.silly("find one user mstr")
    }

    public async getService(query: any, hold: Boolean): Promise<any> {
        try {
            
                const service = await this.serviceModel.findOne({ where: query})
                return service.dataValues;
             
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // from service 
    public async getItinerary(query: any): Promise<any> {
        try {
            const itinerary = await this.itineraryModel.findOne({ where: query})
            return itinerary.dataValues;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // from role_itinerary
    public async getItineraryV2(query: any): Promise<any>{
        try{
            const it = await this.role_itineraryModel.findOne({where : query})
            const itineraryId = it.dataValues.itineraryId
            const itinerary = await this.itineraryModel.findOne({ where: {itinerary_id :itineraryId }})
            // console.log(itinerary.dataValues)
            return itinerary.dataValues;
        }catch(e){
            this.logger.error(e)
            throw e
        }
    }

    public async getCustomers(query: any): Promise<any> {
        try {
            
            const customersIdsData = await this.itineraryCustomerModel.findAll({
                where: query,
                include:{
                    model : this.customerMobileModel,
                }
            })  

             var customersIDs = []
            customersIdsData.forEach(customer => {
               customersIDs.push(customer.dataValues.customerId);
            });

            const customers = await this.customerMobileModel.findAll({
                where: { customer_id : customersIDs}
            })

            const customersFinal =[]
            customers.forEach(customer => {
                customersFinal.push(customer.dataValues);
            });


            return customersFinal;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
        this.logger.silly("find one user mstr")
    }

    public async getChecklist(): Promise<any> {
        try {
            const checklistData = await this.checklistModel.findAll()
           

            const checklist = []
            checklistData.forEach(element => {
                checklist.push(element.dataValues)
            });
            
            return checklist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getItineraries(query: any): Promise<any>{
        try{

            // getting itineraries data from role-itinerary table
            const itinerariesIdsData= await this.role_itineraryModel.findAll({
                where: query
            })

            // getting pure data
            const itinerariesIds = []
            itinerariesIdsData.forEach(element => {
                itinerariesIds.push(element.dataValues.itineraryId)
            });

           
            const itinerariesData = await this.itineraryModel.findAll({
                where :{
                    itinerary_id : itinerariesIds
                }
            })
            
            const itineraries =  []
            itinerariesData.forEach(itinerary => {
                itineraries.push(itinerary.dataValues)
            });

            const customers = []
            
            for(const itinerary of itineraries ){
                const customer = await this.getCustomers({itineraryId:itinerary.itinerary_id})
                
                customers.push( customer)
            }

            console.log(customers)

            const response = []

            for (let i = 0; i < itineraries.length; i ++) {
                response.push({
                    'itinerary': itineraries[i],
                    'customers': customers[i]
                })
                
            }

            return response

        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}