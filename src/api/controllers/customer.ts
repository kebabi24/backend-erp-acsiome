import CustomerService from '../../services/customer';
import AccountReceivableService from '../../services/account-receivable';
import accountShiperService from '../../services/account-shiper';
import addresseService from '../../services/address';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
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
    const customerr = await customerServiceInstance.create({
      cm_addr: customer.customer_phone_one,
      cm_sort: customer.customer_name,
      cm_high_date: customer.customer_birthday,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    const addr = await adresseServiceInstance.create({
      ad_addr: customer.customer_phone_one,
      ad_name: customer.customer_name,
      ad_line1: customer.customer_addr,
      ad_type: 'customer',
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
  const logger = Container.get("logger")
  const{user_code} = req.headers

  logger.debug("Calling Create customer endpoint with body: %o", req.body)
  try {
      const customerServiceInstance = Container.get(CustomerService)
      const complaintData = req.body.complaintData
      const customerData = req.body.customerData
      const complaintDetailsData = req.body.complaintDetailsData
      console.log(req.body)
      // created_by:user_code
      let today = new Date();
      let now =  today.getFullYear()  +'-'+ (today.getMonth()+1)  +'-'+ today.getDate()   +' '+today.getHours()+':'+String(today.getMinutes()).padStart(2,"0")+':'+String(today.getSeconds()).padStart(2,"0");
      let complaint_date = now+'.63682+01'
      let hash = Math.floor(1000 + Math.random() * 9000);
      let complaint_code = Date.now()+'-code-'+hash.toString()

      // CREATE COMPLAINT 
      const complaint = await customerServiceInstance.createComplaint({...complaintData , complaint_date :complaint_date, complaint_code:complaint_code ,status:'open'})
      
      // CREATE COMPLAINT DETAILS 
      complaintDetailsData.forEach(detail => {
          detail.complaint_code = complaint_code
      });
      const complaintDetails = await customerServiceInstance.createComplaintDetails(complaintDetailsData)

      // CREATE CUSTOMER IF EXIST 
      if( Object.keys(customerData).length > 0){
          const customer = await customerServiceInstance.createCustomer(customerData)
      }
      return res
          .status(201)
          .json({ message: "created succesfully", data: { complaint } })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }

}

const findCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling find one  customer endpoint")
  try {
      const customerServiceInstance = Container.get(CustomerService)
      
      const {phone} = req.params
      const customer = await customerServiceInstance.findCustomer(phone)
      console.log(customer)
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: customer  })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const findOder = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling find one  order endpoint")
  try {
      const customerServiceInstance = Container.get(CustomerService)
      
      const {order_code} = req.params
      const order = await customerServiceInstance.findOrder(order_code)
      console.log(order)
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: order  })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const getReclamationCauses = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling get reclamation causes endpoint")
  try {
      const customerServiceInstance = Container.get(CustomerService)
   
      const causes = await customerServiceInstance.getReclamationCauses()
      console.log(causes)
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: causes  })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const createSatisfaction = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const{user_code} = req.headers

  logger.debug("Calling createSatisfaction endpoint with body: %o", req.body)
  try {
      const customerServiceInstance = Container.get(CustomerService)

      const satisfactionData = req.body.satisfactionData
      const complaintDetailsData = req.body.complaintDetailsData
      const order_code = satisfactionData.order_code

      // created_by:user_code
      let today = new Date();
      let now =  today.getFullYear()  +'-'+ (today.getMonth()+1)  +'-'+ today.getDate()   +' '+today.getHours()+':'+String(today.getMinutes()).padStart(2,"0")+':'+String(today.getSeconds()).padStart(2,"0");
      let hash = Math.floor(1000 + Math.random() * 9000);

      let satisfaction_date = now+'.63682+01'
      let satisfaction_code = Date.now()+'-code-'+hash.toString()

      // CREATE SATISFACTION 
      const satisfaction = await customerServiceInstance.createSatisfaction({...satisfactionData , satisfaction_date :satisfaction_date, satisfaction_code:satisfaction_code })
      
      // THERE IS A COMPLAINT 
      if( complaintDetailsData.length > 0){
          // CREATE COMPLAINT 
          const complaint = await customerServiceInstance.createComplaint({ complaint_date :satisfaction_date, complaint_code:satisfaction_code ,status:'open' , order_code:order_code })
          // CREATE COMPLAINT DETAILS 
          complaintDetailsData.forEach(detail => {
              detail.complaint_code = satisfaction_code
          });
          const complaintDetails = await customerServiceInstance.createComplaintDetails(complaintDetailsData)
      }

     
      return res
          .status(201)
          .json({ message: "created succesfully", data: { satisfaction } })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }

}



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
  createComplaint,
  findCustomer,
  findOder,
  getReclamationCauses,
  createSatisfaction,
};
