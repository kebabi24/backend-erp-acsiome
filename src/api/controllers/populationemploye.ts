import PopulationemployeService from "../../services/populationemploye"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create profile endpoint")
    try {
        console.log(req.body)
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        for (let entry of req.body) {
        const populationemploye = await populationemployeServiceInstance.create({...entry,pop_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: true })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        const {id} = req.params
        const populationemploye = await populationemployeServiceInstance.find({pop_code:id,pop_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: populationemploye  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        const populationemployes = await populationemployeServiceInstance.find({pop_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: populationemployes })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const finddistc = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        //const populationemployes = await populationemployeServiceInstance.find({pop_domain:user_domain})
        const populationemployes = await populationemployeServiceInstance.findspec({
            attributes: ['pop_code', 'pop_desc'],
            group: ['pop_code', 'pop_desc'],
            raw: true,
          });
          var i = 1;
          let result = [];
          for (let prh of populationemployes) {
            result.push({
              id: i,
              pop_code: prh.pop_code,
              pop_desc: prh.pop_desc,
              
            });
            i = i + 1;
          }
      
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const populationemployes = await populationemployeServiceInstance.findOne({...req.body,pop_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: populationemployes })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  profile endpoint")
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
       // const {id} = req.params
       let code = req.body[0].pop_code
       console.log(code)
       const pop = await populationemployeServiceInstance.delete({pop_code:code})
       for (let entry of req.body) {
        const populationemploye = await populationemployeServiceInstance.create({...entry,pop_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        }
      // const populationemploye = await populationemployeServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: true  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  profile endpoint")
    try {
        const populationemployeServiceInstance = Container.get(PopulationemployeService)
        const {id} = req.params
        const populationemploye = await populationemployeServiceInstance.delete({id})
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
    finddistc,
    findBy,
    update,
    deleteOne
}
