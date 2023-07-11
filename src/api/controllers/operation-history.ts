import OperationHistoryService from "../../services/operation-history"
import WorkOrderService from "../../services/work-order"
import WorkroutingService from "../../services/workrouting"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const{user_code} = req.headers 
    const{user_domain} = req.headers
  
    logger.debug('Calling update one  code endpoint');
    try {
      const { detail, dwndetail, rjctdetail, op } = req.body;
      const operationHistoryServiceInstance = Container.get(OperationHistoryService)
      const workOrderServiceInstance = Container.get(WorkOrderService)
      const workroutingServiceInstance = Container.get(WorkroutingService)
      console.log(op.op_wo_nbr)
      for (const item of detail) {


        //console.log(Number(item.fin) , Number(item.debut))
        const hms = item.fin;
        const [hours, minutes] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 ;
        const hmsd = item.debut;
        const [hoursd, minutesd] = hmsd.split(':');
        const totalSecondsd = (+hoursd) * 60 * 60 + (+minutesd) * 60 ;
       
        const wo = await workOrderServiceInstance.findOne({id : item.op_wo_lot,wo_domain:user_domain})

        const ro = await workroutingServiceInstance.findOne({ro_routing : wo.wo_routing,ro_domain:user_domain})

        await operationHistoryServiceInstance.create({
          ...item,
          ...op,
          op_domain:user_domain,
          op_type: "labor", 
          op_act_run :totalSeconds - totalSecondsd,
         // op_std_run : item.op_qty_comp * Number(ro.ro_run),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      for (const down of dwndetail) {

        const hms = down.fin_cause;
        const [hours, minutes] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 ;
        const hmsd = down.debut_cause;
        const [hoursd, minutesd] = hmsd.split(':');
        const totalSecondsd = (+hoursd) * 60 * 60 + (+minutesd) * 60 ;
        await operationHistoryServiceInstance.create({
          ...down,
          ...op,
          op_domain:user_domain,
          op_type: "down", 
          op_act_run : totalSeconds - totalSecondsd,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      for (const rjct of rjctdetail) {

        
        await operationHistoryServiceInstance.create({
          ...rjct,
          ...op,
          op_domain:user_domain,
          op_type: "reject", 
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      return res.status(200).json({ message: 'deleted succesfully', data: true });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  site endpoint")
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const {id} = req.params
        const op = await operationHistoryServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: op  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.headers.origin)
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find all site endpoint")
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const ops = await operationHistoryServiceInstance.find({op_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ops })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const ops = await operationHistoryServiceInstance.find({...req.body,op_domain:user_domain})
        console.log(ops)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ops })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const ops = await operationHistoryServiceInstance.findOne({...req.body,op_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ops })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  site endpoint")
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const {id} = req.params
        const op = await operationHistoryServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: op  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  site endpoint")
    try {
        const operationHistoryServiceInstance = Container.get(OperationHistoryService)
        const {id} = req.params
        const op = await operationHistoryServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
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
    deleteOne
}
