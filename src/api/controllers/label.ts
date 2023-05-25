import LabelService from "../../services/label"
import SequenceService from '../../services/sequence';
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    logger.debug('Calling Create label endpoint');
    console.log("heeeeeeeeeeeeeeeeeeeee",req.body)
    try {
      const labelServiceInstance = Container.get(LabelService);
      const sequenceServiceInstance = Container.get(SequenceService);
      var labelId = null;
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PL', seq_type: 'PL' });
        console.log(seq);
        labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
        await sequenceServiceInstance.update(
          { seq_curr_val: Number(seq.seq_curr_val) + 1 },
          { seq_type: 'PL', seq_seq: 'PL', seq_domain: user_domain },
        );
      const label = await labelServiceInstance.create({
        ...req.body,
        lb_ref: labelId,
        lb_cab: labelId,
        lb_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      return res.status(201).json({ message: 'created succesfully', data: label });
    } catch (e) {
      //#
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  
  const createProd = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    logger.debug('Calling Create label endpoint');
    //console.log("heeeeeeeeeeeeeeeeeeeee",req.body)
    try {
      const labelServiceInstance = Container.get(LabelService);
      const sequenceServiceInstance = Container.get(SequenceService);
      var labelId = null;
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'CAR', seq_type: 'PL' });
       // console.log(seq);
        labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
        await sequenceServiceInstance.update(
          { seq_curr_val: Number(seq.seq_curr_val) + 1 },
          { id:seq.id,seq_type: 'PL', seq_seq: 'CAR', seq_domain: user_domain },
        );
      const label = await labelServiceInstance.create({
        ...req.body,
        lb_ref: labelId,
        lb_cab: labelId,
        lb_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      return res.status(201).json({ message: 'created succesfully', data: label });
    } catch (e) {
      //#
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  const createPAL = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    logger.debug('Calling Create label endpoint');
    //console.log("heeeeeeeeeeeeeeeeeeeee",req.body)
    try {
      const labelServiceInstance = Container.get(LabelService);
      const sequenceServiceInstance = Container.get(SequenceService);
      var labelId = null;
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PAL', seq_type: 'PL' });
       // console.log(seq);
        labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
        await sequenceServiceInstance.update(
          { seq_curr_val: Number(seq.seq_curr_val) + 1 },
          { id:seq.id,seq_type: 'PL', seq_seq: 'PAL', seq_domain: user_domain },
        );
      const label = await labelServiceInstance.create({
        ...req.body,
        //lb_ref: labelId,
        lb_pal: labelId,
        lb_cab: labelId,
        lb_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      return res.status(201).json({ message: 'created succesfully', data: label });
    } catch (e) {
      //#
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all job endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const labelServiceInstance = Container.get(LabelService)
        const label = await labelServiceInstance.findOne({
            ...req.body,lb_domain:user_domain
        })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { label },
            })
       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  job endpoint")
    try {
        const labelServiceInstance = Container.get(LabelService)
        const { id } = req.params
        const label = await labelServiceInstance.findOne({ id })
       
        return res.status(200).json({
            message: "fetched succesfully",
            data: { label},
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all job endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const labelServiceInstance = Container.get(LabelService)
        const labels = await labelServiceInstance.find({lb_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: labels })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  job endpoint")
    try {
        const labelServiceInstance = Container.get(LabelService)
        const { id } = req.params
        const label = await labelServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: label })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  job endpoint")
    try {
        const labelServiceInstance = Container.get(LabelService)
        const detail = req.body.detail
        const palnbr = req.body.nbr
        for (let data of detail) {
        const label = await labelServiceInstance.update(
            { lb_pal: palnbr , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { lb_ref : data.tr_ref }
        )
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: true })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    createProd,
    createPAL,
    findBy,
    findOne,
    findAll,
    update,
    updated

}
