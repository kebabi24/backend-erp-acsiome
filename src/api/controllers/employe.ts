import EmployeService from '../../services/employe';
import EmployeAvailabilityService from '../../services/employe-availability';
import AffectEmployeService from '../../services/affect-employe';
import EmployeScoreService from '../../services/employe-score';
import EmployeJobService from '../../services/employe-job';
import EmployeTimeService from '../../services/employe-time';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const employeScoreServiceInstance = Container.get(EmployeScoreService);
    const employeJobServiceInstance = Container.get(EmployeJobService);
    const { Employe, employeScoreDetail, employeJobDetail } = req.body;
    console.log(employeScoreDetail);
    const employe = await employeServiceInstance.create({
      ...Employe,
      emp_domain: user_domain,
      created_by: user_code,
      last_modified_by: user_code,
    });
    for (let entry of employeScoreDetail) {
      entry = {
        emps_type: entry.code_value,
        emps_amt: entry.emps_amt,
        emps_domain: user_domain,
        emps_addr: Employe.emp_addr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await employeScoreServiceInstance.create(entry);
    }
    for (let entry of employeJobDetail) {
      entry = {
        ...entry,
        empj_domain: user_domain,
        empj_addr: Employe.emp_addr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await employeJobServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: employe });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createC = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const empAvailabilityServiceInstance = Container.get(EmployeAvailabilityService);
    const { emp, empDetail } = req.body;
    console.log(emp);
    const empdet = await empAvailabilityServiceInstance.delete({ empd_addr: emp, empd_domain: user_domain });
    for (let entry of empDetail) {
      entry = {
        ...entry,
        empd_domain: user_domain,
        empd_addr: emp,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await empAvailabilityServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: empDetail });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_domain } = req.headers;
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const employeScoreServiceInstance = Container.get(EmployeScoreService);
    const employeJobServiceInstance = Container.get(EmployeJobService);
    const { id } = req.params;
    const employe = await employeServiceInstance.findOne({ id });
    const employeScoreDetail = await employeScoreServiceInstance.find({
      emps_domain: user_domain,
      emps_addr: employe.emp_addr,
    });
    const employeJob = await employeJobServiceInstance.find({
      empj_domain: user_domain,
      empj_addr: employe.emp_addr,
    });
    let employeJobDetail = [];
    var i = 1;
    for (let empjb of employeJob) {
      let obj = {
        id: i,
        empj_job: empjb.empj_job,
        desc: empjb.job.jb_desc,
        empj_level: empjb.empj_level,
      };
      (i = i + 1), employeJobDetail.push(obj);
    }
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: { employe, employeScoreDetail, employeJobDetail } });
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
    const employeServiceInstance = Container.get(EmployeService);
    const employe = await employeServiceInstance.find({ emp_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
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
    const employeServiceInstance = Container.get(EmployeService);
    const employe = await employeServiceInstance.find({ ...req.body, emp_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByTime = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const empTimeServiceInstance = Container.get(EmployeTimeService);
    const employe = await employeServiceInstance.find({ ...req.body, emp_domain: user_domain });
    let result = [];
    let i = 1;
    for (let emp of employe) {
      const empTime = await empTimeServiceInstance.findOne({
        empt_domain: user_domain,
        empt_code: emp.emp_addr,
        empt_date: new Date(),
      });
      const stat = empTime != null ? empTime.empt_stat : null;
      const start = empTime != null ? empTime.empt_start : null;
      const end = empTime != null ? empTime.empt_end : null;
      result.push({
        id: i,
        emp_addr: emp.emp_addr,
        emp_fname: emp.emp_fname,
        emp_lname: emp.emp_lname,
        emp_site: emp.emp_site,
        reason: stat,
        timestart: start,
        timeend: end,
      });
      i = i + 1;
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByTimeproject = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const employeServiceInstance = Container.get(EmployeService)
        const empTimeServiceInstance = Container.get(EmployeTimeService)
        const affectEmployeServiceInstance = Container.get(AffectEmployeService)
        const employe = await employeServiceInstance.find({emp_shift:req.body.emp_shift,emp_domain:user_domain})
        let result=[]
        let i = 1
        if(req.body.site !=null && req.body.site != "") { 
            for(let emp of employe) {
            
                const affectemp = await affectEmployeServiceInstance.findOne({pme_domain:user_domain,pme_employe:emp.emp_addr, pme_site: req.body.site,
                    pme_start_date: {
                        [Op.lte]: req.body.date,
                    },
                    pme_end_date: {
                        [Op.gte]: req.body.date,
                    },

                })
                if (affectemp) {
                const empTime = await empTimeServiceInstance.findOne({empt_domain:user_domain,empt_code:emp.emp_addr, empt_date: req.body.date})
                // const stat  = (empTime != null) ? empTime.empt_stat : null
                // const start =  (empTime != null) ? empTime.empt_start : null
                // const end   = (empTime != null) ? empTime.empt_end : null
                const shift =  (empTime != null) ? empTime.empt_shift : employe.emp_shift
            // console.log(employe)
                const type =  (empTime != null) ? empTime.empt_type : null
                const amt =  (empTime != null) ? empTime.empt_amt : 0
                const empt_mrate_activ = (empTime != null) ? empTime.empt_mrate_activ: false
                const empt_arate_activ = (empTime != null) ? empTime.empt_arate_activ: false
                result.push({id:i, emp_addr: emp.emp_addr, emp_fname:emp.emp_fname, emp_lname:emp.emp_lname,emp_site:emp.emp_site,  shift, type,empt_mrate_activ,empt_arate_activ,amt})
                    i = i + 1

                }
            }
        }
        else {

            for(let emp of employe) {
            
                const affectemp = await affectEmployeServiceInstance.findOne({pme_domain:user_domain,pme_employe:emp.emp_addr,
                    pme_start_date: {
                        [Op.lte]: req.body.date,
                    },
                    pme_end_date: {
                        [Op.gte]: req.body.date,
                    },

                })
                if (!affectemp) {
                const empTime = await empTimeServiceInstance.findOne({empt_domain:user_domain,empt_code:emp.emp_addr, empt_date: req.body.date})
                // const stat  = (empTime != null) ? empTime.empt_stat : null
                // const start =  (empTime != null) ? empTime.empt_start : null
                // const end   = (empTime != null) ? empTime.empt_end : null
                const shift =  (empTime != null) ? empTime.empt_shift : employe.emp_shift
            // console.log(employe)
                const type =  (empTime != null) ? empTime.empt_type : null
                const amt =  (empTime != null) ? empTime.empt_amt : 0
                const empt_mrate_activ = (empTime != null) ? empTime.empt_mrate_activ: false
                const empt_arate_activ = (empTime != null) ? empTime.empt_arate_activ: false
                result.push({id:i, emp_addr: emp.emp_addr, emp_fname:emp.emp_fname, emp_lname:emp.emp_lname,emp_site:emp.emp_site,  shift, type, empt_mrate_activ, empt_arate_activ, amt})
                    i = i + 1

                }
            }
        }
        console.log(result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByDet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all empdet endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const empDetServiceInstance = Container.get(EmployeAvailabilityService);
    const employe = await empDetServiceInstance.find({ ...req.body, empd_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByJob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all empdet endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const empJobServiceInstance = Container.get(EmployeJobService);
    const employeJob = await empJobServiceInstance.find({ ...req.body, empj_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employeJob });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const employeScoreServiceInstance = Container.get(EmployeScoreService);
    const employeJobServiceInstance = Container.get(EmployeJobService);
    const { id } = req.params;
    const { Employe, employeScoreDetail, employeJobDetail } = req.body;
    const employe = await employeServiceInstance.update({ ...Employe, last_modified_by: user_code }, { id });

    await employeJobServiceInstance.delete({ empj_addr: Employe.emp_addr, empj_domain: user_domain });
    for (let entry of employeJobDetail) {
      entry = {
        ...entry,
        empj_domain: user_domain,
        empj_addr: Employe.emp_addr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await employeJobServiceInstance.create(entry);
    }

    await employeScoreServiceInstance.delete({ emps_addr: Employe.emp_addr, emps_domain: user_domain });
    for (let entry of employeScoreDetail) {
      entry = {
        emps_type: entry.code_value,
        emps_amt: entry.emps_amt,
        emps_domain: user_domain,
        emps_addr: Employe.emp_addr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await employeScoreServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const { id } = req.params;
    const employe = await employeServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAvailable = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const empTimeServiceInstance = Container.get(EmployeTimeService);
    const employe = await employeServiceInstance.find({ ...req.body, emp_domain: user_domain });
    let result = [];
    let i = 1;
    for (let emp of employe) {
      const empTime = await empTimeServiceInstance.findOne({
        empt_domain: user_domain,
        empt_code: emp.emp_addr,
        empt_date: new Date(),
      });
      const stat = empTime != null ? empTime.empt_stat : null;
      const start = empTime != null ? empTime.empt_start : null;
      const end = empTime != null ? empTime.empt_end : null;
      result.push({
        id: i,
        emp_addr: emp.emp_addr,
        emp_fname: emp.emp_fname,
        emp_lname: emp.emp_lname,
        emp_site: emp.emp_site,
        reason: stat,
        timestart: start,
        timeend: end,
      });
      i = i + 1;
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  createC,
  findOne,
  findAll,
  findBy,
  findByTime,
  findByTimeproject,
  findByDet,
  findByJob,
  update,
  deleteOne,
  findAvailable,
};
