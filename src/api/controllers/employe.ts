import EmployeService from '../../services/employe';
import ItemService from '../../services/item';
import EmployeAvailabilityService from '../../services/employe-availability';
import AffectEmployeService from '../../services/affect-employe';
import EmployeScoreService from '../../services/employe-score';
import EmployeJobService from '../../services/employe-job';
import EmployeTimeService from '../../services/employe-time';
import EmployeTrainingService from '../../services/employe-training';
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
    const employeTrainingServiceInstance = Container.get(EmployeTrainingService);
    const { Employe, employeScoreDetail, employeJobDetail , employeTrDetail } = req.body;
   
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
    // for (let entry of employeTrDetail) {
    //   entry = {
    //     ...entry,
    //     empf_domain: user_domain,
    //     empf_code: Employe.emp_addr,
    //     created_by: user_code,
    //     created_ip_adr: req.headers.origin,
    //     last_modified_by: user_code,
    //   };
    //   await employeTrainingServiceInstance.create(entry);
    // }
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
    const empTimeServiceInstance = Container.get(EmployeTimeService)
    const { emp, empDetail } = req.body;
  
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
        for(var d = new Date(entry.empd_fdate); d <= new Date(entry.empd_ldate); d.setDate(d.getDate() + 1)) {
         let  ent = {empt_domain:user_domain, empt_code: emp,empt_type:entry.empd_type,empt_date: d, 
              created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
         
          await empTimeServiceInstance.create(ent)

        }

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
    const employeTrainingServiceInstance = Container.get(EmployeTrainingService);
    const itemServiceInstance = Container.get(ItemService);
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
    const employeTr = await employeTrainingServiceInstance.find({
      empf_domain: user_domain,
      empf_code: employe.emp_addr,
    });
    let employeTrDetail = [];
    var i = 1;
    for (let emptr of employeTr) {
      const item = await itemServiceInstance.findOne({
        pt_domain: user_domain,
        pt_part: emptr.empf_part,
      });
      let obj = {
        id: i,
        empf_part: emptr.empf_part,
        desc: item.pt_desc1,
        empf_beging_date: emptr.empf_beging_date,
        empf_end_date: emptr.empf_end_date,
      };
      (i = i + 1), employeTrDetail.push(obj);
    }
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: { employe, employeScoreDetail, employeJobDetail,employeTrDetail } });
      // employeTrDetail
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
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const employeServiceInstance = Container.get(EmployeService);
    const employe = await employeServiceInstance.findOne({ ...req.body, emp_domain: user_domain });
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

                const type =  (empTime != null) ? empTime.empt_type : null
                const amt =  (empTime != null) ? empTime.empt_amt : 0
                const empt_mrate_activ = (empTime != null) ? empTime.empt_mrate_activ: false
                const empt_arate_activ = (empTime != null) ? empTime.empt_arate_activ: false
                result.push({id:i, emp_addr: emp.emp_addr, emp_fname:emp.emp_fname, emp_lname:emp.emp_lname,emp_site:emp.emp_site,  shift, type, empt_mrate_activ, empt_arate_activ, amt})
                    i = i + 1

                }
            }
        }

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
    const employeTrainingServiceInstance = Container.get(EmployeTrainingService);
    const { id } = req.params;
    const { Employe, employeScoreDetail, employeJobDetail ,  employeTrDetail} = req.body;
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
    // await employeTrainingServiceInstance.delete({ empf_code: Employe.emp_addr, empf_domain: user_domain });
    // for (let entry of employeTrDetail) {
    //   entry = {
    //     ...entry,
    //     empf_domain: user_domain,
    //     empf_code: Employe.emp_addr,
    //     created_by: user_code,
    //     created_ip_adr: req.headers.origin,
    //     last_modified_by: user_code,
    //     last_modified_ip_adr: req.headers.origin,
    //   };
    //   await employeTrainingServiceInstance.create(entry);
    // }

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
const findChild = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const employeServiceInstance = Container.get(EmployeService);
    let list= []
    //console.log(req.body)
    let addr = req.body.emp_addr
    const employe = await employeServiceInstance.find({ emp_domain: user_domain ,});
    //console.log(employe) emp_upper :{ [Op.ne]: null }
    for (let emp of employe) {
      console.log("emp.emp_addr",emp.emp_addr)
      const childs = await employeServiceInstance.find({ emp_upper: emp.emp_addr,emp_domain: user_domain });
    //  console.log(childs)
  let ch=[]
  for (let c of childs) {
    ch.push(c.emp_addr)
  }
  //console.log(ch)
      let obj= { "parent_id":emp.emp_addr   
    ,childerens:ch}
    list.push(obj)

    }

   // console.log(list)
    function findAllChildren(element,is_root,childerens) {
      if(is_root==false&&element!=undefined){
          childerens.push(element);   
      }
      var doc = list.find(o => o.parent_id === element);
      if(doc["childerens"].length==0){
          return [];
      }
      else{
          doc["childerens"].forEach(function (element) {
              findAllChildren(element,false,childerens);
          })
      }   
  } 
  
  var childerens=[];
  findAllChildren(addr,true,childerens);
  console.log("childerens==>",childerens);
  childerens.push(addr)
  const employes = await employeServiceInstance.find({ emp_addr:childerens,emp_domain: user_domain ,});
    return res.status(200).json({ message: 'fetched succesfully', data: employes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findTrBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const employeTrainingServiceInstance = Container.get(EmployeTrainingService);
    const employe = await employeTrainingServiceInstance.findOne({ ...req.body, empf_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
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
  findByOne,
  findChild,
  findTrBy,
};
