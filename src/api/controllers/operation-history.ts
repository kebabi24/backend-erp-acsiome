import OperationHistoryService from "../../services/operation-history"
import WorkOrderService from "../../services/work-order"
import WorkroutingService from "../../services/workrouting"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';

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
      
      for (const item of detail) {


        //console.log(Number(item.fin) , Number(item.debut))
        const hms = item.fin;
        const [hours, minutes] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 ;
        const hmsd = item.debut;
        const [hoursd, minutesd] = hmsd.split(':');
        const totalSecondsd = (+hoursd) * 60 * 60 + (+minutesd) * 60 ;
       
        const wo = await workOrderServiceInstance.findOne({id : item.op_wo_lot,wo_domain:user_domain})
        let operation = Number(wo.wo_line)
        if (wo.wo_line = null){operation = 0}

        const ro = await workroutingServiceInstance.findOne({ro_routing : wo.wo_routing,ro_op:operation,ro_domain:user_domain})
       
        await operationHistoryServiceInstance.create({
          ...item,
          ...op,
          chr01:hmsd,
          chr02:hms,
          op_domain:user_domain,
          op_type: "labor", 
          op_std_run:1 / ro.ro_run,
          op_std_setup: ro.ro_setup,
          op_act_run :totalSeconds - totalSecondsd,
         // op_std_run : item.op_qty_comp * Number(ro.ro_run),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      for (const down of dwndetail) {
        const op1 = await workroutingServiceInstance.findOne({op_wkctr : op.op_routing,op_mch:op.op_mch,op_date:op.op_date,op_type:'down',op_domain:user_domain})

        var elapsed = Math.abs(new Date(down.fin_cause).getTime() - new Date(down.debut_cause).getTime()) / (1000 * 60)
        // console.log('elapsed',elapsed)
        // const hms = down.fin_cause;
        // const [hours, minutes] = hms.split(':');
        // const totalSeconds = Number(+hours) * 60 * 60 + Number(+minutes) * 60 ;
        // const hmsd = down.debut_cause;
        // const [hoursd, minutesd] = hmsd.split(':');
        // const totalSecondsd = Number(+hoursd) * 60 * 60 + Number(+minutesd) * 60 ;
        if(op1){
            await operationHistoryServiceInstance.update({
                ...down,
                ...op,
                chr01:down.debut_cause,
                chr02:down.fin_cause,
                op_domain:user_domain,
                op_type: "down", 
                op_act_run : elapsed,
                created_by: user_code,
                created_ip_adr: req.headers.origin,
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
                },{id:op1.id});
        }
        else{   
                await operationHistoryServiceInstance.create({
                ...down,
                ...op,
                chr01:down.debut_cause,
                chr02:down.fin_cause,
                op_domain:user_domain,
                op_type: "down", 
                op_act_run : elapsed,
                created_by: user_code,
                created_ip_adr: req.headers.origin,
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
                });
            }
        const wos = await workOrderServiceInstance.find({ wo_routing:op.op_mch,wo_rel_date:{[Op.gte]: op.op_tran_date},wo_domain: user_domain })
        for (let wo of wos)
        {
            const addSecondsToDaterel = (date, n,id) => {
                const d = new Date(date);
                d.setTime(d.getTime() + n * 1000 );
                console.log(d)
                const work = workOrderServiceInstance.update(
                    { wo_rel_date:d },
                    { id:id},)
                return d;
                
              };
            const addSecondsToDatedue = (date, n,id) => {
                const d = new Date(date);
                d.setTime(d.getTime() + n * 1000 );
                console.log(d)
                const work = workOrderServiceInstance.update(
                    { wo_due_date:d },
                    { id:id},)
                return d;
                
              };
            var reldate = wo.wo_rel_date
            var duedate = wo.wo_due_date
            addSecondsToDaterel(reldate, Number(elapsed) * 60,wo.id);
            addSecondsToDatedue(duedate, Number(elapsed) * 60,wo.id);
           
            
            }
            const wos2 = await workOrderServiceInstance.find({ wo_routing:op.op_mch,wo_rel_date:{[Op.lt]: op.op_tran_date},wo_due_date:{[Op.gt]: op.op_tran_date},wo_domain: user_domain })
        for (let wo2 of wos2)
        {
            const addSecondsToDaterel = (date, n,id) => {
                const d = new Date(date);
                d.setTime(d.getTime() + n * 1000 );
                console.log(d)
                const work = workOrderServiceInstance.update(
                    { wo_rel_date:d },
                    { id:id},)
                return d;
                
              };
            const addSecondsToDatedue = (date, n,id) => {
                const d = new Date(date);
                d.setTime(d.getTime() + n * 1000 );
                console.log(d)
                const work = workOrderServiceInstance.update(
                    { wo_due_date:d },
                    { id:id},)
                return d;
                
              };
            var reldate2 = wo2.wo_rel_date
            var duedate2 = wo2.wo_due_date
            addSecondsToDaterel(reldate2, Number(elapsed) * 60,wo2.id);
            addSecondsToDatedue(duedate2, Number(elapsed) * 60,wo2.id);
            
            
            }
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
        let result = []
        let obj:any;
        let i = 0
        for (let op of ops)
        {obj ={id:i,
            op_line:i,
            op_wkctr:op.op_wkctr,
            op_mch:op.op_mch,
            op_rsn_down:op.op_rsn_down,
            debut_cause:op.chr01,
            chr01:op.debut_cause,
            fin_cause:op.chr02,
            chr02:op.chr02,
            op_domain:user_domain,
            op_type: "down", 
            op_act_run : op.op_act_run,
            op_comment:op.op_comment,
            op_site:op.op_site,
            op_shift:op.op_shift,
            op_dept:op.op_dept,
            op_date:op.op_date,
            

        }
    result.push(obj) 
    i = i +1}
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
