import CodeService from '../../services/code';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const codeServiceInstance = Container.get(CodeService);
    const code = await codeServiceInstance.create({
      ...req.body,
      code_domain:user_domain
     , created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: code });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createCodes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const codeServiceInstance = Container.get(CodeService);

    const codes = req.body.detail
    for (let code of codes) {
   if (code.new == true) {
      const cd = await codeServiceInstance.create({
      code_fldname: "doc_spec",
      code_value: code.code_value,
      code_cmmt: code.code_cmmt,
      code_domain:user_domain
     , created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
  }
  }
    return res.status(201).json({ message: 'created succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const codeServiceInstance = Container.get(CodeService);
    const { id } = req.params;
    const code = await codeServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: code });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.find({code_domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findCheck = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'check_form' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    //data);
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findEmpTime = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'check_emp' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }

    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findEmpShift = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'emp_shift' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
  
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findEmpType = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
 
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'emp_type' });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
  
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findTriggerType  = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pj_trigger' });
    
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_desc });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findConge = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({code_domain:user_domain,code_fldname: 'empd_type' });
 
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findModule = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({code_domain:user_domain, code_fldname: 'bkd_module' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findTrans = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'tr_type' });
    
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findEtats = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pt_group',bool01: true });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findTypes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pt_draw',bool01:true });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findPartTypes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pt_part_type' });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findVerify = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'verify' });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findColors = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pt_break_cat' });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const finddisease = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'disease' });
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.find({ ...req.body ,code_domain:user_domain});
    
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findOne({ ...req.body ,code_domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const codeServiceInstance = Container.get(CodeService);
    const { id } = req.params;
    const code = await codeServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: code });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const codeServiceInstance = Container.get(CodeService);
    const { id } = req.params;
    const code = await codeServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: true});
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const deletes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  try {
    console.log("here",req.body)
    const codeServiceInstance = Container.get(CodeService);
    const  id  = req.body.id;
    const field = req.body.field
    const code = await codeServiceInstance.delete({ id });
    const codes = await codeServiceInstance.find({ code_fldname:field,code_domain:user_domain});
    return res.status(200).json({ message: 'deleted succesfully', data: codes});
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const DomainTraining = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling Create Multiple Visit results  endpoint")
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
      const codeServiceInstanse = Container.get(CodeService)

      var creationDomain = 'no enteries to be created was sent'
     
      var updateDomain  = ['no enteries to be updated was sent']
      //console.log("ppppppppppppppppppppppp",req.body)
      // CREATE 
      if(req.body.domain){
          // console.log(req.body.visitResults)
          const listOfDomainToCreate = [...req.body.domain]
          // let obj = {
          //   code_domain:user_domain
          //   , created_by: user_code,
          //    created_ip_adr: req.headers.origin,
          //    last_modified_by: user_code,
          //    last_modified_ip_adr: req.headers.origin,
          // }
        
          for (let dom of listOfDomainToCreate ) {
            
        //  console.log(dom)
          creationDomain = await codeServiceInstanse.create({...dom, code_fldname:req.body.field ,code_domain:user_domain
            , created_by: user_code,
             created_ip_adr: req.headers.origin,
             last_modified_by: user_code,
             last_modified_ip_adr: req.headers.origin})
             //listOfDomainToCreate)
        }
      }
//console.log("updatedData",req.body.updateData)
      // UPDATE 
      if(req.body.updateData){
        //  console.log("updatedData"+ Object.keys(req.body.updateData))
          const listOfDomainToCreate = req.body.updateData
          // creationResults = await mobileSettingsServiceInstanse.createManyVisitResult(listOfVisitResultsToCreate)
          for(const domain of listOfDomainToCreate ){
              const updatedDomainList = await codeServiceInstanse.update(
                  {...domain}, 
                  { id : domain.id})
                  updateDomain.push(updatedDomainList)
          }
          // console.log(listOfVisitResultsToCreate)
      }
      
  
      const newDomain = await codeServiceInstanse.find({code_fldname:req.body.field,code_domain:user_domain})
      return res
          .status(201)
          .json({ 
              message: "created visit results succesfully", 
              createResults:  creationDomain, 
              updateResults:updateDomain,
              newVisitResults : newDomain,
          })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

export default {
  create,
  createCodes,
  findOne,
  findAll,
  findCheck,
  findEmpTime,
  findEmpShift,
  findEmpType,
  findConge,
  findModule,
  findTrans,
  findEtats,
  findVerify,
  findTypes,
  findPartTypes,
  findColors,
  finddisease,
  findBy,
  findByOne,
  update,
  deleteOne,
  findTriggerType,
  DomainTraining,
  deletes
};
