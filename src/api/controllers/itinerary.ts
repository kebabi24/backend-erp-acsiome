import ItineraryService from '../../services/itinerary';
import CustomerItineraryService from '../../services/customer-itinerary';
import CustomerMobileService from '../../services/customer-mobile';
import ServiceMobileService from '../../services/mobile-service';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const { customers, itinerary } = req.body;

  logger.debug('Calling Create itn endpoint');
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const CustomerItineraryServiceInstance = Container.get(CustomerItineraryService);
    const itn = await ItineraryServiceInstance.create({
      ...itinerary,
      itinerary_day: Number(itinerary.itinerary_day),
      domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of customers) {
      entry = { customerId: entry, itineraryId: itn.id };
      await CustomerItineraryServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: { itn } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  itn endpoint'); 
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const { id } = req.params;
  
    const itn = await ItineraryServiceInstance.findOne({ itinerary_code: id });
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all itn endpoint');
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const itn = await ItineraryServiceInstance.find({});

    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all itn endpoint');
  try {
    
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const ServiceMobileServiceInstance = Container.get(ServiceMobileService);
    console.log(req.body)
    const services = await ServiceMobileServiceInstance.findS(req.body.date);

   
    return res.status(200).json({ message: 'fetched succesfully', data: services });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all itn endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const itn = await ItineraryServiceInstance.find({ ...req.body, domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByCust = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all itn endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const CustomerItineraryServiceInstance = Container.get(CustomerItineraryService);
    const CustomerMobileServiceInstance = Container.get(CustomerMobileService);
    const itn = await ItineraryServiceInstance.findOne({ ...req.body, domain: user_domain });
    // console.log(itn)
    let result = []
if(itn!= null) {
 var customers = await CustomerItineraryServiceInstance.find({itinerary_code:itn.itinerary_code});
 let i=1
 for (let cust of customers) {
  const custom = await CustomerMobileServiceInstance.findOne({customer_code:cust.customer_code});
 
  result.push({id : i, customer_code: custom.customer_code,customer_name:custom.customer_name,bare_code: custom.customer_barcode})
  i++
 }
//  console.log(result)
}
    return res.status(200).json({ message: 'fetched succesfully', data: {itn,result }});
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  itn endpoint');
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const CustomerItineraryServiceInstance = Container.get(CustomerItineraryService);
    const { id } = req.params;
    const itn = await ItineraryServiceInstance.update(
      { ...req.body.itinerary, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { itinerary_code: id },
    );
    const dl = await CustomerItineraryServiceInstance.delete({ itinerary_code: id });
    const newCustomers = req.body.customers;
    for (let entry of newCustomers) {
      entry = { customer_code: newCustomers.customer_code, itinerary_code: itn.id };
      await CustomerItineraryServiceInstance.create({ entry });
    }
    return res.status(200).json({ message: 'fetched succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  itn endpoint');
  try {
    const ItineraryServiceInstance = Container.get(ItineraryService);
    const { id } = req.params;
    const itn = await ItineraryServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAll,
  getAllServices,
  findBy,
  findByCust,
  update,
  deleteOne,
};
