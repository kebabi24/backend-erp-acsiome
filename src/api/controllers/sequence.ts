import SequenceService from "../../services/sequence"
import SequenceServiceService from "../../services/sequence-service"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequence = await sequenceServiceInstance.create({...req.body, seq_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  sequence })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const createS = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequenceServiceServiceInstance = Container.get(SequenceServiceService)
        console.log(req.body)
        const {seq,details} = req.body
        const sequence = await sequenceServiceInstance.create({...seq, seq_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       for(let entry of details) {
        const sequenceService = await sequenceServiceServiceInstance.create({...entry, usgseq_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  sequence })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  sequence endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const {id} = req.params
        const sequence = await sequenceServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequence  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findOneService = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  sequence endpoint")
    try {
        const{user_code} = req.headers 
        const{user_domain} = req.headers
    
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequenceServiceServiceInstance = Container.get(SequenceServiceService)
        const {id} = req.params
        const sequence = await sequenceServiceInstance.findOne({id})
        const details = await sequenceServiceServiceInstance.find({
            usgseq_domain: user_domain,
            usgseq_code: sequence.seq_seq,
          });
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: {sequence,details}  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all sequence endpoint")
    const{user_domain} = req.headers
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequences = await sequenceServiceInstance.find({seq_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequences })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all sequence endpoint")
    const{user_domain} = req.headers
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequences = await sequenceServiceInstance.find({...req.body,seq_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequences })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all sequence endpoint")
    const{user_domain} = req.headers
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequences = await sequenceServiceInstance.findOne({...req.body,seq_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequences })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  sequence endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const {id} = req.params
        const sequence = await sequenceServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequence  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updateDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  sequence endpoint")
    try {
        const {sequence,details} = req.body
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequenceServiceServiceInstance = Container.get(SequenceServiceService)
        const {id} = req.params
        const seq = await sequenceServiceInstance.update({...sequence, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        const sequenceService = await sequenceServiceServiceInstance.delete({usgseq_code:sequence.seq_seq, usgseq_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        for(let entry of details) {
            const sequenceService = await sequenceServiceServiceInstance.create({...entry, usgseq_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
           }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequence  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  sequence endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const {id} = req.params
        const sequence = await sequenceServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByService = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all sequence endpoint")
    const{user_domain} = req.headers
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequenceServiceServiceInstance = Container.get(SequenceServiceService)
        const sequencesServices = await sequenceServiceServiceInstance.find({...req.body,usgseq_domain:user_domain})
        let seqs = []

        for(let seq of sequencesServices ) {  seqs.push(seq.usgseq_code)}
        const sequences = await sequenceServiceInstance.find({seq_seq:seqs,seq_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sequences })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBySequence = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all Service endpoint")
    const{user_domain} = req.headers
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const sequenceServiceServiceInstance = Container.get(SequenceServiceService)
       console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const sequences = await sequenceServiceInstance.find({seq_type:'RQ',seq_domain: user_domain})
       let result=[]
        for(const seq of sequences){
            let details = [];
              details = await sequenceServiceServiceInstance.find({
                usgseq_domain: user_domain,
                usgseq_code: seq.seq_seq,
              });
            result.push({id:seq.id, seq,details})
          }
       
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    createS,
    findOne,
    findOneService,
    findAll,
    findBy,
    findByService,
    findByOne,
    update,
    updateDet,
    deleteOne,
    findBySequence
}
