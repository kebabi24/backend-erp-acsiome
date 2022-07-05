import GeneralLedger from "../../services/general-ledger"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import moment from 'moment';


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers
    const  date = new Date();
    logger.debug("Calling Create code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        console.log(req.body)
        const { generalLedger,Detail } = req.body
        console.log(generalLedger)
        const gl = await generalLedgerServiceInstance.findLastId({glt_date: date})
        if(gl) {
          var seq =  gl.glt_ref.substring(10, 18)
       var d = Number(seq) + 1
       
       var seqchar = ("000000" + d).slice(-6);
       
       var ref = generalLedger.glt_tr_type + moment().format('YYYYMMDD') + seqchar ;
       } else {

           
           var ref = generalLedger.glt_tr_type  + moment().format('YYYYMMDD') + "000001" ;
          // return year +  month + day;
         

       }
       const effdate = new Date(generalLedger.glt_effdate)
       for (let entry of Detail) {
       console.log(entry)
        await generalLedgerServiceInstance.create({...generalLedger,glt_ref: ref,...entry,
            glt_curr_amt: (Number(entry.glt_amt)) * Number(generalLedger.glt_ex_rate2) /  Number(generalLedger.glt_ex_rate)   ,
            
            glt_year: effdate.getFullYear(),
              
            glt_date: date, created_by: user_code, last_modified_by: user_code})
       
    }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  ref })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const {id} = req.params
        const gl = await generalLedgerServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: gl  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gls = await generalLedgerServiceInstance.find({})
  
       //console.log(gls)
        var data = []
        for (let gl of gls){
            const effdate = new Date(gl.glt_effdate)   
            //data.push(gl, {effet:  new Date(effdate.getFullYear(), effdate.getMonth() , effdate.getDay()) })
            gl.glt_effdate = new Date(effdate.getFullYear(), effdate.getMonth() , effdate.getDay())
        }
            
        console.log(data)
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: gls })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gl = await generalLedgerServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: gl })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const {id} = req.params
        const { generalLedger,Detail } = req.body
        console.log(generalLedger)
        await generalLedgerServiceInstance.delete({glt_ref: id})
        for (let entry of Detail) {
            entry = { ...entry, ...generalLedger, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await generalLedgerServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const {id} = req.params
        const gl = await generalLedgerServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findNewId = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const  date = new Date();
    //const chardate : string;

    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gl = await generalLedgerServiceInstance.findLastId({glt_date: date})
         if(gl) {
             d = gl.glt_ref + 1
           // console.log(gl.glt_ref + 1, "here")

        } else {

            
            var day = ('0' + date.getDate()).slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var year = date.getFullYear();
            var d = "JL" + moment().format('YYYYMMDD') + "000001" ;
           // return year +  month + day;
      //      console.log(d)


        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: d })
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
    update,
    deleteOne,
    findNewId
}

