import UserMobileService from '../../services/user-mobile';
import LoadRequestService from "../../services/load-request"
import UnloadRequestService from "../../services/unload-request"
import RoleService from '../../services/role';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import Payment from '../../models/mobile_models/payment';
import {Op, Sequelize } from 'sequelize';
import CryptoJS from '../../utils/CryptoJS';
import PromotionService from '../../services/promotion';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// ********************** CREATE NEW USER MOBILE *************

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { username } = req.headers;
  logger.debug('Calling Create user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const user = await userMobileServiceInstance.create({
      ...req.body,
      // created_by:username,
      // created_ip_adr: req.headers.origin,
      // last_modified_by:username,
      // last_modified_ip_adr: req.headers.origin
    });
    return res.status(201).json({ message: 'created succesfully', data: user });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ********************** FIND ONE USER MOBILE BY CODE *************
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    const { user_mobile_code } = req.params;
    const user = await userMobileServiceInstance.findOne({ user_mobile_code: user_mobile_code });

    return res.status(200).json({ message: 'fetched succesfully', data: user });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ********************** FIND ALL USERS *************
const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const users = await userMobileServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: users });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ***************************************************
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const users = await userMobileServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: users });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ***************************************************
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one by  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const users = await userMobileServiceInstance.findOne({ ...req.body });
    //console.log(users)
    return res.status(200).json({ message: 'fetched succesfully', data: users });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ***************************************************
const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const RoleServiceInstance = Container.get(RoleService);
    const users = await userMobileServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: users });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// *********************** UPDATE ONE FIELD  ********************
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const { user_mobile_code } = req.params;
    const user = await userMobileServiceInstance.update(
      {
        ...req.body,
        //last_modified_by:user_code,
        // last_modified_ip_adr: req.headers.origin
      },
      { user_mobile_code: user_mobile_code },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: user });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

//****************** UPDATE EVERYTHING ************************
const updated = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const { user_mobile_code } = req.params;
    const user = await userMobileServiceInstance.updated(
      {
        ...req.body,
        //  last_modified_by:user_code,
        //  last_modified_ip_adr: req.headers.origin
      },
      { user_mobile_code: user_mobile_code },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: user });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

//****************** DELETE USER BY CODE ************************
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const { user_mobile_code } = req.params;
    const user = await userMobileServiceInstance.delete({ user_mobile_code: user_mobile_code });
    return res.status(200).json({ message: 'deleted succesfully', data: user_mobile_code });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

//****************** SYNC ************************
const signin = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling user mobile login endpoint');

  const userMobileServiceInstanse = Container.get(UserMobileService);
  const promoServiceInstanse = Container.get(PromotionService);

  try {
    // const role_code = req.body.role_code;
    const device_id = req.body.device_id;
    // const role = await userMobileServiceInstanse.getRole({ role_code: role_code });
    const role = await userMobileServiceInstanse.getRole({ device_id: device_id });
    console.log(role)
    // if the role id doesn't exist
    if (!role) {
      return res.status(404).json({ message: 'No role exist with such an id ' });
    } else {
      // these data is the same for both response cases

      const user_mobile_code = role.user_mobile_code;
      const userMobile = await userMobileServiceInstanse.getUser({ user_mobile_code: user_mobile_code });
      var users =[];
      var profiles = [];
      console.log(user_mobile_code)
      const profile = await userMobileServiceInstanse.getProfile({ profile_code: userMobile.profile_code });
      const menus = await userMobileServiceInstanse.getMenus({ profile_code: userMobile.profile_code });
      const parameter = await userMobileServiceInstanse.getParameter({ profile_code: userMobile.profile_code });
      const checklist = await userMobileServiceInstanse.getChecklist();
      const visitList = await userMobileServiceInstanse.getVisitList();
      const cancelationReasons = await userMobileServiceInstanse.getCancelationReasons();
      const priceList = await userMobileServiceInstanse.getPriceList();
      const invoice = await userMobileServiceInstanse.getInvoice();
      const invoiceLine = await userMobileServiceInstanse.getInvoiceLine();
      const paymentMethods = await userMobileServiceInstanse.getPaymentMethods()
      const messages = await userMobileServiceInstanse.getMessages(role.role_code)
      var role_controller = {};
      var profile_controller = {};

      const domain  = await userMobileServiceInstanse.getDomain({dom_domain : role.role_domain})

      const promos = await promoServiceInstanse.getValidePromos(role.role_site)
      let adv_codes = [], pop_a_codes = [] , pop_c_codes = []
      
      promos.forEach(promo => {
        adv_codes.push(promo.adv_code)
        pop_a_codes.push(promo.pop_a_code)
        pop_c_codes.push(promo.pop_c_codes)
      });
      const advantages = await promoServiceInstanse.getAdvantagesByCodes(adv_codes)
      const populationsArticle = await promoServiceInstanse.getPopsArticleByCodes(pop_a_codes)

      
      if(role['controller_role']!=null && role['controller_role'].length != 0){
          role_controller = await userMobileServiceInstanse.getUser({user_mobile_code:role['controller_role']})
          profile_controller = await userMobileServiceInstanse.getProfile({profile_code :role_controller['profile_code'] })
          const controller_menus = await userMobileServiceInstanse.getMenus({profile_code:role_controller['profile_code']})
          menus.push(...controller_menus)
      }

      if(role['controller_role']!=null && role['controller_role'].length != 0){
          users.push(userMobile,role_controller)
          profiles.push(profile,profile_controller)
      }else{
          users.push(userMobile)
          profiles.push(profile)
      }
      
      // INDEX OF : PARAMETER = SERVICE
      const index = parameter.map(elem => elem.parameter_code).indexOf('service')
      

      const productPages = await userMobileServiceInstanse.getProfileProductPages({
        profile_code: userMobile.profile_code,
      });
      const productPagesDetails = await userMobileServiceInstanse.getProductPagesDetails(productPages);
      const products = await userMobileServiceInstanse.getProducts(productPagesDetails);
      const loadRequest = await userMobileServiceInstanse.getLoadRequest({user_mobile_code: user_mobile_code, status: 40});
      const loadRequestsLines = await userMobileServiceInstanse.getLoadRequestLines(loadRequest);
      const loadRequestsDetails = await userMobileServiceInstanse.getLoadRequestDetails(loadRequest);
      
      const locationDetail = await userMobileServiceInstanse.getLocationDetail(role.role_loc, role.role_site);

      // FORMAT DATE 
      // LOAD REQUEST
      if(loadRequest.length > 0 ){
        loadRequest.forEach(load => {
          load.dataValues.date_creation = formatDateOnlyFromBackToMobile(load.date_creation)
           if(load.dataValues.date_charge != null )load.date_charge = formatDateFromBackToMobile(load.date_charge)
        });
      }
      // LOAD REQUEST LINE
      if(loadRequestsLines.length > 0 ){
        loadRequestsLines.forEach(load => {
          load.dataValues.date_creation = formatDateOnlyFromBackToMobile(load.date_creation)
           if(load.dataValues.date_charge != null )load.date_charge = formatDateFromBackToMobile(load.date_charge)
        });
      }
      // LOAD REQUEST DETAILS
      if(loadRequestsDetails.length > 0 ){
      
        loadRequestsDetails.forEach(load => {
          const date = load.date_expiration
          // load.date_expiration = formatDateOnlyFromBackToMobile(date)
        });
      }
      // LOCATION DETAILS
      if(locationDetail.length > 0 ){
        locationDetail.forEach(ld => {
          ld.dataValues.ld_expire = formatDateOnlyFromBackToMobile(ld.ld_expire)
        });
      }
      // INVOICE
      if(invoice.length > 0 ){
        invoice.forEach(invoice => {
          invoice.dataValues.the_date = formatDateFromBackToMobile(invoice.dataValues.the_date)
          invoice.dataValues.period_active_date = formatDateOnlyFromBackToMobile(invoice.period_active_date)
        });
      }
      // INVENTORY
      // if(invoice.length > 0 ){
      //   locationDetail.forEach(invoice => {
      //     invoice.dataValues.the_date = formatDateFromBackToMobile(invoice.the_date)
      //     invoice.dataValues.period_active_date = formatDateOnlyFromBackToMobile(invoice.period_active_date)
      //   });
      // }
      
      // ADD SERVICE TOO 



      // service created on backend
      if (parameter[index].hold === true) {
        const service = await userMobileServiceInstanse.getService({ role_code: role.role_code });
        // UPDATE SERVICE DATES
        if(service){
          service.service_period_activate_date = formatDateOnlyFromBackToMobile(service.service_period_activate_date)
          service.service_creation_date = formatDateFromBackToMobile(service.service_creation_date)
          service.service_closing_date = formatDateFromBackToMobile(service.service_closing_date)
        }

        const itinerary2 = await userMobileServiceInstanse.getItineraryFromRoleItinerary({ role_code: role.role_code });
        const customers = await userMobileServiceInstanse.getCustomers({ itinerary_code: itinerary2.itinerary_code });
        const tokenSerie = await userMobileServiceInstanse.getTokenSerie({ token_code: role.token_serie_code });  
        const categories = await userMobileServiceInstanse.findAllCategories({});
        const categoriesTypes = await userMobileServiceInstanse.findAllGategoryTypes({});
        const clusters = await userMobileServiceInstanse.findAllClusters({});
        const subClusters = await userMobileServiceInstanse.findAllSubClusters({});
        const salesChannels = await userMobileServiceInstanse.getSalesChannels({});

        return res.status(202).json({
          message: 'Data correct !',
          service_creation: parameter[index].hold,
          // user_mobile: userMobile,
          users:users,
          parameter: parameter,
          role: role,
          profile: profile,
          profiles: profiles,
          menus: menus,
          service: service,
          itinerary: itinerary2,
          customers: customers,
          checklist: checklist,
          token_serie: tokenSerie,
          categories: categories,
          categoriesTypes: categoriesTypes,
          clusters: clusters,
          subClusters: subClusters,
          visitList: visitList,
          salesChannels: salesChannels,
          cancelationReasons:cancelationReasons,
          priceList:priceList,
          invoice :invoice,
          invoiceLine : invoiceLine,
          productPages: productPages,
          productPagesDetails: productPagesDetails,
          products: products,
          loadRequest: loadRequest,
          loadRequestsLines: loadRequestsLines,
          loadRequestsDetails: loadRequestsDetails,
          locationDetail: locationDetail,
          paymentMethods:paymentMethods,
          messages:messages,
          domain:domain,
          promos : promos , 
          advantages : advantages , 
          populationsArticle : populationsArticle
        });
      }
      // service created by mobile user
      else {
        
        const iitineraries = await userMobileServiceInstanse.getItinerariesOnly({ role_code: role.role_code });
        const iitineraries_customers = await userMobileServiceInstanse.getItinerariesCustomers({
          role_code: role.role_code,
        });
        const customers = await userMobileServiceInstanse.getCustomersOnly({ role_code: role.role_code });
        const tokenSerie = await userMobileServiceInstanse.getTokenSerie({ token_code: role.token_serie_code });
        const categories = await userMobileServiceInstanse.findAllCategories({});
        const categoriesTypes = await userMobileServiceInstanse.findAllGategoryTypes({});
        const clusters = await userMobileServiceInstanse.findAllClusters({});
        const subClusters = await userMobileServiceInstanse.findAllSubClusters({});
        const salesChannels = await userMobileServiceInstanse.getSalesChannels({});

        return res.status(202).json({
          message: 'Data correct !',
          service_creation: parameter[index].hold,
          // user_mobile: userMobile,
          users:users,
          parameter: parameter,
          role: role,
          profile: profile,
          profiles: profiles,
          menus: menus,
          checklist: checklist,
          itinerary: iitineraries,
          iitineraries_customers: iitineraries_customers,
          customers: customers,
          token_serie: tokenSerie,
          categories: categories,
          categoriesTypes: categoriesTypes,
          clusters: clusters,
          subClusters: subClusters,
          visitList: visitList,
          salesChannels: salesChannels,
          cancelationReasons:cancelationReasons,
          priceList:priceList,
          invoice :invoice,
          invoiceLine : invoiceLine,
          productPages: productPages,
          productPagesDetails: productPagesDetails,
          products: products,
          loadRequest: loadRequest,
          loadRequestsLines: loadRequestsLines,
          loadRequestsDetails: loadRequestsDetails,
          locationDetail: locationDetail,
          paymentMethods:paymentMethods,
          messages:messages,
          domain:domain,
          promos : promos , 
          advantages : advantages , 
          populationsArticle : populationsArticle,
        });
      }
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

//****************** GET DATA BACK ************************
const getDataBack = async function(socket) {
  const logger = Container.get('logger');
  // logger.debug("Calling user mobile login endpoint")

  const userMobileServiceInstanse = Container.get(UserMobileService);

  console.log('socket connected');

  socket.emit('readyToRecieve');

  socket.on('sendData', async data => {

    // updated database
    console.log("Data keys :\n ")
    console.log(Object.keys(data))
    
    //  USER MOBILE  
    if(data.userMobile){
      console.log("UPDATING USER MOBILE")
      let user = data.userMobile
      if(user.id) delete user.id
      const updatedUser = await this.userMobileServiceInstance.updated(user , {user_mobile_code : user.user_mobile_code})
      console.log("UPDATING USER MOBILE END")
    } 
    
    // CUSTOMERS
    if(data.customers.length >0){
      console.log("CUSTOMERS CREATION ")
      for(const customer of data.customers){
        if(customer.changed == 1 ){
          console.log("updating one customer")
          customer.sales_channel_code = "SC-003"
          const udpatedCustomer = await userMobileServiceInstanse.updateCustomer(customer,{customer_code:customer.customer_code});
        }
        if(customer.changed == 2 ){
          console.log("creating one customer")
          delete customer.id
          delete customer.changed
          console.log(customer)
          const createdCustomer = await userMobileServiceInstanse.createCustomer(customer);
          if(createdCustomer){
            console.log("creating customer-itinerary")
            let createData = {
              itinerary_code : data.service.itinerary_code,
              customer_code : customer.customer_code
            }
            const createdCustomerItinerary = await userMobileServiceInstanse.createCustomerItinerary(createData);
          }
        }
      };
    }

    //TOKEN SERIE
    if(data.tokenSerie){
      console.log("UPDATING TOKEN SERIE")
      const token = data.tokenSerie
      const udpatedCustomer = await userMobileServiceInstanse.updateTokenSerie(token,{token_code:token.token_code});
      console.log("UPDATING TOKEN END")
    }
      
    //VISITS
    if(data.visits){
      const dataa = data.visits
      const visits = await userMobileServiceInstanse.createVisits(dataa);
    }

    // INVOICES 0 CREATE , 2 UPDATE , field : MAJ
    if(data.invoices){
      const invoices = data.invoices
      const invoicesLines = data.invoicesLines
      let invoicesToCreate = []
      let invoicesLinesToCreate = []
     
      for(const invoice of invoices){
        if(invoice.MAJ == 0) {
          invoice.the_date = formatDateFromMobileToBackAddTimezone(invoice.the_date)
          invoice.period_active_date = formatDateOnlyFromMobileToBack(invoice.period_active_date)
          delete invoice.MAJ
          console.log("INVOICE TO CREATE")
          // console.log(Object.keys(invoice))
          // console.log(Object.values(invoice))
          invoicesToCreate.push(invoice)
          for (const line of invoicesLines){
            if(line.invoice_code === invoice.invoice_code) invoicesLinesToCreate.push(line)
          }
        }else if(invoice.MAJ == 2){
          console.log("UPDATING ONE INVOICE")
          
          invoice.the_date = formatDateFromMobileToBackAddTimezone(invoice.the_date)
          invoice.period_active_date = formatDateOnlyFromMobileToBack(invoice.period_active_date)
          delete invoice.id 
          delete invoice.MAJ
          const udpatedInvoice = await userMobileServiceInstanse.updateInvoice(
            invoice,{invoice_code:invoice.invoice_code});
          console.log("UPDATING ONE INVOICE END")
        }
      }
      
      console.log("CREATING INVOICES & THEIR LINES")
      const invoicesCreated = await userMobileServiceInstanse.createInvoices(invoicesToCreate);
      if(invoicesCreated) {const invoicesLines = await userMobileServiceInstanse.createInvoicesLines(invoicesLinesToCreate)};
      console.log("CREATING INVOICES & THEIR LINES END")
    }
   
    // PAYMENTS
    if(data.payments){
      const dataa = data.payments
      dataa.forEach(payment => {
        console.log(payment)
        payment.the_date = formatDateFromMobileToBackAddTimezone(payment.the_date)
      });
      const payments = await userMobileServiceInstanse.createPayments(dataa);
    }

    // LOCATION DETAILS
    if(data.locationsDetails){
      const dataa = data.locationsDetails
      dataa.forEach(ld => {
        ld.ld_expire = formatDateOnlyFromMobileToBack(ld.ld_expire)
      });
      const locationdDetails = await userMobileServiceInstanse.updateCreateLocationDetails(dataa);
    }

    // loadRequests
    if(data.loadRequests){
      console.log("CREATING LOAD REQUESTS")
      const loadRequests = data.loadRequests
      const loadRequestsLines = data.loadRequestsLines

    
      
      const loadRequestService = Container.get(LoadRequestService)
      let loadRequest0 = []
      let loadRequestLines0 = []
      let loadRequest50 = []
      let loadRequestM10 = []
      
      for(const load of loadRequests) {
        // console.log(load)
        // CREATION
        if(load.status == 0){
          const laod_code = load.load_request_code
          const role_code = load.role_code

          delete load.id
          const role = await userMobileServiceInstanse.getRole({ role_code: role_code });
          
          load.date_creation = formatDateOnlyFromMobileToBack(load.date_creation) 
          load.role_loc =  role.role_loc
          load.role_site =  role.role_site
          
          loadRequest0.push(load)

          // GET LOAD REQUEST CODE LINES THAT HAS STATUS = 0

          loadRequestsLines.forEach(line => {
            if(line.load_request_code == laod_code){
              delete line.line_code
              line.date_creation = formatDateOnlyFromMobileToBack(line.date_creation)
              line.date_charge = null
              loadRequestLines0.push(line)

            }
          }); 
         
        }
        else if(load.status == 50){
          const laod_code = load.load_request_code
          loadRequest50.push(laod_code)
        }else if (load.status == -10){
          const laod_code = load.load_request_code
          loadRequestM10.push(laod_code)
        }
      };   

      

      console.log("LOAD REQUESTS END")
      const createdLoadRequestes = await loadRequestService.createMultipleLoadRequests(loadRequest0)
      console.log("LOAD REQUESTS LINES CREATION")
      const createdloadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines(loadRequestLines0)
      console.log("LOAD REQUESTS LINES CREATION END")
      console.log("LOAD REQUESTS STATUS 50 UPDATE")
      if(loadRequest50.length >0){
        for(const load of loadRequest50){
          const updatedLoad = await loadRequestService.updateLoadRequestStatusToX(load, 50)
        }
      }
      console.log("LOAD REQUESTS STATUS 50 UPDATE END")
      console.log("LOAD REQUESTS STATUS -10 UPDATE")
      if(loadRequestM10.length >0){
        console.log(loadRequestM10)
        for(const load of loadRequestM10){
          const updatedLoad = await loadRequestService.updateLoadRequestStatusToX(load, -10)
        }
      }
      console.log("LOAD REQUESTS STATUS -10 UPDATE END ")
    }   

    // INVENTORY & INVENTORY LINE 
    if(data.inventaires){
      console.log("INVENTORIES CREATION")
      const inventories = data.inventaires
      inventories.forEach(inventory => {
        console.log(inventory)
        inventory.the_date = formatDateFromMobileToBackAddTimezone(inventory.the_date)
      });
      const inventoriesCreated = await userMobileServiceInstanse.createInventories(inventories);
      console.log("INVENTORIES CREATION END")
      if(inventoriesCreated){
        console.log("INVENTORIES LINES CREATION")
        const inventoriesLines = data.inventairesLines
        inventoriesLines.forEach(line => {
          
          line.expiring_date = formatDateOnlyFromMobileToBack(line.expiring_date)
        });
        const inventoriesLinesCreated = await userMobileServiceInstanse.createInventoriesLines(inventoriesLines);
        console.log("INVENTORIES LINES CREATION END")
      }
      
      
    }

    

     console.log("CREATING UNLOAD REQUESTS AND THEIR DETAILS")
     if(data.unloadRequests){
       const unloadRequestes = data.unloadRequests
       const unloadRequestsDetails = data.unloadRequestsDetails
       unloadRequestes.forEach(load => {
        load.date_creation = formatDateFromMobileToBackAddTimezone(load.date_creation)
       });
       unloadRequestsDetails.forEach(detail => {
        if(detail.date_expiration != null || detail.date_expiration != ""){
          detail.date_expiration = formatDateOnlyFromMobileToBack(detail.date_expiration)
        }
       });
       const loadRequestService = Container.get(UnloadRequestService)
       const createdUnloadRequests = await loadRequestService.createMultipleUnoadRequests(unloadRequestes)
       if(createdUnloadRequests){
         
         const createdUnloadRequestsDetails = await loadRequestService.createMultipleUnoadRequestsDetails(unloadRequestsDetails)
        }
      }
      console.log("CREATING UNLOAD REQUESTS AND THEIR DETAILS END ")
      
    // SERVICE
    // CREATED FROM BACKEDN
     const {service , service_creation} = data
     if(service_creation == true){ 
      // created from backend 
      console.log("UPDATING SERVICE")
      const udpatedService = await userMobileServiceInstanse.updateService(
        {
          service_open:false,
          service_kmdep:service.service_kmdep,
          service_kmarr:service.service_kmarr,
          service_closing_date : formatDateFromMobileToBackAddTimezone(service.service_closing_date)
        },
        {service_code:service.service_code}
        );
        console.log("UPDATING SERVICE END")
    }else{
        // CREATED FROM MOBILE  // false  
        console.log("CREATING SERVICE")
        delete service.id
        service.service_creation_date = formatDateFromMobileToBackAddTimezone(service.service_creation_date)
        service.service_closing_date = formatDateFromMobileToBackAddTimezone(service.service_closing_date)
        service.service_period_activate_date = formatDateOnlyFromMobileToBack( service.service_period_activate_date)
        service.service_open = false
        const createdService = await userMobileServiceInstanse.createService(service)
        console.log("CREATING SERVICE END")
    }
 
    socket.emit('dataUpdated')
  });
};

const getDataBackTest = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  // logger.debug("Calling user mobile login endpoint")

  const userMobileServiceInstanse = Container.get(UserMobileService);
  try {

    // CUSTOMERS : 
    // 0 : no change = do nothing 
    // 1 : update 
    // 2 : create new 
    if(req.body.customers.length >0){
      // console.log(req.body.customers)
      for(const customer of req.body.customers){
        if(customer.changed == 1 ){
          const udpatedCustomer = await userMobileServiceInstanse.updateCustomer(customer,{customer_code:customer.customer_code});
        }
        if(customer.changed == 2 ){
          delete customer.id
          delete customer.changed
          const createdCustomer = await userMobileServiceInstanse.createCustomer(customer);
        }
      };
    }
    
    // SERVICE
    // CREATED FROM BACKEDN
    // const {service} = req.body
    // if(req.body.parameter.hold == 1){
    //   const udpatedService = await userMobileServiceInstanse.updateService(
    //     {
    //       service_open:false,
    //       service_kmdep:service.service_kmdep,
    //       service_kmarr:service.service_kmarr,
    //     },
    //     {service_code:service.service_code}
    //     );
    //   }else{
    //     // CREATED FROM MOBILE
    //     delete service.id
    //     service.service_open = false
    //     const udpatedService = await userMobileServiceInstanse.createService(service)
    // }

    // TOKEN SERIE
    // if(req.body.tokenSerie){
    //   const token = req.body.tokenSerie
    //   const udpatedCustomer = await userMobileServiceInstanse.updateTokenSerie(token,{token_code:token.token_code});
    // }

    // VISITS
    // if(req.body.visits){
    //   const data = req.body.visits
    //   const visits = await userMobileServiceInstanse.createVisits(data);
    // }

    // INVOICE
    // if(req.body.invoices){
    //   const data = req.body.invoices
    //   const invoices = await userMobileServiceInstanse.createInvoices(data);
    // }

    // INVOICE LINE
    // if(req.body.invoicesLines){
    //   const data = req.body.invoicesLines
    //   const invoicesLines = await userMobileServiceInstanse.createInvoicesLines(data);
    // }

    // INVENTORY
    // if(req.body.inventaires){
    //   const data = req.body.inventaires
    //   const inventories = await userMobileServiceInstanse.createInventories(data);
    // }

    // INVENTORY LINES
    // if(req.body.inventairesLines){
    //   const data = req.body.inventairesLines
    //   const inventoriesLines = await userMobileServiceInstanse.createInventoriesLines(data);
    // }

    // PAYMENTS
    // if(req.body.payments){
    //   const data = req.body.payments
    //   const payments = await userMobileServiceInstanse.createPayments(data);
    // }

     // LOCATION DETAILS
      // if(req.body.loacationsDetails){
      //   const data = req.body.loacationsDetails
      //   const locationdDetails = await userMobileServiceInstanse.updateCreateLocationDetails(data);
      // }

    return res.status(200).json({ message: 'deleted succesfully', data: req.body });
    
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

function formatDateOnlyFromBackToMobile(timeString){
  let dateComponents = timeString.split("-")
  const str = dateComponents[2]+'-'+dateComponents[1]+'-'+dateComponents[0] 
  return str
}

function formatDateFromBackToMobile(date){
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const str = d +'-' + m +'-' +  date.getFullYear()+' '+ date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') +  ':' + String(date.getSeconds()).padStart(2, '0')
 
  return str
}

function formatDateFromMobileToBackAddTimezone(timeString){
  let elements = timeString.split(" ") 
  let dateComponents = elements[0].split("-")
  const str = dateComponents[2]+'-'+dateComponents[1]+'-'+dateComponents[0] +' '+elements[1]+'.63682+01' 
  return str
}

function formatDateOnlyFromMobileToBack(timeString){
  let dateComponents = timeString.split("-")
  const str = dateComponents[2]+'-'+dateComponents[1]+'-'+dateComponents[0] 
  return str
}

const findAllInvoice = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);



    console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where: { period_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
       
      });
    } else {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where: {site: req.body.site, period_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
       
      });
    }
   // console.log("invoices",invoices);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoices });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findPaymentterm = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    
    const userMobileServiceInstance = Container.get(UserMobileService);
    const codes = await userMobileServiceInstance.getPaymentMethods();
    
    var data = [];
    for (let code of codes) {
      data.push({ value: code.payment_method_code, label: code.description });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByInvoiceLine = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  console.log("rrrrrrrrrrrrrrrrrr",req.body)
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    
      var invoicesline = await userMobileServiceInstance.getInvoiceLineBy({
        where: {invoice_code:req.body.invoicecode} ,
       attributes: {
       
        include: [[Sequelize.literal('unit_price * quantity'), 'Montant']],
       },
       
    });
    
    console.log(invoicesline);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoicesline });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findPaymentBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {

    const userMobileServiceInstance = Container.get(UserMobileService);

    console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
        period_active_date: { [Op.between]: [req.body.date, req.body.date1] } ,
       
      });
    } else {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
       site: req.body.site, period_active_date: { [Op.between]: [req.body.date, req.body.date1] } ,
       
      });
    }
    console.log("invoices",invoices);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoices });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findVisitBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {

    const userMobileServiceInstance = Container.get(UserMobileService);

   // console.log(req.body);
    if (req.body.site == '*') {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: { periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
      });
    } else {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: {site: req.body.site, periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
       
      });
    }
  //  console.log("visit",visits);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: visits });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findAllVisits = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

  
      var visits = await userMobileServiceInstance.getVisits();
    
   // console.log("invoices",invoices);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: visits });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
// ********************** FIND ONE USER MOBILE BY CODE *************
const findUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    const { user_mobile_code } = req.params;
    const user = await userMobileServiceInstance.findOne({ user_mobile_code: user_mobile_code });

    return res.status(200).json({data: user.password });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ********************** FIND ONE USER MOBILE BY CODE *************
const getAllVisits = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    console.log("getting all visits")
    const visits = await userMobileServiceInstance.getAllVisits();

    return res.status(200).json({data: visits });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// ********************** FIND ONE USER MOBILE BY CODE *************
const testHash = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  user endpoint');
  try {

    const algorithm = 'aes-192-cbc';
    const word = 'test';
    // const secretKey = '123456asdf'
    // const secretKey = crypto.randomBytes(32);
    


    // const iv = crypto.randomBytes(16);
    // const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    // let encryptedText = cipher.update(word, "utf-8", "hex");
    // encryptedText += cipher.final("hex");

    // crypto.scrypt(word, secretKey ,16 , (err, key)=>{
     
    // })

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync('test', salt);

    var encryptionKey2 = CryptoJS.lib.WordArray.random(256 / 8).toString();
    // var secretKey = '123456asdf';
    var secretKey = "b4cb72173ee45d8c7d188e8f77eb16c2";
    let encryptedValue=CryptoJS.AES.encrypt('test', secretKey).toString()
    console.log("encrypt  "+encryptedValue);

    return res.status(200).json({data: encryptedValue });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


export default {
  create,
  findOne,
  findAll,
  findBy,
  findByOne,
  findAllwithDetails,
  update,
  updated,
  deleteOne,
  signin,
  getDataBack,
  getDataBackTest,
  findAllInvoice,
  findPaymentterm,
  findByInvoiceLine,
  findPaymentBy,
  findVisitBy,
  findAllVisits,
  findUserPassword,
  testHash
};
