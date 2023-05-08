import LocationService from '../../services/location';
import LocationFilterProducts from '../../services/location-filter';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  // logger.debug("Calling Create location endpoint")
  try {
    const locationServiceInstance = Container.get(LocationService);
    const locationFilterInstance = Container.get(LocationFilterProducts);
    const { _location, details } = req.body;
    // console.log(' req body '+req.body._location+' det '+req.body.details)
    const location = await locationServiceInstance.create({
      ..._location,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (const product of details) {
      // const { pt_part, loc_loc,loc_site,color,model,qlty,logo,grammage } = product;

      await locationFilterInstance.create({
        loc_part: product.loc_part,
        loc_loc: product.loc_loc,
        loc_site: product.loc_site,
        color: product.color,
        model: product.model,
        quality: product.quality,
        logo: product.logo,
        grammage: product.grammage,
        //   wo_due_date: new Date(),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(201).json({ message: 'created succesfully', data: location });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  location endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const locationServiceInstance = Container.get(LocationService);
    const { id } = req.params;
    const location = await locationServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: location });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all location endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const locationServiceInstance = Container.get(LocationService);
    const locations = await locationServiceInstance.find({ loc_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locations });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all location endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const locationServiceInstance = Container.get(LocationService);
    const locations = await locationServiceInstance.find({ ...req.body, loc_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locations });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all location endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const locationServiceInstance = Container.get(LocationService);
    const locations = await locationServiceInstance.findOne({ ...req.body, loc_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locations });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all location endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const locationServiceInstance = Container.get(LocationService);

    const locations = await locationServiceInstance.find({
      ...req.body,
      loc_domain: user_domain,
    });
    return res.status(202).json({
      message: 'sec',
      data: locations,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  location endpoint');
  try {
    const locationServiceInstance = Container.get(LocationService);
    const locationFilterInstance = Container.get(LocationFilterProducts);
    const { _location, details } = req.body;
    const deletePt = await locationFilterInstance.delete({ loc_loc: _location.loc_loc, loc_site: _location.loc_site });

    const { id } = req.params;
    const location = await locationServiceInstance.update(
      { ..._location, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    for (const product of details) {
      // const { pt_part, loc_loc,loc_site,color,model,qlty,logo,grammage } = product;

      await locationFilterInstance.create({
        loc_part: product.loc_part,
        loc_loc: product.loc_loc,
        loc_site: product.loc_site,
        color: product.color,
        model: product.model,
        quality: product.quality,
        logo: product.logo,
        grammage: product.grammage,
        //   wo_due_date: new Date(),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(200).json({ message: 'fetched succesfully', data: location });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  location endpoint');
  try {
    const locationServiceInstance = Container.get(LocationService);
    const { id } = req.params;
    const location = await locationServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findProducts = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  try {
    const locationFilterInstance = Container.get(LocationFilterProducts);

    const products = await locationFilterInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: products });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteListPt = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  location endpoint');
  try {
    const locationServiceInstance = Container.get(LocationFilterProducts);
    // const {id} = req.params
    const list = await locationServiceInstance.delete({ ...req.body });
    return res.status(200).json({ message: 'deleted succesfully', data: list });
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
  update,
  deleteOne,
  findByAll,
  findProducts,
};
function LocationFilterService(LocationFilterService: any) {
  throw new Error('Function not implemented.');
}
