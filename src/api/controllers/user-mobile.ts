import UserMobileService from '../../services/user-mobile';
import LoadRequestService from '../../services/load-request';
import UnloadRequestService from '../../services/unload-request';
import RoleService from '../../services/role';
import ItemService from '../../services/item';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import Payment from '../../models/mobile_models/payment';
import { Op, Sequelize } from 'sequelize';
import CryptoJS from '../../utils/CryptoJS';
import PromotionService from '../../services/promotion';
import _ from 'lodash';
import siteService from '../../services/site';
import CustomersMobileSercice from '../../services/customer-mobile';
import _, { isNull } from 'lodash';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const moment = require('moment');

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
  const siteServiceInstance = Container.get(siteService);

  try {
    // const role_code = req.body.role_code;
    const device_id = req.body.device_id;
    // const role = await userMobileServiceInstanse.getRole({ role_code: role_code });
    const role = await userMobileServiceInstanse.getRole({ device_id: device_id });

    // if the role id doesn't exist
    if (!role) {
      return res.status(404).json({ message: 'No role exist with such an id ' });
    } else {
      // these data is the same for both response cases
      const site = await siteServiceInstance.findOne({ si_site: role.role_site });
      const user_mobile_code = role.user_mobile_code;
      const userMobile = await userMobileServiceInstanse.getUser({ user_mobile_code: user_mobile_code });
      var users = [];
      var profiles = [];
      var priceList = [];
      const profile = await userMobileServiceInstanse.getProfile({ profile_code: userMobile.profile_code });
      const menus = await userMobileServiceInstanse.getMenus({ profile_code: userMobile.profile_code });
      const parameter = await userMobileServiceInstanse.getParameter({ profile_code: userMobile.profile_code });
      const checklist = await userMobileServiceInstanse.getChecklist();
      const visitList = await userMobileServiceInstanse.getVisitList();
      const cancelationReasons = await userMobileServiceInstanse.getCancelationReasons();
      if (role.pricelist_code == null || role.pricelist_code == '') {
        priceList = await userMobileServiceInstanse.getPriceList();
      } else {
        priceList = await userMobileServiceInstanse.getPriceListBY({ pricelist_code: role.pricelist_code });
      }

      const invoice = await userMobileServiceInstanse.getInvoice(role.role_code);
      let invoicecode= []
      for (let inv of invoice) {
        invoicecode.push(inv.invoice_code)
      }
      const invoiceLine = await userMobileServiceInstanse.getInvoiceLine({invoice_code:invoicecode});
      const paymentMethods = await userMobileServiceInstanse.getPaymentMethods();
      const messages = await userMobileServiceInstanse.getMessages(role.role_code);
      const barCodesInfo = await userMobileServiceInstanse.findAllBarCodes();
      var role_controller = {};
      var profile_controller = {};

      const domain = await userMobileServiceInstanse.getDomain({ dom_domain: role.role_domain });

      const promos = await promoServiceInstanse.getValidePromos(role.role_site);
      let adv_codes = [],
        pop_a_codes = [],
        pop_c_codes = [];

      promos.forEach(promo => {
        adv_codes.push(promo.adv_code);
        pop_a_codes.push(promo.pop_a_code);
        pop_c_codes.push(promo.pop_c_code);
      });

      const products_promo = await userMobileServiceInstanse.getProductsOfPromo();
      // console.log(products_promo);

      const advantages = await promoServiceInstanse.getAdvantagesByCodes(adv_codes);
      const populationsArticle = await promoServiceInstanse.getPopsArticleByCodes(pop_a_codes);
      const populationsCustomer = await promoServiceInstanse.getPopsCustomersByCodes(pop_c_codes);

      if (role['controller_role'] != null && role['controller_role'].length != 0) {
        role_controller = await userMobileServiceInstanse.getUser({ user_mobile_code: role['controller_role'] });
        profile_controller = await userMobileServiceInstanse.getProfile({
          profile_code: role_controller['profile_code'],
        });
        const controller_menus = await userMobileServiceInstanse.getMenus({
          profile_code: role_controller['profile_code'],
        });
        menus.push(...controller_menus);
      }

      if (role['controller_role'] != null && role['controller_role'].length != 0) {
        users.push(userMobile, role_controller);
        profiles.push(profile, profile_controller);
      } else {
        users.push(userMobile);
        profiles.push(profile);
      }

      // INDEX OF : PARAMETER = SERVICE
      const index = parameter.map(elem => elem.parameter_code).indexOf('service');

      const productPages = await userMobileServiceInstanse.getProfileProductPages({
        profile_code: userMobile.profile_code,
      });
      const productPagesDetails = await userMobileServiceInstanse.getProductPagesDetails(productPages);
      // console.log(productPagesDetails);
      const products = await userMobileServiceInstanse.getProducts(productPagesDetails);
     // console.log("product",products)
      const loadRequest = await userMobileServiceInstanse.getLoadRequest({
        user_mobile_code: user_mobile_code,
        status: 40,
      });
      const loadRequestsLines = await userMobileServiceInstanse.getLoadRequestLines(loadRequest);
      const loadRequestsDetails = await userMobileServiceInstanse.getLoadRequestDetails(loadRequest);

      const locationDetail = await userMobileServiceInstanse.getLocationDetail(role.role_loc, role.role_site);

      // FORMAT DATE
      // LOAD REQUEST
      if (loadRequest.length > 0) {
        loadRequest.forEach(load => {
          load.dataValues.date_creation = formatDateOnlyFromBackToMobile(load.date_creation);
         // console.log(load.date_creation)
          if (load.dataValues.date_charge != null) load.date_charge = formatDateFromBackToMobile(load.date_charge);
        });
      }
      // LOAD REQUEST LINE
      if (loadRequestsLines.length > 0) {
        loadRequestsLines.forEach(load => {

          load.dataValues.date_creation = formatDateOnlyFromBackToMobile(load.date_creation);
          if (load.dataValues.date_charge != null) load.date_charge = formatDateOnlyFromBackToMobile(load.date_charge);
        });
      }
      // LOAD REQUEST DETAILS
      if (loadRequestsDetails.length > 0) {
        loadRequestsDetails.forEach(load => {
          const date = load.date_expiration;
          // load.date_expiration = formatDateOnlyFromBackToMobile(date)
        });
      }
      // LOCATION DETAILS
      if (locationDetail.length > 0) {
        locationDetail.forEach(ld => {
          ld.dataValues.ld_expire = formatDateOnlyFromBackToMobile(ld.ld_expire);
         // console.log('ld expire after ' + ld.dataValues.ld_expire);
        });
      }
      // INVOICE
      if (invoice.length > 0) {
        invoice.forEach(invoice => {
          invoice.dataValues.the_date = formatDateFromBackToMobile(invoice.dataValues.the_date);
          invoice.dataValues.period_active_date = formatDateOnlyFromBackToMobile(invoice.period_active_date);
        });
      }
//console.log("invoice",invoice)
      // service created on backend
      if (parameter[index].hold === true) {
        let service1 = await userMobileServiceInstanse.getService({ role_code: role.role_code ,service_open:true});
       // console.log("here service",service1)
        // UPDATE SERVICE DATES
        let service = {
          // id: ,
          service_code: service1.service_code,
          role_code: service1.role_code,
          user_mobile_code: service1.user_mobile_code,
          service_site: service1.service_site,
          itinerary_code: service1.itinerary_code,
          service_open: service1.service_open,
          service_kmdep: service1.service_kmdep,
          service_kmarr: service1.service_kmarr,
          service_domain: service1.service_domain,
          nb_visits: service1.nb_visits,
          nb_clients_itin: service1.nb_clients_itin,
          nb_invoice: service1.nb_invoice,
          nb_products_sold: service1.nb_products_sold,
          nb_products_loaded: service1.nb_products_loaded,
          nb_clients_created: service1.nb_clients_created,
          sum_invoice: service1.sum_invoice,
          sum_paiement: service1.sum_paiement,
          service_period_activate_date: formatDateOnlyFromBackToMobile(service1.service_period_activate_date),
          service_creation_date: formatDateFromBackToMobile(service1.service_creation_date),
          service_closing_date: formatDateFromBackToMobile(service1.service_closing_date),
        };

        // console.log(' service periode activate date '+service.service_period_activate_date)
        // console.log(' service periode activate date2 '+formatDateOnlyFromBackToMobile(service.service_period_activate_date))
        // console.log(' service_creation_date2 '+formatDateFromBackToMobile(service.service_creation_date))
        // console.log(' service_creation_date1 '+service.service_creation_date)
        // service.service_period_activate_date = formatDateOnlyFromBackToMobile(service.service_period_activate_date);
        // service.service_creation_date = formatDateFromBackToMobile(service.service_creation_date);
        // service.service_closing_date = formatDateFromBackToMobile(service.service_closing_date);
        // console.log(' service periode activate date3 '+service.service_period_activate_date)
        // console.log(' service_creation_date3 '+service.service_creation_date)

        // if (service) {
        //   service.service_period_activate_date = formatDateOnlyFromBackToMobile(service.service_period_activate_date);
        //   service.service_creation_date = formatDateFromBackToMobile(service.service_creation_date);
        //   service.service_closing_date = formatDateFromBackToMobile(service.service_closing_date);
        // }

        // let itinerary2 :any
        // let customers: any
        // if (parameter[index].hold === true) {
      
/*modification tourne*/
        // const   itinerary2 = await userMobileServiceInstanse.getItineraryFromService({ itinerary_code: service1.itinerary_code });

        // const   customers = await userMobileServiceInstanse.getCustomers({ itinerary_code: service1.itinerary_code /*itinerary2.itinerary_code*/ });
        //   if (role.pricelist_code != null && role.pricelist_code != '') {
        //     customers.forEach(element => {
        //       element.pricelist_code = '';
        //     });
        //   }

/*modification tourne*/
          const iitineraries = await userMobileServiceInstanse.getItinerariesOnly({ role_code: role.role_code });
          const iitineraries_customers = await userMobileServiceInstanse.getItinerariesCustomers({
            role_code: role.role_code,
          });
          const customers = await userMobileServiceInstanse.getCustomersOnly({ role_code: role.role_code });

      //   } else {
      //    itinerary2 = await userMobileServiceInstanse.getItineraryFromRoleItinerary({ role_code: role.role_code });

      //    console.log("itinerary",itinerary2)
      //   let itineraryss = []
      //     for (let itin of itinerary2) {
      //       itineraryss.push(itin.itinerary_code)

      //     }
      //    customers = await userMobileServiceInstanse.getCustomers({ itinerary_code: itineraryss /*itinerary2.itinerary_code*/ });
      //   if (role.pricelist_code != null && role.pricelist_code != '') {
      //     customers.forEach(element => {
      //       element.pricelist_code = '';
      //     });
      //   }

      // }
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
          users: users,
          parameter: parameter,
          role: role,
          profile: profile,
          profiles: profiles,
          menus: menus,
          service: service,
          //modification itinerary: itinerary2,
          /*modification tourne*/
          itinerary: iitineraries,
          iitineraries_customers: iitineraries_customers,
          /*modification tourne*/
          customers: customers,
          checklist: checklist,
          token_serie: tokenSerie,
          categories: categories,
          categoriesTypes: categoriesTypes,
          clusters: clusters,
          subClusters: subClusters,
          visitList: visitList,
          salesChannels: salesChannels,
          cancelationReasons: cancelationReasons,
          priceList: priceList,
          invoice: invoice,
          invoiceLine: invoiceLine,
          productPages: productPages,
          productPagesDetails: productPagesDetails,
          // products: products,
          products: [...products, ...products_promo],
          loadRequest: loadRequest,
          loadRequestsLines: loadRequestsLines,
          loadRequestsDetails: loadRequestsDetails,
          locationDetail: locationDetail,
          paymentMethods: paymentMethods,
          messages: messages,
          domain: domain,
          promos: promos,
          advantages: advantages,
          populationsArticle: populationsArticle,
          population: populationsCustomer,
          barCodesInfo: barCodesInfo,
          site: site,
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
          users: users,
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
          cancelationReasons: cancelationReasons,
          priceList: priceList,
          invoice: invoice,
          invoiceLine: invoiceLine,
          productPages: productPages,
          productPagesDetails: productPagesDetails,
          // products: products,
          products: [...products, ...products_promo],
          loadRequest: loadRequest,
          loadRequestsLines: loadRequestsLines,
          loadRequestsDetails: loadRequestsDetails,
          locationDetail: locationDetail,
          paymentMethods: paymentMethods,
          messages: messages,
          domain: domain,
          promos: promos,
          advantages: advantages,
          populationsArticle: populationsArticle,
          population: populationsCustomer,
          barCodesInfo: barCodesInfo,
          site: site,
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
  console.log("hounahpunahpouma")
  const logger = Container.get('logger');
  // logger.debug("Calling user mobile login endpoint")
try {
  // itineraries_customers
  var nb_visits;
  0;
  var nb_invoice;
  var nb_products_sold;
  var nb_clients_created;

  const userMobileServiceInstanse = Container.get(UserMobileService);
  const RoleServiceInstance = Container.get(RoleService);
  
  console.log('socket connected');

  socket.emit('readyToRecieve');

  socket.on('sendData', async data => {
    console.log("heeeeeeeeeeeeeeeeee")
    // updated database
    //console.log('Data keys :\n ');
    // console.log(Object.keys(data));

    // var { nb_clients_itin, nb_products_loaded, sum_invoice } = data;
    // (nb_clients_itin = 5), (nb_products_loaded = 8), (sum_invoice = 8);

    // SERVICE
    // CREATED FROM BACKEDN
    const { service, service_creation, user, visits, payment,invoices ,invoicesLines} = data;
console.log("service_creation",service_creation)
console.log(service)
console.log(invoices)
const role =  await RoleServiceInstance.findOne({role_code:service.role_code})
//console.log(role)
    // console.log(user);
    // console.log(visits);
    if (service_creation == 1) {
      // created from backend
      console.log('UPDATING SERVICE');
  //    console.log(service)
      const udpatedService = await userMobileServiceInstanse.updateService(
        {
          service_open: false,
          service_kmdep: service.service_kmdep,
          service_kmarr: service.service_kmarr,
          service_closing_date: formatDateFromMobileToBackAddTimezone(service.service_closing_date),
          nb_visits: (service.nb_visits==0)? 1:service.nb_visits,
          nb_clients_itin: service.nb_clients_itin,
          nb_invoice: service.nb_invoice,
          nb_products_sold: service.nb_products_sold,
          nb_clients_created: service.nb_clients_created,
          nb_products_loaded: service.nb_products_loaded,
          sum_invoice: service.sum_invoice,
          sum_paiement: service.sum_paiement,
          frais: service.frais,
          date_quitter_depot : formatDateFromMobileToBackAddTimezone(service.date_quitter_depot),
          date_retour_depot  : formatDateFromMobileToBackAddTimezone(service.date_retour_depot),
      
          // user_mobile_code: service.user_mobile_code,
        },
        { service_code: service.service_code },
      );
      console.log('UPDATING SERVICE END');
    } else {
      // CREATED FROM MOBILE  // false
      console.log('CREATING SERVICE');
      delete service.id;
      console.log(' service creation date ' + service.service_creation_date);
      console.log(' service  date2 ' + service.service_closing_date);
      console.log(' service  date3 ' + service.service_period_activate_date);
      service.service_creation_date = formatDateFromMobileToBackAddTimezone(service.service_creation_date);
      service.service_closing_date = formatDateFromMobileToBackAddTimezone(service.service_closing_date);
      service.service_period_activate_date = formatDateOnlyFromMobileToBack(service.service_period_activate_date);
      service.service_open = false;
      service.date_quitter_depot = formatDateFromMobileToBackAddTimezone(service.date_quitter_depot);
      service.date_retour_depot = formatDateFromMobileToBackAddTimezone(service.date_retour_depot);
      
      // service.nb_visits = service.nb_visits;
      // service.nb_clients_itin = service.nb_clients_itin;
      // service.nb_invoice = service.nb_invoice;
      // service.nb_products_sold = service.nb_products_sold;
      // service.nb_clients_created = service.nb_clients_created;
      // service.nb_products_loaded = service.nb_products_loaded;
      // service.sum_invoice = service.sum_invoice;
      // service.user_mobile_code= service.user_mobile_code,
      //console.log(service);
      const createdService = await userMobileServiceInstanse.createService(service);
      console.log('CREATING SERVICE END');
    }

    //  USER MOBILE
    if (data.userMobile) {
      console.log('UPDATING USER MOBILE');
      let user = data.userMobile;
      if (user.id) delete user.id;
      const updatedUser = await this.userMobileServiceInstance.updated(user, {
        user_mobile_code: user.user_mobile_code,
      });
      console.log('UPDATING USER MOBILE END');
    }

    // CUSTOMERS
    if (data.customers.length > 0) {
      console.log('CUSTOMERS CREATION ');
      for (const customer of data.customers) {
        if (customer.changed == 1) {
          console.log('updating one customer');
          // customer.sales_channel_code = "SC-003"
          const udpatedCustomer = await userMobileServiceInstanse.updateCustomer(customer, {
            customer_code: customer.customer_code,
          });
        }
        if (customer.changed == 2) {
          nb_clients_created += 1;
          console.log('creating one customer');
          delete customer.id;
          delete customer.changed;
          console.log(customer);
          const createdCustomer = await userMobileServiceInstanse.createCustomer(customer);
          if (createdCustomer) {
            console.log('creating customer-itinerary');
            let createData = {
              itinerary_code: data.service.itinerary_code,
              customer_code: customer.customer_code,
            };
            const createdCustomerItinerary = await userMobileServiceInstanse.createCustomerItinerary(createData);
          }
        }
      }
    }

    //TOKEN SERIE
    if (data.tokenSerie) {
      console.log('UPDATING TOKEN SERIE');
      const token = data.tokenSerie;
      const udpatedCustomer = await userMobileServiceInstanse.updateTokenSerie(token, { token_code: token.token_code });
      console.log('UPDATING TOKEN END');
    }

    //VISITS
    if (data.visits) {
      const dataa = data.visits;
      nb_visits = dataa.length;
      dataa.forEach(element => {
        // console.log('element '+element)
        element.periode_active_date = formatDateOnlyFromMobileToBack(element.periode_active_date);
      });
      // periode_active_date
      const visits = await userMobileServiceInstanse.createVisits(dataa);
    }

    // INVOICES 0 CREATE , 2 UPDATE , field : MAJ
   // console.log(data.invoices)
    // if (data.invoices) {
    //   const filtered_invoices = _.mapValues(_.groupBy(data.invoices, 'customer_code'));
    //   nb_invoice = filtered_invoices.length;
    //   const invoices = data.invoices;
    //   //console.log('INVOICEEEEEEEEEEEEEEEEEEEES', invoices);
    //   const invoicesLines = data.invoicesLines;
    //   const filtered_products = _.mapValues(_.groupBy(invoicesLines, 'product_code'));
    //   let invoicesToCreate = [];
    //   let invoicesLinesToCreate = [];
    //   nb_products_sold = filtered_products.legth;
    //   for (const invoice of invoices) {
    //     if (invoice.MAJ == 0) {
    //       invoice.the_date = formatDateFromMobileToBackAddTimezone(invoice.the_date);
    //       invoice.period_active_date = formatDateOnlyFromMobileToBack(invoice.period_active_date);
    //       delete invoice.MAJ;
    //       console.log('INVOICE TO CREATE');
    //       invoicesToCreate.push(invoice);
    //       for (const line of invoicesLines) {
    //         if (line.invoice_code === invoice.invoice_code) invoicesLinesToCreate.push(line);
    //       }
    //     } else if (invoice.MAJ == 2) {
    //       console.log('UPDATING ONE INVOICE');

    //       invoice.the_date = formatDateFromMobileToBackAddTimezone(invoice.the_date);
    //       invoice.period_active_date = formatDateOnlyFromMobileToBack(invoice.period_active_date);
    //       delete invoice.id;
    //       delete invoice.MAJ;
    //       const udpatedInvoice = await userMobileServiceInstanse.updateInvoice(invoice, {
    //         invoice_code: invoice.invoice_code,
    //       });
    //       console.log('UPDATING ONE INVOICE END');
    //     }
    //   }

    //   console.log('CREATING INVOICES & THEIR LINES');
      
    //   const invoicesCreated = await userMobileServiceInstanse.createInvoices(invoicesToCreate);
    //   if (invoicesCreated) {
    //     const invoicesLines = await userMobileServiceInstanse.createInvoicesLines(invoicesLinesToCreate);
    //   }
    //   console.log('CREATING INVOICES & THEIR LINES END');
    // }

    /*invoice*/

    
    if (invoices) {
     // const invoices = data.invoices;
      //const invoicesLines = data.invoicesLines;
      let invoicesLinesToCreate = [];
     // console.log('data', dataa);
      // console.log('data', dataa);
      for (const invoice of invoices) {
          // console.log(invoice)
              invoice.the_date = formatDateFromMobileToBackAddTimezone(invoice.the_date);
              invoice.period_active_date = formatDateOnlyFromMobileToBack(invoice.period_active_date);
              delete invoice.MAJ;
           
      }
    //  console.log('dataaaa', dataa);
      // console.log('dataaaa', dataa);
      const invoicescreateds = await userMobileServiceInstanse.updateCreateInvoices(invoices);
// for(let invs of invoicescreateds){
//   console.log("invoicescreateds" , invs.invoice_code)
  
// }
      for(let inv of invoicescreateds) {
        for (const line of invoicesLines) {
                  if (line.invoice_code === inv.invoice_code) { invoicesLinesToCreate.push(line); }
                }
          }
          const invoicesLiness = await userMobileServiceInstanse.createInvoicesLines(invoicesLinesToCreate);

    }

    /*invoice*/
    // PAYMENTS
    if (data.payments) {
      const dataa = data.payments;
      //dataa.push({period_active_date:null})
      //dataa.push({period_active_date:null});
      dataa.forEach(payment => {
       // console.log(payment);
        payment.the_date = formatDateFromMobileToBackAddTimezone(payment.the_date);
        payment.period_active_date = formatDateOnlyFromMobileToBack(payment.period_active_date);
      });
     // console.log(dataa)
      const payments = await userMobileServiceInstanse.createPayments(dataa);
    }

    // LOCATION DETAILS
    let dataa: any[]=[]
    if (data.locationsDetails) {
      for (let ld of data.locationsDetails) {
        ld.ld_domain = role.role_domain
        dataa.push(ld)
      
      }
      //const dataa = data.locationsDetails;
     // console.log('data', dataa);
      // console.log('data', dataa);
      dataa.forEach(ld => {
      //  console.log('ld', ld.ld_expire);
        if (isNull(ld.ld_expire)) {
       //   console.log('something here');
        } else {
      //    console.log("here ana moha" ,formatDateOnlyFromMobileToBack(ld.ld_expire))
          formatDateOnlyFromMobileToBack(ld.ld_expire);
          ld.ld_expire=formatDateOnlyFromMobileToBack(ld.ld_expire);
          // console.log(' date expire '+formatDateOnlyFromMobileToBack(ld.ld_expire))
        }

      });
    //  console.log('dataaaa', dataa);
      // console.log('dataaaa', dataa);
      const locationdDetails = await userMobileServiceInstanse.updateCreateLocationDetails(dataa);
    }

    // loadRequests
    if (data.loadRequests) {
      console.log('CREATING LOAD REQUESTS');
      const loadRequests = data.loadRequests;
      const loadRequestsLines = data.loadRequestsLines;

      const loadRequestService = Container.get(LoadRequestService);
      let loadRequest0 = [];
      let loadRequestLines0 = [];
      let loadRequest50 = [];
      let loadRequestM10 = [];

      for (const load of loadRequests) {
        // console.log(load)
        // CREATION
        if (load.status == 0) {
          const laod_code = load.load_request_code;
          const role_code = load.role_code;

          delete load.id;
          const role = await userMobileServiceInstanse.getRole({ role_code: role_code });

          load.date_creation = formatDateOnlyFromMobileToBack(load.date_creation);
          load.role_loc = role.role_loc;
          load.role_site = role.role_site;
          load.role_loc_from = role.role_loc_from;
          loadRequest0.push(load);

          // GET LOAD REQUEST CODE LINES THAT HAS STATUS = 0

          loadRequestsLines.forEach(line => {
            if (line.load_request_code == laod_code) {
              delete line.line_code;
              line.date_creation = formatDateOnlyFromMobileToBack(line.date_creation);
              line.date_charge = null;
              loadRequestLines0.push(line);
            }
          });
        } else if (load.status == 50) {
          const laod_code = load.load_request_code;
          loadRequest50.push(laod_code);
        } else if (load.status == -10) {
          const laod_code = load.load_request_code;
          loadRequestM10.push(laod_code);
        }
      }

      console.log('LOAD REQUESTS END');
      const createdLoadRequestes = await loadRequestService.createMultipleLoadRequests(loadRequest0);
      console.log('LOAD REQUESTS LINES CREATION');
      const createdloadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines(loadRequestLines0);
      console.log('LOAD REQUESTS LINES CREATION END');
      console.log('LOAD REQUESTS STATUS 50 UPDATE');
      if (loadRequest50.length > 0) {
        for (const load of loadRequest50) {
          const updatedLoad = await loadRequestService.updateLoadRequestStatusToX(load, 50);
        }
      }
      console.log('LOAD REQUESTS STATUS 50 UPDATE END');
      console.log('LOAD REQUESTS STATUS -10 UPDATE');
      if (loadRequestM10.length > 0) {
        for (const load of loadRequestM10) {
          const updatedLoad = await loadRequestService.updateLoadRequestStatusToX(load, -10);
        }
      }
      console.log('LOAD REQUESTS STATUS -10 UPDATE END ');
    }

    console.log('CREATING UNLOAD REQUESTS AND THEIR DETAILS');
    if (data.unloadRequests) {
      const unloadRequestes = data.unloadRequests;
      const unloadRequestsDetails = data.unloadRequestsDetails;
      unloadRequestes.forEach(load => {
        load.date_creation = formatDateFromMobileToBackAddTimezone(load.date_creation);
      });
      unloadRequestsDetails.forEach(detail => {
        if (detail.date_expiration != null || detail.date_expiration != '') {
          detail.date_expiration = formatDateOnlyFromMobileToBack(detail.date_expiration);
        }
      });
      const loadRequestService = Container.get(UnloadRequestService);
      const createdUnloadRequests = await loadRequestService.createMultipleUnoadRequests(unloadRequestes);
      if (createdUnloadRequests) {
        const createdUnloadRequestsDetails = await loadRequestService.createMultipleUnoadRequestsDetails(
          unloadRequestsDetails,
        );
      }
    }
    console.log('CREATING UNLOAD REQUESTS AND THEIR DETAILS END ');

    // INVENTORY & INVENTORY LINE
    if (data.inventaires) {
      console.log('INVENTORIES CREATION');
      const inventories = data.inventaires;
      inventories.forEach(inventory => {
       // console.log(inventory);
        inventory.the_date = formatDateFromMobileToBackAddTimezone(inventory.the_date);
      });
      const inventoriesCreated = await userMobileServiceInstanse.createInventories(inventories);
      console.log('INVENTORIES CREATION END');
      //console.log(inventories)
      if (inventoriesCreated) {
        console.log('INVENTORIES LINES CREATION');
        const inventoriesLines = data.inventairesLines;
        inventoriesLines.forEach(line => {
          if (isNull(line.expiring_date)) {
           // console.log('say something');
          } else {
            line.expiring_date = formatDateOnlyFromMobileToBack(line.expiring_date);
          }
        });
        const inventoriesLinesCreated = await userMobileServiceInstanse.createInventoriesLines(inventoriesLines);
        console.log('INVENTORIES LINES CREATION END');
      }
    }

    socket.emit('dataUpdated');
    // socket.closed()
    console.log("end synchro")
  });
  }
  catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
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
    if (req.body.customers.length > 0) {
      // console.log(req.body.customers)
      for (const customer of req.body.customers) {
        if (customer.changed == 1) {
          const udpatedCustomer = await userMobileServiceInstanse.updateCustomer(customer, {
            customer_code: customer.customer_code,
          });
        }
        if (customer.changed == 2) {
          delete customer.id;
          delete customer.changed;
          const createdCustomer = await userMobileServiceInstanse.createCustomer(customer);
        }
      }
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
};

function formatDateOnlyFromBackToMobile(timeString) {
  let str = '';
  //console.log(' timeString ' + timeString);
  if (timeString != null) {
    let dateComponents = timeString.split('-');
    str = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
   // console.log("date loadrequest",str)
  }
  return str;
}

function formatDateFromBackToMobile(date) {
  let str = '';
  if (date != null) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    str =
      d +
      '-' +
      m +
      '-' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0');
  }

  return str;
}

function formatDateFromMobileToBackAddTimezone(timeString) {
  let str :any ;
  if (timeString != null) {
    let elements = timeString.split(' ');
    let dateComponents = elements[0].split('-');
    str = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0] + ' ' + elements[1] + '.63682+01';
  }
  return str;
}

function formatDateOnlyFromMobileToBack(timeString) {
  let str = '';
  if (timeString != null) {
    let dateComponents = timeString.split('-');
    str = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
  }
 // console.log(' inside format date to back '+str)
  return str;
}

const findAllInvoice = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const customerMobileServiceInstance = Container.get(CustomersMobileSercice);

   console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where: { period_active_date: { [Op.between]: [req.body.date, req.body.date1]}},
        attributes: {
          include: [[Sequelize.literal(' amount - due_amount'), 'Credit']], },
      });
      for (let inv of invoices) {
        const  customer = await customerMobileServiceInstance.findOne({customer_code:inv.customer_code})
        console.log(customer)
          inv.Nom = customer.customer_name
  
      }
    } else {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where : {site: req.body.site, period_active_date: { [Op.between]: [req.body.date, req.body.date1]}} ,
          attributes: {
          include: [[Sequelize.literal(' amount - due_amount'), 'Credit']] },
      });
     
    }
    for (let inv of invoices) {
      const  customer = await customerMobileServiceInstance.findOne({customer_code:inv.customer_code})
      console.log(customer.customer_name)
        inv.sdelivery_note_code = customer.customer_name

    }
    console.log(invoices)
    //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoices });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllInvoiceRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

   console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where: {  role_code:req.body.role,period_active_date: { [Op.between]: [req.body.date, req.body.date1]}},
        attributes: {
          include: [[Sequelize.literal(' amount - due_amount'), 'Credit']], },
      });
    } else {
      var invoices = await userMobileServiceInstance.getAllInvoice({
        where: { site: req.body.site, role_code:req.body.role,period_active_date: { [Op.between]: [req.body.date, req.body.date1]} },
          attributes: {
          include: [[Sequelize.literal(' amount - due_amount'), 'Credit']], },
      });
     // console.log("here",invoices)
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
const findRoleByuser = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find Role By user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
 
  try {
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer")
    const loadRequestService = Container.get(LoadRequestService);
    const roles = await loadRequestService.findAllRolesByUpperRoleCode({ upper_role_code: user_code });
    var data = [];
    for (let code of roles) {
      data.push({ value: code.role_code, label:code.role_code });
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
 // console.log('rrrrrrrrrrrrrrrrrr', req.body);
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    var invoicesline = await userMobileServiceInstance.getInvoiceLineBy({
      where: { invoice_code: req.body.invoicecode },
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
        period_active_date: { [Op.between]: [req.body.date, req.body.date1] },
      });
    } else {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
        site: req.body.site,
        period_active_date: { [Op.between]: [req.body.date, req.body.date1] },
      });
    }
    console.log('invoices', invoices);

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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    // 
    if (req.body.site == '*') {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: { periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
      });
    } else {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: { site: req.body.site, periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
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

const findVisitByRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    // 
    if (req.body.site == '*') {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: { role_code:req.body.role,periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
      });
    } else {
      var visits = await userMobileServiceInstance.getVisitsBy({
        where: { role_code:req.body.role,site: req.body.site, periode_active_date: { [Op.between]: [req.body.date, req.body.date1] } },
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
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

    return res.status(200).json({ data: user.password });
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

    console.log('getting all visits');
    const visits = await userMobileServiceInstance.getAllVisits();

    return res.status(200).json({ data: visits });
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
    var secretKey = 'b4cb72173ee45d8c7d188e8f77eb16c2';
    let encryptedValue = CryptoJS.AES.encrypt('123456', secretKey).toString();
    console.log('encrypt  ' + encryptedValue);

    return res.status(200).json({ data: encryptedValue });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getDashboardAddData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getDashboardAddDataendpoint');
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);
    const itemServiceInstance = Container.get(ItemService);

    const { start_date, end_date } = req.body;

    var services_data = await userMobileServiceInstance.getServices(start_date, end_date);
    var invoices = await userMobileServiceInstance.getInvoices(start_date, end_date, [
      'invoice_code',
      'customer_code',
      'role_code',
      'amount',
    ]);
    var payments = await userMobileServiceInstance.getPaymentsByDates(start_date, end_date, [
      'customer_code',
      'role_code',
      'amount',
      'service_code',
    ]);
    var items = await itemServiceInstance.findAll();

    const filtered_services = _.mapValues(_.groupBy(services_data, 'role_code'));
    const filtered_services_by_day = _.mapValues(_.groupBy(services_data, 'service_period_activate_date'));

    payments.forEach(async payment => {
      const service = await userMobileServiceInstance.getService({ service_code: payment.dataValues.service_code });
      if (service != null) {
        payment.dataValues.nb_visits = service.nb_visits;
      }
    });
    const filtered_payments = _.mapValues(_.groupBy(payments, 'customer_code'));

    let services = [];
    for (const key in filtered_services) {
      let nb_visits = 0,
        nb_clients_itin = 0,
        nb_invoice = 0,
        nb_products_sold = 0,
        nb_products_loaded = 0,
        nb_clients_created = 0,
        sum_invoice = 0;
      filtered_services[key].forEach(elem => {
        nb_visits += elem.nb_visits;
        nb_clients_itin += elem.nb_clients_itin;
        nb_invoice += elem.nb_invoice;
        nb_products_sold += elem.nb_products_sold;
        nb_products_loaded += elem.nb_products_loaded;
        nb_clients_created += elem.nb_clients_created;
        sum_invoice += elem.sum_invoice;
      });

      services.push({
        role_code: key,
        nb_visits: nb_visits,
        nb_clients_itin: nb_clients_itin,
        nb_invoice: nb_invoice,
        nb_products_sold: nb_products_sold,
        nb_products_loaded: nb_products_loaded,
        nb_clients_created: nb_clients_created,
        sum_invoice: sum_invoice,
      });
    }

    // *************** 1 *******************
    let sum_visit_rate = 0;
    let visit_rate_data = [];
    let sum_nb_visits = 0; // used in 2
    let sum_nb_clients = 0; // clients_itin

    // *************** 2 *******************
    let sucess_rate_data = [];
    let sum_nb_invoices = 0;

    // *************** 3 *******************
    let sum_nb_products_sold = 0;
    let distribution_rate_data = [];

    //  *************** 4
    let integration_data = [];
    // ***************
    let sum_invoice_amount = 0;

    let ca_itin_data = [];

    let ca_new_client_data = [];

    // 7
    let sum_nb_clients_created = 0;

    // 10
    let recovery_rate_data = [];

    // populating integration data
    for (const key in filtered_services_by_day) {
      let sum_nb_clients_itin = 0,
        sum_nb_clients_created = 0;

      filtered_services_by_day[key].forEach(elem => {
        sum_nb_clients_itin += elem.nb_clients_itin;
        sum_nb_clients_created += elem.nb_clients_created;
      });

      integration_data.push({
        day: key,
        nb_clients_itin: sum_nb_clients_itin,
        sum_nb_client_created: sum_nb_clients_created,
        total: sum_nb_clients_itin + sum_nb_clients_created,
      });
    }

    // RECOVERY RATE
    let customers_data_with_clusters = [];
    for (const key in filtered_payments) {
      let sum_nb_visits = 0,
        sum_amount = 0;

      const customer = await userMobileServiceInstance.getCustomerBy({ customer_code: key });

      filtered_payments[key].forEach(elem => {
        sum_nb_visits += elem.nb_visits;
        sum_amount += elem.amount;
      });
      customers_data_with_clusters.push({
        customer_code: key,
        sum_payment_amount: sum_amount,
        sum_nb_visits: sum_nb_visits,
        cluster: customer.dataValues.cluster_code,
        sub_cluster: customer.dataValues.sub_cluster_code,
      });
      // recovery_rate_data.push({
      //   cluster : key ,
      //   sum_payment_amount : sum_amount,
      //   sum_nb_visits : sum_nb_visits,
      // })
    }

    const filtered_customers_data_clusters = _.mapValues(_.groupBy(customers_data_with_clusters, 'cluster'));
    // recovery_rate_data = filtered_customers_data_clusters
    for (const key in filtered_customers_data_clusters) {
      let sum = 0,
        l = [];

      filtered_customers_data_clusters[key].forEach(elem => {
        sum += elem.sum_payment_amount;
        l.push({
          cluster: elem.sub_cluster,
          sum: elem.sum_payment_amount,
        });
      });

      recovery_rate_data.push({
        cluster: key,
        sum: sum,
        breakdown: l,
      });
    }

    services.forEach(service => {
      sum_nb_visits += service.nb_visits;
      sum_nb_clients += service.nb_clients_itin;
      sum_invoice_amount += service.sum_invoice;
      sum_nb_invoices += service.nb_invoice;
      sum_nb_products_sold += service.nb_products_sold;
      sum_nb_clients_created += service.nb_clients_created;

      // sum_nb_visits += service.nb_visits;
      // sum_nb_clients += service.nb_clients_itin;
      // sum_invoice_amount += 1;
      // sum_nb_invoices += 1;
      // sum_nb_products_sold += 1;
      // sum_nb_clients_created += 1;
    });

    console.log(sum_nb_visits, sum_nb_clients);
    services.forEach(service => {
      // **************** 1 VISIT RATE
      // CALCULATE : visit rate of each role
      let visit_rate = parseFloat(((service.nb_visits / service.nb_clients_itin) * 100).toFixed(2));

      console.log(visit_rate);
      // visit rate of roles
      visit_rate_data.push({
        role_code: service.role_code,
        visit_rate: visit_rate,
        unvisited_rate: parseFloat((100 - visit_rate).toFixed(2)),
      });

      // **************** 2 SUCCESS RATE

      sucess_rate_data.push({
        role_code: service.role_code,
        nb_clients: service.nb_clients_itin,
        nb_invoice: service.nb_invoice,
        nb_visits: service.nb_visits,
      });

      // **************** 3 DISTRIBUTION RATE

      distribution_rate_data.push({
        role_code: service.role_code,
        // nb_products_sold : 0,
        nb_products_sold: service.nb_products_sold,
        nb_products: items.length,
        nb_products_loaded: service.nb_products_loaded,
        // nb_products_loaded : 0
      });

      //****************** 4 */ later

      //*****************  5 below
      //****************** 6 */
      service.nb_visits = 1;
      ca_itin_data.push({
        role_code: service.role_code,
        ca_iti: parseFloat((sum_invoice_amount / service.nb_visits).toFixed(2)),
      });

      //****************** 7 */
      ca_new_client_data.push({
        role_code: service.role_code,
        ca_new_client: parseFloat((service.sum_invoice / service.nb_clients_created).toFixed(2)),
      });
    });

    // ************** 8 *****************
    const filtered_invoices_by_customer = _.mapValues(_.groupBy(invoices, 'customer_code'));
    let customers_codes = [];

    let customers_data = [];
    for (const key in filtered_invoices_by_customer) {
      customers_codes.push(key);
      var customer = await userMobileServiceInstance.getCustomerBy({ customer_code: key });
      let sum = 0;
      filtered_invoices_by_customer[key].forEach(elem => {
        sum += elem.dataValues.amount;
      });
      customers_data.push({
        customer_code: key,
        amount: sum,
        cluster_code: customer.dataValues.cluster_code,
      });
    }

    const filtered_data_by_clustes = _.mapValues(_.groupBy(customers_data, 'cluster_code'));
    let clusters = [];
    for (const key in filtered_data_by_clustes) {
      let sum = 0;
      customers_data.forEach(customer => {
        if (customer.cluster_code === key) sum += customer.amount;
      });
      clusters.push({
        cluster_code: key,
        amount: sum,
      });
    }

    // ************** 9 *****************
    const invoices_filtered_by_code = _.mapValues(_.groupBy(invoices, 'invoice_code'));

    let invoices_lines = [];
    for (const key in invoices_filtered_by_code) {
      let invoice_lines = await userMobileServiceInstance.getInvoiceLineByWithSelectedFields(
        { where: { invoice_code: key } },
        ['product_code', 'unit_price', 'quantity'],
      );
      invoices_lines.push(...invoice_lines);
    }

    const filtered_products = _.mapValues(_.groupBy(invoices_lines, 'product_code'));
    let products_data = [],
      ca_products_data = [];
    let qnt = 0;

    for (const key in filtered_products) {
      let product_type = await userMobileServiceInstance.getProductType(key);
      let sum = 0;
      filtered_products[key].forEach(elem => {
        sum += elem.quantity * elem.unit_price;
        qnt += elem.quantity;
      });

      products_data.push({
        product_code: key,
        sum: sum,
        type: product_type.dataValues.pt_part_type,
      });

      // console.log(products_data)
    }

    const filtered_types = _.mapValues(_.groupBy(products_data, 'type'));
    // console.log(filtered_types)
    for (const key in filtered_types) {
      let l = [],
        sum = 0;

      filtered_types[key].forEach(elem => {
        sum += elem.sum;
        l.push({
          product_code: elem.product_code,
          sum: elem.sum,
        });
      });

      ca_products_data.push({
        type: key,
        sum: sum,
        breakdown: l,
      });
    }

    // **************** RESPONSE

    let visit_rate = parseFloat(((sum_nb_visits / sum_nb_clients) * 100).toFixed(2)); // 1
    let suc_visit_rate = parseFloat(((sum_nb_invoices / sum_nb_visits) * 100).toFixed(2)); // 2
    let suc_itin_rate = parseFloat(((sum_nb_invoices / sum_nb_clients) * 100).toFixed(2)); // 2
    let distribution_rate = parseFloat(((sum_nb_products_sold / items.length) * 100).toFixed(2)); // 3
    // 4 ... later
    let ca_visit = parseFloat((sum_invoice_amount / sum_nb_visits).toFixed(2)); // 5
    let ca_new_clients = parseFloat((sum_invoice_amount / sum_nb_clients_created).toFixed(2)); // 7

    // SORT integration_data

    const sortedAsc = integration_data.sort((objA, objB) => Number(new Date(objA.day)) - Number(new Date(objB.day)));

    return res.status(200).json({
      visit_rate: visit_rate,
      visit_rate_data: visit_rate_data,
      success_rate_visit: suc_visit_rate,
      success_rate_itin: suc_itin_rate,
      sucess_rate_data: sucess_rate_data,
      distribution_rate_data: distribution_rate_data,
      distribution_rate: distribution_rate,
      ca_visit: ca_visit,
      ca_itin: ca_itin_data,
      ca_new_client_data: ca_new_client_data,
      ca_new_clients: ca_new_clients,
      ca_clusters_data: clusters,
      integration_data: sortedAsc,
      products_data: ca_products_data,
      recovery_rate_data: recovery_rate_data,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findPaymentByService = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    

    var invoices = await userMobileServiceInstance.getPaymentsByGroup({
      where: req.body,
      attributes: ['service_code', [Sequelize.fn('sum', Sequelize.col('amount')), 'amt']],

      group: ['service_code'],
      raw: true,
    });

    console.log('invoices', invoices);

    //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoices });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findAllInvoicewithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const Sequelize = Container.get("sequelize")
  const{user_domain} = req.headers
  const userMobileServiceInstance = Container.get(UserMobileService);

    
 // console.log("reqrrrrrrrrrrrrrrr",req.body)
  logger.debug("Calling find all invoiceOrder endpoint")
  try {
      let result = []
      //const invoiceOrderServiceInstance = Container.get(invoiceOrderService)
      if (req.body.site == '*') {
      var invs =await Sequelize.query("SELECT (PUBLIC.aa_invoiceLine.unit_price * PUBLIC.aa_invoiceLine.quantity) as amount, PUBLIC.aa_invoiceLine.id as id ,PUBLIC.aa_invoice.invoice_code,PUBLIC.aa_invoice.site,PUBLIC.aa_invoice.period_active_date,PUBLIC.aa_invoice.role_code,PUBLIC.aa_invoice.user_code,PUBLIC.aa_invoice.itinerary_code,PUBLIC.aa_invoice.customer_code,PUBLIC.aa_invoice.service_code,PUBLIC.aa_customer.customer_name,PUBLIC.aa_invoiceline.product_code,PUBLIC.aa_invoiceline.quantity ,PUBLIC.aa_invoiceline.lot,PUBLIC.aa_invoiceline.designation  FROM   PUBLIC.aa_invoice,  PUBLIC.aa_invoiceline, PUBLIC.aa_customer FROM   PUBLIC.aa_invoice, PUBLIC.pt_mstr, PUBLIC.aa_invoiceline, PUBLIC.aa_customer  where PUBLIC.aa_invoiceline.invoice_code = PUBLIC.aa_invoice.invoice_code and PUBLIC.aa_invoiceline.product_code = PUBLIC.pt_mstr.pt_part and PUBLIC.pt_mstr.pt_domain = ? and  PUBLIC.aa_invoice.period_active_date >= ? and PUBLIC.aa_invoice.period_active_date <= ? and PUBLIC.aa_invoice.customer_code = PUBLIC.aa_customer.customer_code ORDER BY PUBLIC.aa_invoiceline.id DESC", { replacements: [req.body.date,req.body.date1], type: QueryTypes.SELECT });
     
    } else {

      var invs =await Sequelize.query("SELECT (PUBLIC.aa_invoiceLine.unit_price * PUBLIC.aa_invoiceLine.quantity * 1.2019) as amount, PUBLIC.aa_invoiceLine.id as id ,PUBLIC.aa_invoice.invoice_code,PUBLIC.aa_invoice.site,PUBLIC.aa_invoice.period_active_date,PUBLIC.aa_invoice.role_code,PUBLIC.aa_invoice.user_code,PUBLIC.aa_invoice.itinerary_code,PUBLIC.aa_invoice.customer_code,PUBLIC.aa_invoice.service_code,PUBLIC.aa_customer.customer_name,PUBLIC.aa_invoiceline.product_code,PUBLIC.aa_invoiceline.quantity ,PUBLIC.aa_invoiceline.lot,PUBLIC.aa_invoiceline.designation  FROM   PUBLIC.aa_invoice,  PUBLIC.aa_invoiceline, PUBLIC.aa_customer  where PUBLIC.aa_invoice.site = ? and PUBLIC.aa_invoiceline.invoice_code = PUBLIC.aa_invoice.invoice_code  and  PUBLIC.aa_invoice.period_active_date >= ? and PUBLIC.aa_invoice.period_active_date <= ? and PUBLIC.aa_invoice.customer_code = PUBLIC.aa_customer.customer_code ORDER BY PUBLIC.aa_invoiceline.id DESC", { replacements: [req.body.site,req.body.date,req.body.date1], type: QueryTypes.SELECT });
   //  console.log("inv",invs)
    //  var invs =await Sequelize.query('select * from PUBLIC.aa_invoiceline', {type: QueryTypes.SELECT });
   //const invoiceLine = await userMobileServiceInstance.getInvoiceLineBy({});
   // console.log(invs)
    }
    
    //console.log("iiiiiiiiiiiiiiii",invs)
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: invs })
          
          
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  } 
}
const findAllInvoicewithDetailsRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const Sequelize = Container.get("sequelize")
  const{user_domain} = req.headers
  const userMobileServiceInstance = Container.get(UserMobileService);

    
  console.log("req",req.body)
  logger.debug("Calling find all invoiceOrder endpoint")
  try {
      let result = []
      //const invoiceOrderServiceInstance = Container.get(invoiceOrderService)
      if (req.body.site == '*') {
      var invs =await Sequelize.query("SELECT (PUBLIC.aa_invoiceline.unit_price * PUBLIC.aa_invoiceline.quantity * 1.2019) as amount, PUBLIC.aa_invoiceline.id as id ,PUBLIC.aa_invoice.invoice_code,PUBLIC.aa_invoice.site,PUBLIC.aa_invoice.period_active_date,PUBLIC.aa_invoice.role_code,PUBLIC.aa_invoice.user_code,PUBLIC.aa_invoice.itinerary_code,PUBLIC.aa_invoice.customer_code,PUBLIC.aa_invoice.service_code,PUBLIC.aa_customer.customer_name,PUBLIC.aa_invoiceline.product_code,PUBLIC.aa_invoiceline.quantity ,PUBLIC.aa_invoiceline.lot,PUBLIC.aa_invoiceline.designation   FROM   PUBLIC.aa_invoice,  PUBLIC.aa_invoiceline , PUBLIC.aa_customer where PUBLIC.aa_invoice.role_code IN ? and PUBLIC.aa_invoiceline.invoice_code = PUBLIC.aa_invoice.invoice_code and  PUBLIC.aa_invoice.period_active_date >= ? and PUBLIC.aa_invoice.period_active_date <= ? and PUBLIC.aa_invoice.customer_code = PUBLIC.aa_customer.customer_code and PUBLIC.aa_invoice.customer_code = PUBLIC.aa_customer.customer_code  ORDER BY PUBLIC.aa_invoiceline.id DESC", { replacements: [[req.body.role],req.body.date,req.body.date1], type: QueryTypes.SELECT });
     
    } else {

      var invs =await Sequelize.query("SELECT (PUBLIC.aa_invoiceline.unit_price * PUBLIC.aa_invoiceline.quantity * 1.2019) as amount, PUBLIC.aa_invoiceline.id as id ,PUBLIC.aa_invoice.invoice_code,PUBLIC.aa_invoice.site,PUBLIC.aa_invoice.period_active_date,PUBLIC.aa_invoice.role_code,PUBLIC.aa_invoice.user_code,PUBLIC.aa_invoice.itinerary_code,PUBLIC.aa_invoice.customer_code,PUBLIC.aa_invoice.service_code,PUBLIC.aa_customer.customer_name,PUBLIC.aa_invoiceline.product_code,PUBLIC.aa_invoiceline.quantity ,PUBLIC.aa_invoiceline.lot,PUBLIC.aa_invoiceline.designation   FROM   PUBLIC.aa_invoice, PUBLIC.aa_invoiceline ,  PUBLIC.aa_customer where PUBLIC.aa_invoice.role_code IN ? and  PUBLIC.aa_invoice.site = ? and PUBLIC.aa_invoiceline.invoice_code = PUBLIC.aa_invoice.invoice_code  and  PUBLIC.aa_invoice.period_active_date >= ? and PUBLIC.aa_invoice.period_active_date <= ? and PUBLIC.aa_invoice.customer_code = PUBLIC.aa_customer.customer_code ORDER BY PUBLIC.aa_invoiceline.id DESC", { replacements:[[req.body.role],req.body.site,req.body.date,req.body.date1], type: QueryTypes.SELECT });
     
    //  var invs =await Sequelize.query('select * from PUBLIC.aa_invoiceline', {type: QueryTypes.SELECT });
   //const invoiceLine = await userMobileServiceInstance.getInvoiceLineBy({});
   // console.log(invs)
    }
    console.log(invs[1])
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: invs })
          
          
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  } 
}

const findPaymentByRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const userMobileServiceInstance = Container.get(UserMobileService);

    console.log(req.body);
    if (req.body.site == '*') {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
        period_active_date: { role_code:req.body.role,[Op.between]: [req.body.date, req.body.date1] },
      });
    } else {
      var invoices = await userMobileServiceInstance.getPaymentsBy({
        role_code:req.body.role,
        site: req.body.site,
        period_active_date: { [Op.between]: [req.body.date, req.body.date1] },
      });
    }
    console.log('invoices', invoices);

    //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: invoices });
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
  testHash,
  getDashboardAddData,
  findPaymentByService,
  findAllInvoicewithDetails,
  findAllInvoicewithDetailsRole,
  findAllInvoiceRole,
  findRoleByuser,
  findPaymentByRole,
  findVisitByRole,
};
