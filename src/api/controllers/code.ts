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
    // console.log(codes)
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
    // console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
  //  console.log(data);
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
    // console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
  //  console.log(data);
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
  console.log("user_domain",user_domain)
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'emp_type' });
    console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    console.log(data);
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
  console.log("user_domain",user_domain)
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'pj_trigger' });
    
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_desc });
    }
    console.log(data)
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
    //console.log(codes);
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    //console.log(data);
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
    // console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    //console.log(data);
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
    // console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    //console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findpathotype = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findsome({ code_domain:user_domain,code_fldname: 'patho_type' });
    // console.log(codes)
    var data = [];
    for (let code of codes) {
      data.push({ value: code.code_value, label: code.code_cmmt });
    }
    //console.log(data);
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
    //console.log(req.body);
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
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAll,
  findCheck,
  findEmpTime,
  findEmpShift,
  findEmpType,
  findConge,
  findModule,
  findTrans,
  findpathotype,
  findBy,
  update,
  deleteOne,
  findTriggerType
};
