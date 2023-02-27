import CustomerService from '../../services/customer';
import AccountReceivableService from '../../services/account-receivable';
import accountShiperService from '../../services/account-shiper';
import addresseService from '../../services/address';
import crmService from '../../services/crm';
import SequenceService from '../../services/sequence';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
'use strict';
const nodemailer = require('nodemailer');
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create customer endpoint with body: %o', req.body);
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const customer = await customerServiceInstance.create({
      ...req.body,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: { customer } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCmPos = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { customer } = req.body;
  logger.debug('Calling Create customer endpoint with body: %o', req.body);
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const adresseServiceInstance = Container.get(addresseService);
    const addr = await adresseServiceInstance.create({
      ad_addr: customer.cm_addr,
      ad_name: customer.cm_sort,
      ad_line1: customer.cm_ar_sub,
      ad_type: 'customer',
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    const customerr = await customerServiceInstance.create({
      cm_addr: customer.cm_addr,
      cm_sort: customer.cm_sort,
      cm_high_cr: customer.cm_high_cr,
      cm_ar_sub: customer.cm_ar_sub,
      cm_ar_acct: customer.cm_ar_acct,
      cm_rmks: customer.cm_rmks,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    return res.status(201).json({ message: 'created succesfully', data: { customer } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const setLoyCm = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { customer_number, type } = req.body;
  const cart_number = Math.random()
    .toString(36)
    .slice(2);
  logger.debug('Calling Create customer endpoint with body: %o', req.body);
  try {
    const customerServiceInstance = Container.get(CustomerService);
    //const adresseServiceInstance = Container.get(addresseService);
    const customer = await customerServiceInstance.findOne({ cm_addr: customer_number });
    const customer_name = customer.dataValues.cm_sort;
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: '217.182.43.2',
      // port: 2096,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: 'contact@abracadabra-algeria.com', // generated ethereal user
        pass: 'Contact*999', // generated ethereal password
      },
      tls: { rejectUnauthorized: false },
    });
    // verify connection configuration
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
    // console.log(transporter);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'contact@abracadabra-algeria.com', // sender address
      to: 'abdelmounaim.kebabi@acsiome.tech', // list of receivers
      subject: 'Votre carte de fidélité ABRACADABRA est prête !', // Subject line
      text: 'Votre carte de fidélité ABRACADABRA est prête !', // plain text body
      html:
        'Bonjour ' +
        customer_name +
        ', notre équipe <b>ABRACADABRA</b> vous remercie pour votre confiance. Votre numéro de la carte de fidélité est le suivant:' +
        '<b>' +
        cart_number +
        '<b>', // html body
    });
    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    const customerr = await customerServiceInstance.update(
      {
        cm_disc_pct: '25',
        cm_sale_date: new Date(),
        cm_high_date: new Date(),
        cm_db: cart_number,
        cm_type: type,
      },
      { cm_addr: customer_number },
    );

    // ADD TO AGENDA
    // const crmServiceInstance = Container.get(crmService);
    // const sequenceServiceInstance = Container.get(SequenceService);
    // const param = await crmServiceInstance.getParamFilterd('fidelity');
    // const paramDetails = await crmServiceInstance.getParamDetails({ param_code: param.param_code });
    // const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB();
    // const addLine = await crmServiceInstance.createAgendaLine(customer_number, param, paramDetails, sequence);

    // console.log(addLine);

    return res.status(201).json({ message: 'created succesfully', data: null });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const { id } = req.params;
    const customer = await customerServiceInstance.findOne({ id });
    console.log(customer);
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const customers = await customerServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: customers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const customer = await customerServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getSolde = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const accountreceivableServiceInstance = Container.get(AccountReceivableService);
    const accountshiperServiceInstance = Container.get(accountShiperService);
    const customer = await customerServiceInstance.find({
      cm_addr: { [Op.between]: [req.body.cm_addr_1, req.body.cm_addr_2] },
    });

    const results_head = [];

    for (const cm of customer) {
      const accountreceivable = await accountreceivableServiceInstance.find({
        ar_cust: cm.cm_addr,
        ar_effdate: { [Op.between]: [req.body.date, new Date()] },
      });

      let solde = 0;
      for (const ar of accountreceivable) {
        solde = solde - Number(ar.ar_amt);
      }
      const accountshiper = await accountshiperServiceInstance.find({
        as_cust: cm.cm_addr,
        as_effdate: { [Op.between]: [req.body.date, new Date()] },
      });
      let solde_ship = 0;
      for (const as of accountshiper) {
        solde_ship = solde_ship - Number(as.as_mstr);
      }

      const result_head = {
        cm_addr_head: cm.cm_addr,
        cm_sort_head: cm.cm_sort,
        cm_balance: cm.cm_balance + solde,
        cm_ship_balance: cm.cm_ship_balance + solde_ship,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(200).json({ message: 'fetched succesfully', data: results_head });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const customer = await customerServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  logger.debug('Calling update one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const { id } = req.params;
    const customer = await customerServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const { id } = req.params;
    const customer = await customerServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// CONTROLLERS FOR : RECLAMATION + SATISFACTION

const createComplaint = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create customer endpoint with body: %o', req.body);
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const crmServiceInstance = Container.get(crmService);
    const sequenceServiceInstance = Container.get(SequenceService);

    const complaintData = req.body.complaintData;
    const customerData = req.body.customerData;
    const complaintDetailsData = req.body.complaintDetailsData;
    const req_code = await customerServiceInstance.getRecSeqNB();

    let makeTest = true 
    let createAgendaEvents = false

    let today = new Date();
    let now =
      today.getMonth() +
      1 +
      '/' +
      today.getDate() +
      '/' +
      today.getFullYear() +
      ' ' +
      today.getHours() +
      ':' +
      String(today.getMinutes()).padStart(2, '0') +
      ':' +
      String(today.getSeconds()).padStart(2, '0');
    let complaint_date = now + '.955+00';
    let date_code = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let complaint_code = date_code + '-' + req_code.toString();

    // CREATE COMPLAINT
    const complaint = await customerServiceInstance.createComplaint({
      ...complaintData,
      complaint_date: complaint_date,
      complaint_code: complaint_code,
      status: 'open',
      user_code: user_code,
    });

    // CREATE COMPLAINT DETAILS
    if (complaintDetailsData != null) {
      complaintDetailsData.forEach(detail => {

        if(makeTest){
          if(detail.method === ""){
            createAgendaEvents = true
            makeTest = false
            console.log("createAgendaEvents is true")
          }
        }

        detail.complaint_code = complaint_code;

      });
      const complaintDetails = await customerServiceInstance.createComplaintDetails(complaintDetailsData);
    }

    // CREATE CUSTOMER IF EXIST
    if (customerData != null) {
      if (Object.keys(customerData).length > 0) {
        const customer = await customerServiceInstance.createCustomer(customerData);
      }
    }

    // ADD TO AGENDA
    if(createAgendaEvents){
      let searchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
      const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB();
      const param = await crmServiceInstance.getParamFilterd("complaint")
      const paramDetails = await crmServiceInstance.getParamDetails({ param_code: param.param_code });
      const addLine = await crmServiceInstance.createAgendaLine(complaint.customer_phone, param, paramDetails, sequence);

      console.log(addLine)
      
    }

    return res.status(201).json({ message: 'created succesfully', data: { complaint } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);

    const { phone } = req.params;
    console.log(req.params);
    const customer = await customerServiceInstance.findCustomer(phone);
    console.log(customer);
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOder = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  order endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);

    const { order_code } = req.params;
    const order = await customerServiceInstance.findOrder(order_code);
    console.log(order);
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getReclamationCauses = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling get reclamation causes endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);

    const causes = await customerServiceInstance.getReclamationCauses();
    const causes_grouped = causes.filtered_causes;
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: causes.causes, filtered_causes: causes_grouped });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createSatisfaction = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling createSatisfaction endpoint with body: %o', req.body);
  try {
    const customerServiceInstance = Container.get(CustomerService);

    const satisfactionData = req.body.satisfactionData;
    const complaintDetailsData = req.body.complaintDetailsData;
    const order_code = satisfactionData.order_code;
    const req_code = await customerServiceInstance.getRecSeqNB();
    const sat_code = await customerServiceInstance.getSatSeqNB();

    // created_by:user_code
    let today = new Date();
    let now =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate() +
      ' ' +
      today.getHours() +
      ':' +
      String(today.getMinutes()).padStart(2, '0') +
      ':' +
      String(today.getSeconds()).padStart(2, '0');
    let date_code = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let complaint_code = date_code + '-' + req_code.toString();
    let satisfaction_code = date_code + '-' + sat_code.toString();

    let satisfaction_date = now + '.63682+01';

    // CREATE SATISFACTION
    const satisfaction = await customerServiceInstance.createSatisfaction({
      ...satisfactionData,
      satisfaction_date: satisfaction_date,
      satisfaction_code: satisfaction_code,
      user_code: user_code,
    });

    // THERE IS A COMPLAINT
    if (complaintDetailsData.length > 0) {
      // CREATE COMPLAINT
      const complaint = await customerServiceInstance.createComplaint({
        complaint_date: satisfaction_date,
        complaint_code: complaint_code,
        status: 'open',
        order_code: order_code,
        user_code: user_code,
        priority: 0,
      });
      // CREATE COMPLAINT DETAILS
      complaintDetailsData.forEach(detail => {
        detail.complaint_code = satisfaction_code;
      });
      const complaintDetails = await customerServiceInstance.createComplaintDetails(complaintDetailsData);
    }

    return res.status(201).json({ message: 'created succesfully', data: { satisfaction } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// FOR TESTS ONLY
const findCustomersBirthday = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);

    const customers = await customerServiceInstance.findCustomersBirthdate();
    return res.status(200).json({ message: 'fetched succesfully', count: customers.length, data: customers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// FOR CRM
const getComplaintData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  customer endpoint');
  try {
    const customerServiceInstance = Container.get(CustomerService);
    const { phone } = req.params;

    const complaint = await customerServiceInstance.getComplaintData(phone);
    return res.status(200).json({ message: 'fetched succesfully', data: complaint });
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
  findByAll,
  update,
  getSolde,
  deleteOne,
  createCmPos,
  setLoyCm,
  createComplaint,
  findCustomer,
  findOder,
  getReclamationCauses,
  createSatisfaction,
  findCustomersBirthday,
  getComplaintData,
};
