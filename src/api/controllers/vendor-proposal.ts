import VendorProposalService from '../../services/vendor-proposal';
import VendorProposalDetailService from '../../services/vendor-proposal-detail';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling Create sequence endpoint');
  try {
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService);
    const { vendorProposal, vendorProposalDetail } = req.body;
    const vp = await vendorProposalServiceInstance.create({...vendorProposal,vp_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin});
    for (let entry of vendorProposalDetail) {
      entry = { ...entry,vpd_domain: user_domain, vpd_nbr: vp.vp_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin };
      await vendorProposalDetailServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: vp });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all vendorProposal endpoint');
  const{user_domain} = req.headers
  try {
    const result = [];
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService);
    const vendorProposals = await vendorProposalServiceInstance.find({
      ...req.body,vp_domain: user_domain
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: vendorProposals,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all vendorProposal endpoint');
  const{user_domain} = req.headers
  try {
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService);
    const vendorProposal = await vendorProposalServiceInstance.findOne({
      ...req.body,vp_domain: user_domain
    });
    let details = [];
    if (vendorProposal) {
      details = await vendorProposalDetailServiceInstance.find({
        vpd_domain:user_domain,
        vpd_nbr: vendorProposal.vp_nbr,
      });
    }

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { vendorProposal, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  vendorProposal endpoint');
  const{user_domain} = req.headers
  try {
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const { id } = req.params;
    const vendorProposal = await vendorProposalServiceInstance.findOne({ id });
    const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService);
    let details = [];
    if (vendorProposal) {
      details = await vendorProposalDetailServiceInstance.find({
        vpd_domain:user_domain,
        vpd_nbr: vendorProposal.vp_nbr,
      });
    }
    return res.status(200).json({
      message: 'fetched succesfully',
      data: { vendorProposal, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all vendorProposal endpoint');
  const{user_domain} = req.headers
  try {
    let result = []
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService);
    const vps = await vendorProposalServiceInstance.find({vp_domain:user_domain});
    for(const vp of vps){
      let details = [];
        details = await vendorProposalDetailServiceInstance.find({
          vpd_domain: user_domain,
          vpd_nbr: vp.vp_nbr,
        });
      result.push({id:vp.id, vp,details})
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers

  logger.debug('Calling update one  vendorProposal endpoint');
  try {
    const vendorProposalServiceInstance = Container.get(VendorProposalService);
    const { id } = req.params;
    
    const vendorProposal = await vendorProposalServiceInstance.update({ ...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: vendorProposal });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findBy,
  findOne,
  findAll,
  update,
  findByOne,
};
