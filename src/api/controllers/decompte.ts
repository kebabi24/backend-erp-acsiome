import DecompteService from "../../services/decompte"
import UserMobileService from "../../services/user-mobile"
import locationDetailService from '../../services/location-details';
import RoleService from '../../services/role';
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';
import LoadRequestService from "../../services/load-request";


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const decompteServiceInstance = Container.get(DecompteService)
        const {id} = req.params
        const decompte = await decompteServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: decompte  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const decompteServiceInstance = Container.get(DecompteService)
        const decompte = await decompteServiceInstance.find({cu_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: decompte })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const decompteServiceInstance = Container.get(DecompteService)
        const decompte = await decompteServiceInstance.findOne({...req.body,cu_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: decompte })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByRange = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const decompteServiceInstance = Container.get(DecompteService)
        const userMobileServiceInstance = Container.get(UserMobileService)
        const locationDetailServiceInstance = Container.get(locationDetailService);
        const roleServiceInstance = Container.get(RoleService)
        const loadRequestServiceInstance = Container.get(LoadRequestService)
         var decomptes = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role, dec_effdate: { [Op.between]: [req.body.date, req.body.date1]} },
            order: [['dec_type', 'ASC'],['dec_effdate','ASC']],
          });
          var charge = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role,dec_type: {[Op.or]:["C","D","A", "AT"]}, dec_effdate: { [Op.between]: [req.body.date, req.body.date1]} },
            
            attributes: 
                ['dec_role', [Sequelize.fn('sum', Sequelize.col('dec_amt')), 'charge' ]],
                group: ['dec_role'],
                raw: true,
          });
          var payment = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role,dec_type:"P", dec_effdate: { [Op.between]: [req.body.date, req.body.date1]} },
            
            attributes: ['dec_role',  [Sequelize.fn('sum', Sequelize.col('dec_amt')), 'payment' ]],
                group: ['dec_role'],
                raw: true,
          });
          var Timbre = await userMobileServiceInstance.getAllInvoice({
            where: { role_code: req.body.role, canceled: false,period_active_date: { [Op.between]: ['2025-02-16', '2025-02-20']} },
            attributes: ['role_code',  [Sequelize.fn('sum', Sequelize.col('stamp_amount')), 'timbre' ]],
            group: ['role_code'],
            raw: true,
          });
          if( Timbre.length != 0) {
          payment[0].payment = payment[0].payment - Number(Timbre[0].timbre)
          } else {
            payment[0].payment = payment[0].payment 
          }

          const role = await roleServiceInstance.findOne({role_code: req.body.role});
          const lds = await locationDetailServiceInstance.find({ ld_loc: role.role_loc, ld_site: role.role_site,  ld_domain:user_domain });
          let invamt = 0
          for(let ld of lds) {
          invamt = invamt + Number(ld.ld_qty_oh) * Number(ld.item.pt_price) * 1.2138
          }
          const  load = await loadRequestServiceInstance.findAllLoadRequests40ByRoleCode(role.role_code)
          let loads = []
          for (let lr of load) { loads.push(lr.load_request_code)}
          const  amtload = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role,dec_type:"C", dec_code: loads },
            
            attributes: ['dec_role',  [Sequelize.fn('sum', Sequelize.col('dec_amt')), 'amtload' ]],
                group: ['dec_role'],
                raw: true,

          })
          console.log(amtload)
          if(amtload.length != 0) { invamt = invamt + amtload[0].amtload}
          
          var credit = await userMobileServiceInstance.getAllInvoice({
            where: { role_code: req.body.role, canceled: false,closed:false },
          //  attributes: ['role_code',  [Sequelize.literalfn('sum', Sequelize.col('amount' -'due_amount')), 'credit' ]],
          attributes: [[Sequelize.literal('SUM(amount - due_amount)'), 'result']],
            group: ['role_code'],
            raw: true,
          });
          console.log(charge,payment,invamt,credit)
          if(credit.length ==0) {
            credit.push({result:0})
          } 
    
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: {decomptes,charge,payment,invamt,credit} })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
   
    findOne,
    findAll,
    findBy,
    findByRange,
   
}

