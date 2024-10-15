import DecompteService from "../../services/decompte"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';


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
        var decomptes = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role, dec_effdate: { [Op.between]: [req.body.date, req.body.date1]} },
            order: [['dec_type', 'ASC'],['dec_effdate','ASC']],
          });
           var charge = await decompteServiceInstance.findS({
            where: { dec_role: req.body.role,dec_type:"C", dec_effdate: { [Op.between]: [req.body.date, req.body.date1]} },
            
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
          console.log(charge,payment)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: {decomptes,charge,payment} })
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

