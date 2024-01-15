import { Service, Inject } from "typedi"
import { Op, Sequelize } from 'sequelize';
import argon2 from 'argon2'
var Crypto = require('crypto');
@Service()
export default class UserMobileService {
    constructor(
        @Inject("userMobileModel") private userMobileModel: Models.UserMobileModel,
        @Inject("profileMobileModel") private profileMobileModel: Models.ProfileModel,
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
        @Inject("profileProductPageModel") private profileProductPageModel: Models.profileProductPageModel,
        @Inject("productPageModel") private productPageModel: Models.productPageModel,
        @Inject("productPageDetailsModel") private productPageDetailsModel: Models.productPageDetailsModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("loadRequestModel") private loadRequestModel: Models.loadRequestModel,
        @Inject("loadRequestLineModel") private loadRequestLineModel: Models.loadRequestLineModel,
        @Inject("loadRequestDetailsModel") private loadRequestDetailsModel: Models.loadRequestDetailsModel,
        @Inject("locationDetailModel") private locationDetailModel: Models.LocationDetailModel,
        @Inject("paymentMethodModel") private paymentMethodModel: Models.PayMethModel,
        @Inject("paymentModel") private paymentModel: Models.paymentModel,
        @Inject("cancelationReasonModel") private cancelationReasonModel: Models.cancelationReasonModel,
        @Inject("priceListModel") private priceListModel: Models.PricelistModel,
        @Inject("invoiceModel") private invoiceModel: Models.invoiceModel,
        @Inject("invoiceLineModel") private invoiceLineModel: Models.invoiceLineModel,
        @Inject("taxeModel") private taxeModel: Models.TaxeModel,
        @Inject("visitsModel") private visitsModel: Models.visitsModel,
        @Inject("inventoryModel") private inventoryModel: Models.InventoryModel,
        @Inject("inventoryLineModel") private inventoryLineModel: Models.InventoryLineModel,
        @Inject("messagesModel") private messagesModel: Models.messagesModel,
        @Inject("domainModel") private domainModel: Models.DomainModel,
        @Inject("barecodeInfosModel") private barecodeInfosModel: Models.barecodeInfosModel,

        
        @Inject("logger") private logger
    ) {}


    // ******************** CREATE **************************
     
    
    public async create(data: any): Promise<any> {
        try {
            var secret_key = 'fd85b494-aaaa';
            var secret_iv = 'smslt';
            var encryptionMethod = 'AES-256-CBC';
            var key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
            var iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);

           
            
            data.password = encrypt_string(data.password, encryptionMethod, key, iv);
            // console.log(encryptedPassword)
            const password = await argon2.hash(data.password)

            const newPassword = Crypto.createHash('md5','secret_key').update(data.password).digest("hex");

            console.log(newPassword)
            const user = await this.userMobileModel.create({ ...data })
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
            const parameter = await this.parameterModel.findAll({ where: query})
            
            return parameter;
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
            // console.log(' get user '+user.dataValues)
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
            const profile_code  = query['profile_code']
            var menusCodes = []
            menusData.forEach(menu => {
                menusCodes.push(menu.dataValues.menu_code);
            });

            const menus = await this.menuModel.findAll({
                where: { menu_code : menusCodes}
            })

            const menusFinal =[]
            menus.forEach(menusData => {
                menusFinal.push({...menusData.dataValues,profile_code});
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
            return service;
             
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

    // ****************************************************
    // ******** PHASE 2 ***********************************
    // ****************************************************

    // ******************** GET PRODUCT PAGES OF THE PROFILE **************************
    public async getProfileProductPages(query: any): Promise<any> {
        try {
            const productPagesCodes = []
            const profileProductPages = await this.profileProductPageModel.findAll({where: query})  
            profileProductPages.forEach(page => {
                productPagesCodes.push(page.product_page_code)
            });
            const productPages =   await this.productPageModel.findAll({where : {product_page_code :productPagesCodes}})
            productPages.forEach(productPage => {
                const product_page_code = productPage.product_page_code
                const index = profileProductPages.findIndex(object =>{
                    return object.product_page_code === product_page_code
                })
                // productPage.push(profileProductPages[index].rank)
                productPage.dataValues.rank = profileProductPages[index].rank 
            });
            return productPages;
        } catch (e) {
            console.log('Error from get profile product pages - service ')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET PRODUCT PAGES DETAILS  **************************
    public async getProductPagesDetails(productPages: any): Promise<any> {
        try {
            const productPagesCodes = []
            productPages.forEach(productPage => {
                productPagesCodes.push(productPage.product_page_code)
            });
            const productPagesDetails = await this.productPageDetailsModel.findAll({ where: {product_page_code:productPagesCodes}})  
            return productPagesDetails;
        } catch (e) {
            console.log('Error from get getProductPagesDetails - service ')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

      // ******************** GET PRODUCT PAGES DETAILS  **************************
      public async getProducts(productPagesDetails: any): Promise<any> {
        try {
            const productsCodes = []
            productPagesDetails.forEach(productPage => {
                productsCodes.push(productPage.product_code)
            });
            const products = await this.itemModel.findAll(
                
                { 
                    where: {
                         pt_part : productsCodes,
                        //  [Op.or]:[ 
                        //      {pt_salable :  true},
                        //      {pt_inventoryable : true},
                        //      {pt_consignable : true},
                        //      {pt_returnable : true},
                        //      {pt_orderable : true},
                        //      {pt_loadable : true},
                        //      {pt_promotion : true}      
                        //  ]
                    },
                    attributes: ['id', 'pt_part' ,'pt_desc1','pt_taxable','pt_taxc','pt_group',
                    'pt_rev','pt_status','pt_price','pt_part_type','pt_size','pt_size_um',
                    'pt_net_wt','pt_net_wt_um','pt_article','pt_loadpacking','pt_salepacking','pt_rollup',
                    'pt_salable','pt_inventoryable','pt_consignable','pt_returnable','pt_orderable','pt_loadable','pt_promotion']
                    },
                ) 
                
                for(const product of products){
                    const tax_value = await this.taxeModel.findOne({where :{tx2_tax_code:product.pt_taxc},attributes:['tx2_tax_pct']})
                     product.dataValues.tax_pct = +tax_value.dataValues.tx2_tax_pct
                   
                   
                
                }
            return products;
        } catch (e) {
            console.log('Error from getProducts - service ')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** GET PRODUCT PAGES DETAILS  **************************
     public async getProductsOfPromo(): Promise<any> {
        try {
            
            const products = await this.itemModel.findAll(
                
                { 
                    where: {
                         [Op.or]:[ 
                             {pt_salable :  true},
                             {pt_inventoryable : true},
                             {pt_consignable : true},
                             {pt_returnable : true},
                             {pt_orderable : true},
                             {pt_loadable : true},
                             {pt_promotion : true}      
                         ]
                    },
                    attributes: ['id', 'pt_part' ,'pt_desc1','pt_taxable','pt_taxc','pt_group',
                    'pt_rev','pt_status','pt_price','pt_part_type','pt_size','pt_size_um',
                    'pt_net_wt','pt_net_wt_um','pt_article','pt_loadpacking','pt_salepacking','pt_rollup',
                    'pt_salable','pt_inventoryable','pt_consignable','pt_returnable','pt_orderable','pt_loadable','pt_promotion']
                    },
                ) 
                
                
            return products;
        } catch (e) {
            console.log('Error from getProducts - service ')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** GET LOAD REQUEST **************************
     public async getLoadRequest(query: any): Promise<any> {
        try {
            const loadRequests = await this.loadRequestModel.findAll({ where: query})

            return loadRequests;
        } catch (e) {
            console.log('Error from service user mobile- load request')
            this.logger.error(e)
            throw e
        }
        this.logger.silly("find load requests ")
    }

    // ******************** GET LOAD REQUEST LINES **************************
    public async getLoadRequestLines(loadRequests: any): Promise<any> {
        try {
            const loadRequestsCodes = []
            loadRequests.forEach(loadReuquest => {
                loadRequestsCodes.push(loadReuquest.load_request_code)
            });
            const loadRequestsLines = await this.loadRequestLineModel.findAll({ where: {load_request_code:loadRequestsCodes}})

            return loadRequestsLines;
        } catch (e) {
            console.log('Error from service user mobile- load request lines')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET LOAD REQUEST DETAILS **************************
    public async getLoadRequestDetails(loadRequests: any): Promise<any> {
        try {
            const loadRequestsCodes = []
            loadRequests.forEach(loadReuquest => {
                loadRequestsCodes.push(loadReuquest.load_request_code)
            });
            const loadRequestsDetails = await this.loadRequestDetailsModel.findAll({ where: {load_request_code:loadRequestsCodes}})

            return loadRequestsDetails;
        } catch (e) {
            console.log('Error from service user mobile- load request details')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET PRODUCT PAGES DETAILS  **************************
    public async getLocationDetail(ld_loc: any, ld_site): Promise<any> {
        try {
           
            const locationDetail = await this.locationDetailModel.findAll(
                
                { 
                    where: {
                        ld_loc : ld_loc , ld_site : ld_site
                    },
                    attributes: ['id','ld_loc','ld_site', 'ld_part' ,'ld_qty_oh','ld_lot','ld_expire']  
                },
                )  
            return locationDetail;
        } catch (e) {
            console.log('Error from getLocationDetail - service ')
            this.logger.error(e)
            throw e
        }
        // this.logger.silly("find one user mstr")
    }

    // ******************** GET PAYMENT METHOD  **************************
    public async getPaymentMethods(): Promise<any> {
        try {
           
            const paymentMethods = await this.paymentMethodModel.findAll()
            return paymentMethods
        } catch (e) {
            console.log('Error from service- getPaymentMethods')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET PAYMENT BY CUSTOMERS CODES  **************************
    public async getPayments(): Promise<any> {
        try {
            const payment = await this.paymentModel.findAll()
            return payment
        } catch (e) {
            console.log('Error from service- getPayments')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET PAYMENT BY   **************************
    public async getPaymentsBy(query:any): Promise<any> {
        try {
            const payment = await this.paymentModel.findAll({ where: query,
            
            });
            return payment
        } catch (e) {
            console.log('Error from service- getPayments')
            this.logger.error(e)
            throw e
        }
    }
    public async getPaymentsByGroup(query:any): Promise<any> {
        try {
            const payment = await this.paymentModel.findAll( query);
            return payment
        } catch (e) {
            console.log('Error from service- getPayments')
            this.logger.error(e)
            throw e
        }
    }
    // ******************** GET CANCELATION REASONS   **************************
    public async getCancelationReasons(): Promise<any> {
        try {
            const cancelation_reasons = await this.cancelationReasonModel.findAll()
            return cancelation_reasons
        } catch (e) {
            console.log('Error from service- getCancelationReasons')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET PRICELIST    **************************
    public async getPriceList(): Promise<any> {
        try {
            const price_list = await this.priceListModel.findAll()
            return price_list
        } catch (e) {
            console.log('Error from service- getPriceList')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET INVOICE    **************************
    public async getInvoice(): Promise<any> {
        try {
            const invoice = await this.invoiceModel.findAll({where :{closed : false}})
            return invoice
        } catch (e) {
            console.log('Error from service- getInvoice')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET INVOICE LINE    **************************
    public async getInvoiceLine(): Promise<any> {
        try {
            const invoice_line = await this.invoiceLineModel.findAll()
            return invoice_line
        } catch (e) {
            console.log('Error from service- getInvoiceLine')
            this.logger.error(e)
            throw e
        }
    }
    // ******************** GET INVOICE LINE query   **************************
    public async getInvoiceLineBy(query: any): Promise<any> {
        try {
            const invoice_line = await this.invoiceLineModel.findAll(query)
            return invoice_line
        } catch (e) {
            console.log('Error from service- getInvoiceLine')
            this.logger.error(e)
            throw e
        }
    }

     
// ******************** GET ALL INVOICE     **************************
    public async getAllInvoice(query: any): Promise<any> {
        try {
            const invoice = await this.invoiceModel.findAll(query)
            return invoice
        } catch (e) {
            console.log('Error from service- getInvoice')
            this.logger.error(e)
            throw e
        }
    }

    
    
    // ******************** UPDATE ONE CUSTOMER **************************



    public async updateCustomer(data: any, query: any): Promise<any> {
        try {
            if(data.id){
                delete data.id 
            }
            const customer = await this.customerMobileModel.update(data, {
                where: query,
            })
            this.logger.silly("updated one mobile customer mstr")
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE ONE CUSTOMER **************************
    public async createCustomer(data: any): Promise<any> {
        try {
            const customer = await this.customerMobileModel.create(data)
            this.logger.silly("created one mobile customer mstr")
            return customer
        } catch (e) {
            console.log("error service : createCustomer")
            this.logger.error(e)
            throw e
        }
    }

    // ******************** UPDATE ONE SERVICE **************************
    public async updateService(data: any, query: any): Promise<any> {
        try {
            const service = await this.serviceModel.update(data, {
                where: query,
            })
            this.logger.silly("updated one service  mstr")
            return service
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE ONE SERVICE **************************
    public async createService(data: any): Promise<any> {
        try {
            const service = await this.serviceModel.create(data)
            this.logger.silly("created one service ")
            return service
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

     // ******************** UPDATE ONE TOKEN **************************
     public async updateTokenSerie(data: any, query: any): Promise<any> {
        try {
            if(data.id){
                delete data.id 
            }
            const token = await this.tokenSerieModel.update(data, {
                where: query,
            })
            this.logger.silly("updated one token mstr")
            return token
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    
     // ******************** CREATE VISITS **************************
     public async createVisits(data: any): Promise<any> {
        try {
            data.forEach(element => {
                delete element.id
            });
            const visits = await this.visitsModel.bulkCreate(data)
            this.logger.silly("created visits")
            return visits
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE INVOICES    **************************
    public async createInvoices(data : any): Promise<any> {
        try {
            data.forEach(element => {
                // console.log(element)
                if(element.id) delete element.id
                // element.due_amount = element.dueamout 
                //    element.period_active_day = element.periode_active_date 
            //    element.progress_level = element.progresslevel 
                //    element.the_date = element.thedate 
            //    delete element.dueamount
            //    delete element.periode_active_date
            //    delete element.progress_level
            //    delete element.thedate
               delete element.MAJ
            });
            const invoices = await this.invoiceModel.bulkCreate(data)
            return invoices
        } catch (e) {
            console.log('Error from service- createInvoices')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE INVOICES LINES    **************************
    public async createInvoicesLines(data : any): Promise<any> {
        try {
            data.forEach(element => {
               if(element.id) delete element.id
            });
            const invoices = await this.invoiceLineModel.bulkCreate(data)
            return invoices
        } catch (e) {
            console.log('Error from service- createInvoicesLines')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** UPDATE ONE INVOICE **************************
    public async updateInvoice(data: any, query: any): Promise<any> {
        try {
            const invoice = await this.invoiceModel.update(data, {
                where: query,
            })
            this.logger.silly("updated one invoice  mstr")
            return invoice
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE INVENTORIES   **************************
    public async createInventories(data : any): Promise<any> {
        try {
            data.forEach(element => {
               if(element.id) delete element.id
            });
            const inventories = await this.inventoryModel.bulkCreate(data)
            return inventories
        } catch (e) {
            console.log('Error from service- createInvoicesLines')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** CREATE INVENTORIES LINES  **************************
    public async createInventoriesLines(data : any): Promise<any> {
        try {
            data.forEach(element => {
               if(element.id) delete element.id
            });
            const inventoriesLines = await this.inventoryLineModel.bulkCreate(data)
            return inventoriesLines
        } catch (e) {
            console.log('Error from service- createInventoriesLines')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** CREATE PAYMENTS  **************************
     public async createPayments(data : any): Promise<any> {
        try {
            data.forEach(element => {
               if(element.id) delete element.id
            });
            const payments = await this.paymentModel.bulkCreate(data)
            return payments
        } catch (e) {
            console.log('Error from service- createPayments')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** UPDATE CREATE LOCATION DETAILS  **************************
     public async updateCreateLocationDetails(data : any): Promise<any> {
        try {
            var locationCreated =[];
            for(const element of data){
               if(element.id) delete element.id
               const ld_site = element.ld_site
               const ld_loc = element.ld_loc
               const ld_part = element.ld_part 
               const ld_lot = element.ld_lot


               const exist = await this.locationDetailModel.findOne({
                where:{ld_site : ld_site , ld_loc : ld_loc , ld_lot : ld_lot ,ld_part : ld_part} 
               })

               if(exist){
                // UPDATE
                
                const location = await this.locationDetailModel.update(element, {
                    where: {ld_site : element.ld_site , ld_loc : ld_loc , ld_lot : ld_lot ,ld_part : ld_part},
                })

               }else{
                // CREATE
                const location = await this.locationDetailModel.create(element)
                locationCreated.push(location)
               } 

            };
            return locationCreated;
        } catch (e) {
            console.log('Error from service- updateCreateLocationDetails')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** GET PAYMENT METHOD  **************************
     public async getMessages(role_code : any): Promise<any> {
        try {
            const messages = await this.messagesModel.findAll({
                where:{
                    role_code : role_code
                }
            })
            return messages
        } catch (e) {
            console.log('Error from etMessages')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET DOMAIN  **************************
    public async getDomain(query : any): Promise<any> {
        try {
            const domain = await this.domainModel.findOne({
                where:query
            })
            return domain
        } catch (e) {
            console.log('Error from getDomain')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** CREATE ONE CUSTOMER **************************
     public async createCustomerItinerary(data: any): Promise<any> {
        try {
            const custItin = await this.itineraryCustomerModel.create(data)
            this.logger.silly("created one customerItinerary")
            return custItin
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


     

    // ******************** GET SERVICES **************************
    public async getServices(startDate: any , endDate : any): Promise<any> {
        try {
            
                const services = await this.serviceModel.findAll({ where:
                     Sequelize.and(
                    // {del_comp  :{[Op.not]: "null"}},
                    { service_period_activate_date: { [Op.gte]: new Date(startDate) } },
                    { service_period_activate_date: { [Op.lte]: new Date(endDate) } },
                  ),})
                return services;
             
        } catch (e) {
            console.log('Error from getServices')
            this.logger.error(e)
            throw e
        }
    }

     // ******************** GET SERVICES **************************
     public async getInvoices(startDate: any , endDate : any , attributes : any): Promise<any> {
        try {
            const invoices = await this.invoiceModel.findAll({ where:
                Sequelize.and(
                    { period_active_date: { [Op.gte]: new Date(startDate) } },
                    { period_active_date: { [Op.lte]: new Date(endDate) } },
                    ),
                
                attributes :attributes
                 })
                return invoices;
             
        } catch (e) {
            console.log('Error from getInvoices')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CUSTOMERS **************************
    public async getCustomerBy(query: any): Promise<any> {
        try {
            
            const customer = await this.customerMobileModel.findOne({
                where: query,  
            })  

            return customer;
        } catch (e) {
            console.log('Error from service-getCustomerBy')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET INVOICE LINE WITH SELECTED FIELDS query   **************************
    public async getInvoiceLineByWithSelectedFields(query: any , attributes : any): Promise<any> {
        try {
            const invoice_line = await this.invoiceLineModel.findAll({
                query,
                attributes :attributes
            })
            return invoice_line
        } catch (e) {
            console.log('Error from service- getInvoiceLine')
            this.logger.error(e)
            throw e
        }
    }

    public async getPaymentsByDates(startDate: any , endDate : any , attributes : any): Promise<any> {
        try {
            const payments = await this.paymentModel.findAll({ where:
                Sequelize.and(
                    { the_date: { [Op.gte]: new Date(startDate) } },
                    { the_date: { [Op.lte]: new Date(endDate) } },
                    ),
                
                  attributes :attributes
                 })
                return payments;
             
        } catch (e) {
            console.log('Error from getPaymentsByDates')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET PRODUCT PAGES DETAILS  **************************
    public async getProductType(product_code: any): Promise<any> {
        try {
            
            const products = await this.itemModel.findOne(
                
                { 
                    where: {
                        pt_part : product_code,
                        
                    },
                    attributes: ['pt_part_type']
                    },
                ) 
                
            return products;
        } catch (e) {
            console.log('Error from getProductType - service ')
            this.logger.error(e)
            throw e
        }
    }


    public async findAllBarCodes(): Promise<any> {
        try {
            const barCodes = await this.barecodeInfosModel.findAll({ })
            this.logger.silly("find All barCodes ")
            return barCodes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
    

   
}



function encrypt_string(plain_text, encryptionMethod, secret, iv) {
    var encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv);
    var aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64');
  };
