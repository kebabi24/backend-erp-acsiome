import PatientService from '../../services/patient';
import SequenceService from '../../services/sequence';
import PatientDetailService from '../../services/patient-detail';
import PatientDetailTreatmentService from '../../services/patient-detail-treatment';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { Op } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const patientServiceInstance = Container.get(PatientService);
    const patientDetailServiceInstance = Container.get(PatientDetailService);
    const patientDetailTreatmentServiceInstance = Container.get(PatientDetailTreatmentService);
    const { Patient, patientDetail, patientDetailTreatment  } = req.body;
  //  console.log(patientDetail);
    const patient = await patientServiceInstance.create({
      ...Patient,
      pat_domain: user_domain,
      created_by: user_code,
      last_modified_by: user_code,
    });
    for (let entry of patientDetail) {
      entry = {
        ...entry,
        patd_domain: user_domain,
        patd_code: Patient.pat_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await patientDetailServiceInstance.create(entry);
    }
    
    for (let entry of patientDetailTreatment) {
      entry = {
        ...entry,
        patdt_domain: user_domain,
        patdt_code: Patient.pat_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await patientDetailTreatmentServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: patient });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// WITH NO DETAILS 
const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const patientServiceInstance = Container.get(PatientService);
    const sequenceServiceInstance = Container.get(SequenceService)
  
    const  patient   = req.body;
    const patients_coding = await sequenceServiceInstance.findOne({seq_seq : "PAT"})
    let code_patient = patients_coding.seq_prefix + '-' + patients_coding.seq_curr_val
    
    const patientCreated = await patientServiceInstance.create({
      ...patient,
      pat_code :  code_patient , 
      pat_domain: user_domain,
      created_by: user_code,
      last_modified_by: user_code,
    });

    const patients_coding_updated = await sequenceServiceInstance.update({seq_curr_val :patients_coding.seq_curr_val +1 },{seq_seq : "PAT"})
  
    return res.status(201).json({ message: 'created succesfully', data: patientCreated });
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
    const patientServiceInstance = Container.get(PatientService);
    const patientDetailServiceInstance = Container.get(PatientDetailService);
  
    const { id } = req.params;
    const patient = await patientServiceInstance.findOne({ id });
    const patientDetail = await patientDetailServiceInstance.find({
      patd_domain: user_domain,
      patd_code: patient.pat_code,
    });
    
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: { patient, patientDetail } });
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
    const patientServiceInstance = Container.get(PatientService);
    const patients = await patientServiceInstance.find({ pat_domain: user_domain });
    for (let pat of patients) {
      pat.int01 = new Date().getFullYear() -  new Date(pat.pat_birth_date).getFullYear()
    }
    return res.status(200).json({ message: 'fetched succesfully', data: patients });
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
    const patientServiceInstance = Container.get(PatientService);
    const patient = await patientServiceInstance.find({ ...req.body, pat_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: patient });
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
    const patientServiceInstance = Container.get(PatientService);
    const patientDetailServiceInstance = Container.get(PatientDetailService);
    
    const { id } = req.params;
    const { Patient, patientDetail } = req.body;
    const patient = await patientServiceInstance.update({ ...Patient, last_modified_by: user_code }, { id });

    console.log(Patient.pat_code)
    await patientDetailServiceInstance.delete({ patd_code: Patient.pat_code,patd_domain: user_domain });
    for (let entry of patientDetail) {
      entry = {
        ...entry,
        patd_domain: user_domain,
        patd_code: Patient.pat_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await patientDetailServiceInstance.create(entry);
    }

    return res.status(200).json({ message: 'fetched succesfully', data: patient });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const patientServiceInstance = Container.get(PatientService);
    const { id } = req.params;
    const patient = await patientServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneByPhone = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
   const { user_domain } = req.headers;
  try {
    const patientServiceInstance = Container.get(PatientService);
    const patientDetailServiceInstance = Container.get(PatientDetailService);
  
    const { phone } = req.params;
    var patientDetail 
    const patient = await patientServiceInstance.findOne({ pat_phone : phone });
    if(patient){
      const patientD = await patientDetailServiceInstance.find({
        patd_domain: user_domain,
       patd_code: patient.pat_code,
     });
    patientDetail  = patientD || {} 
    }
   
    
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: { patient, patientDetail} });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


export default {
  create,
  findOne,
  findAll,
  findBy,
  update,
  deleteOne,
  findOneByPhone,
  createPatient
};
