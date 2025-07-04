import GeneralLedger from "../../services/general-ledger"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import moment from 'moment';


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const  date = new Date();
    logger.debug("Calling Create code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
       
        const { generalLedger,Detail } = req.body
       
        const gl = await generalLedgerServiceInstance.findLastId({glt_date: date,glt_domain:user_domain})
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
        let debit = 0
        let credit = 0
if (entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
        await generalLedgerServiceInstance.create({...generalLedger,glt_domain:user_domain,glt_ref: ref,...entry,
            glt_curr_amt: (Number(entry.glt_amt)) * Number(generalLedger.glt_ex_rate2) /  Number(generalLedger.glt_ex_rate)   ,
            dec01:debit,
            dec02:credit,
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
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gls = await generalLedgerServiceInstance.find({glt_domain:user_domain})

        var data = []
        for (let gl of gls){
            const effdate = new Date(gl.glt_effdate)   
            //data.push(gl, {effet:  new Date(effdate.getFullYear(), effdate.getMonth() , effdate.getDay()) })
            gl.glt_effdate = new Date(effdate.getFullYear(), effdate.getMonth() , effdate.getDay())
        }
            
    
        
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
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gl = await generalLedgerServiceInstance.find({...req.body,glt_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: gl })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy50 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gl = await generalLedgerServiceInstance.find({...req.body,glt_domain:user_domain})
        let result = [];
        
        for (var i=1; i < 85; i++)
        {
            result.push({
                id: i,
                code:'',
                desc:'',
                CA:0,
                CAE:0,
                CAI:0,
                amt:0,
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

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const {id} = req.params
        const { generalLedger,Detail } = req.body

        await generalLedgerServiceInstance.delete({glt_ref: id})
        for (let entry of Detail) {
            let debit = 0;
       let credit = 0
       if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
            entry = { ...entry, ...generalLedger, glt_domain:user_domain,reated_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin,dec01:debit,dec02:credit }
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
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all code endpoint")
    const  date = new Date();
    //const chardate : string;

    try {
        const generalLedgerServiceInstance = Container.get(GeneralLedger)
        const gl = await generalLedgerServiceInstance.findLastId({glt_date: date,glt_domain:user_domain})
         if(gl) {
             d = gl.glt_ref + 1
       

        } else {

            
            var day = ('0' + date.getDate()).slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var year = date.getFullYear();
            var d = "JL" + moment().format('YYYYMMDD') + "000001" ;
           // return year +  month + day;



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
    findBy50,
    update,
    deleteOne,
    findNewId
}

