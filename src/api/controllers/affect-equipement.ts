import AffectEquipementService from '../../services/affect-equipement';
import { Router, Request, Response, NextFunction } from 'express';
import BkhService from '../../services/bkh';
import { Container } from 'typedi';
import { Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const ae = await affectEquipementServiceInstance.create({
      ...req.body,
      ae_domain:user_domain
     , created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: ae });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const { id } = req.params;
    const ae = await affectEquipementServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: ae });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const aes = await affectEquipementServiceInstance.find({ae_domain:user_domain});
    //  const si = require('systeminformation');
    //  si.networkInterfaces().then(data => console.log(data[0].mac));
    return res.status(200).json({ message: 'fetched succesfully', data: aes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const aes = await affectEquipementServiceInstance.find({ ...req.body ,ae_domain:user_domain});
    console.log(req.body)
    return res.status(200).json({ message: 'fetched succesfully', data: aes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const aes = await affectEquipementServiceInstance.findOne({ ...req.body ,ae_domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: aes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const { id } = req.params;
    const ae = await affectEquipementServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: ae });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const affectEquipementServiceInstance = Container.get(AffectEquipementService);
    const { id } = req.params;
    const code = await affectEquipementServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: true});
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBetweenDate = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers 
    try {
        let i = 0
 let result = []
        console.log(req.body)
        const affectEquipementServiceInstance = Container.get(AffectEquipementService);
        const bkhServiceInstance = Container.get(BkhService);
        const bkhs = await bkhServiceInstance.findbetween({
            where: { bkh_bank:req.body.bank,bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_type :'P'},
            bkh_domain: user_domain,
          });
        // for (let ar of arb) {
        //     const customer = await customerServiceInstance.findOne({cm_addr : ar.ar_bill})
        
        // result.push({id:i+1,ar_bill: ar.ar_bill, name: customer.address.ad_name,ar_effdate: ar.ar_effdate,ar_curr: ar.ar_curr, ar_cr_terms: ar.ar_cr_terms,ar_cr_})
        // i++
        // }
// console.log(arb[0].soldinit)

    
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bkhs })
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
  findByOne,
  update,
  deleteOne,
  findBetweenDate,
};
