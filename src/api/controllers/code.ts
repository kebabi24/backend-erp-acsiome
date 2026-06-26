import CodeService from '../../services/code';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Op } from 'sequelize';
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
    //  const si = require('systeminformation');
    //  si.networkInterfaces().then(data => console.log(data[0].mac));
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
const findImpact = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'impact' });

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
const findOpStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'opstatus' });

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
const findAct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'act' });

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
const findwostatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'wo_status' });

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
const findemballage = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'EMBALLAGE' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_value });
    }
    //data);
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findliaison = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: req.query.var1 });

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
const findpostes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'POSTES' });

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
const findreptype = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'rep_type' });

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
const findrepjob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'rep_job' });

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
const findOrganigramme = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const strs = await codeServiceInstance.find({ ...req.body ,code_fldname:'emp_upper',code_domain:user_domain});
    let data = []
    for (let str of strs){
      let i = 0
      console.log(str.code_value,'structure')

      const jobs = await codeServiceInstance.find({ ...req.body ,code_fldname:'emp_job',chr01:str.code_value,code_domain:user_domain});
      for(let job of jobs){
      console.log(str.code_value,job.code_value,'job')  
      const levels = await codeServiceInstance.find({ ...req.body ,code_fldname:'emp_level',chr01:job.code_value,code_domain:user_domain});
      for(let level of levels){
        console.log(str.code_value,job.code_value,level.code_value,'level')
      const specs = await codeServiceInstance.find({ ...req.body ,code_fldname:'emp_spec',chr01:level.code_value,code_domain:user_domain});
      for(let spec of specs){
        console.log(str.code_value,job.code_value,level.code_value,spec.code_value,'spec')
        data.push({id:spec.id, str: str.code_cmmt, job: job.code_cmmt,level:level.code_cmmt,spec:spec.code_cmmt });
      
      }}}
    i = i + 1}

    return res.status(200).json({ message: 'fetched succesfully', data: data });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByField = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by field  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.find({ ...req.body ,code_domain:user_domain});
    console.log(req.body)
     var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_value });
    }
    console.log('data')
    return res.status(200).json(data);
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
const addData = async (req: Request, res: Response, next: NextFunction) => {
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
          creationDomain = await codeServiceInstanse.create({...dom ,code_domain:user_domain
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
      
  
      // const newDomain = await codeServiceInstanse.find({code_fldname:req.body.field,code_domain:user_domain})
      return res
          .status(201)
          .json({ 
              message: "created visit results succesfully", 
              createResults:  creationDomain, 
              updateResults:updateDomain,
              // newVisitResults : newDomain,
          })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const findAllProvider = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.find({code_domain:user_domain, code_fldname:{ [Op.or] : ['vd_type','vd_shipvia','vd_promo','vd_lang','check_form','vd_cr_terms']}});
    //  const si = require('systeminformation');
    //  si.networkInterfaces().then(data => console.log(data[0].mac));
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.find({code_domain:user_domain, code_fldname:{ [Op.or] : ['cm_type','cm_shipvia','cm_promo','cm_lang','cm_pay_method','cm_cr_terms','cm_region','cm_class']}});
    //  const si = require('systeminformation');
    //  si.networkInterfaces().then(data => console.log(data[0].mac));
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findCmClass = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({code_domain:user_domain, code_fldname: 'cm_class' });

    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_value });
    }
    
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createCodes,
  findOne,
  findAll,
  findCheck,
  findImpact,
  findOpStatus,
  findAct,
  findwostatus,
  findemballage,
  findliaison,
  findpostes,
  findreptype,
  findrepjob,
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
  findOrganigramme,
  findByField,
  findByOne,
  update,
  deleteOne,
  findTriggerType,
  DomainTraining,
  addData,
  deletes,
  findAllProvider,
  findAllCustomer,
  findCmClass
};
