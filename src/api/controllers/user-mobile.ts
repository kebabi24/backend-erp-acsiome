import UserMobileService from '../../services/user-mobile';
import RoleService from '../../services/role';
import { Router, Request, ponse, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';

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
  console.log(typeof req.body.username);
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

  try {
    const role_code = req.body.role_code;
    const role = await userMobileServiceInstanse.getRole({ role_code: role_code });

    // if the role id doesn't exist
    if (!role) {
      return res.status(404).json({ message: 'No role exist with such an id ' });
    } else {
      // these data is the same for both response cases

      const user_mobile_code = role.user_mobile_code;
      const userMobile = await userMobileServiceInstanse.getUser({ user_mobile_code: user_mobile_code });
      var users =[];
      var profiles = [];
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
      const messages = await userMobileServiceInstanse.getMessages(role_code)
      var role_controller = {};
      var profile_controller = {};

      
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
    
    const index = parameter.map(elem => elem.parameter_code).indexOf('service')
    console.log(index)
      

      const productPages = await userMobileServiceInstanse.getProfileProductPages({
        profile_code: userMobile.profile_code,
      });
      const productPagesDetails = await userMobileServiceInstanse.getProductPagesDetails(productPages);
      const products = await userMobileServiceInstanse.getProducts(productPagesDetails);
      const loadRequest = await userMobileServiceInstanse.getLoadRequest({
        user_mobile_code: user_mobile_code,
        status: 40,
      });
      const loadRequestsLines = await userMobileServiceInstanse.getLoadRequestLines(loadRequest);
      const loadRequestsDetails = await userMobileServiceInstanse.getLoadRequestDetails(loadRequest);
      const locationDetail = await userMobileServiceInstanse.getLocationDetail(role.role_loc, role.role_site);
      
      console.log(parameter)
      // service created on backend
      if (parameter[index].hold === true) {
        const service = await userMobileServiceInstanse.getService({ role_code: role.role_code });
        // const itinerary = await userMobileServiceInstanse.getItineraryFromService({id :service.service_itineraryId })
        const itinerary2 = await userMobileServiceInstanse.getItineraryFromRoleItinerary({ role_code: role.role_code });
        // if(itinerary2==null){itinerary2=[]}
        const customers = await userMobileServiceInstanse.getCustomers({ itinerary_code: itinerary2.itinerary_code });
        const tokenSerie = await userMobileServiceInstanse.getTokenSerie({ token_code: role.token_serie_code });
        // const categories = await userMobileServiceInstanse.getCategories( customers )
        // const categoriesTypes = await userMobileServiceInstanse.getCategoriesTypes( customers )
        // const clusters = await userMobileServiceInstanse.getClusters( customers )
        // const subClusters = await userMobileServiceInstanse.getSubClusters( customers )
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
        });
      }
      // service created by mobile user
      else {
        // const iitineraries = await userMobileServiceInstanse.getItineraries({role_code : role.role_code })
        const iitineraries = await userMobileServiceInstanse.getItinerariesOnly({ role_code: role.role_code });
        const iitineraries_customers = await userMobileServiceInstanse.getItinerariesCustomers({
          role_code: role.role_code,
        });
        const customers = await userMobileServiceInstanse.getCustomersOnly({ role_code: role.role_code });
        const tokenSerie = await userMobileServiceInstanse.getTokenSerie({ token_code: role.token_serie_code });
        // const categories = await userMobileServiceInstanse.getCategories( customers )
        // const categoriesTypes = await userMobileServiceInstanse.getCategoriesTypes( customers )
        // const clusters = await userMobileServiceInstanse.getClusters( customers )
        // const subClusters = await userMobileServiceInstanse.getSubClusters( customers )

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
    console.log("CUSTOMERS LIST LENGTH : "+ data.customers.length)
    if(data.customers.length >0){
      // console.log(data.customers)
      for(const customer of data.customers){
        if(customer.changed == 1 ){
          const udpatedCustomer = await userMobileServiceInstanse.updateCustomer(customer,{customer_code:customer.customer_code});
        }
        if(customer.changed == 2 ){
          console.log("creatin customers")
          console.log(customer)
          delete customer.id
          delete customer.changed
          const createdCustomer = await userMobileServiceInstanse.createCustomer(customer);
        }
      };
    }

    // setTimeout(() => {
    //   socket.emit('dataUpdated');
    // }, 4000);
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
      if(req.body.loacationsDetails){
        const data = req.body.loacationsDetails
        const locationdDetails = await userMobileServiceInstanse.updateCreateLocationDetails(data);
      }

    return res.status(200).json({ message: 'deleted succesfully', data: req.body });
    
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

   


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
};
