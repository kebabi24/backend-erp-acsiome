import { Container } from 'typedi';

import Sequelize from 'sequelize';

import base from '../base';

const sequelize = Container.get('sequelize');
//  mph_hist
const SpecificationTestHistory = sequelize.define(
  'specificationTestHistory',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

        mph_part: {type: Sequelize.STRING}, // in case of project = project_code // case accident :site_code 
        mph_routing: {type: Sequelize.STRING}, // code_specification
        mph_op:{ type:Sequelize.INTEGER}, // result number 
        mph_procedure:{ type:Sequelize.STRING}, 
        mph_test:{ type:Sequelize.STRING}, // mpd_test
        mph_date:{ type:Sequelize.DATEONLY}, // test_date || formation_date
        
        mph_cmtindx:{ type:Sequelize.INTEGER},
        mph_rsult:{ type:Sequelize.STRING}, // result 
        mph_op_trnbr:{ type:Sequelize.INTEGER},
        mph_lot:{ type:Sequelize.STRING}, // loc 
        mph_mch:{ type:Sequelize.STRING}, // employee code (case accident)
        mph_wr_nbr:{ type:Sequelize.STRING},
        mph_pass:{ type:Sequelize.BOOLEAN}, // yes or no (result)
        mph_testmthd:{ type:Sequelize.STRING},
        mph_attribute:{ type:Sequelize.STRING}, // educator
        
        mph_user1:{ type:Sequelize.STRING},
        mph_user2:{ type:Sequelize.STRING},
        mph_chr01:{ type:Sequelize.STRING}, // case accident : description 
        mph_chr02:{ type:Sequelize.STRING},  // case accident : observation
        mph_chr03:{ type:Sequelize.STRING},
        mph_chr04:{ type:Sequelize.STRING},
        mph_chr05:{ type:Sequelize.STRING},
        mph_dec01:{ type:Sequelize.DECIMAL}, // duration 
        mph_dec02:{ type:Sequelize.DECIMAL},
        mph_domain:{ type:Sequelize.STRING},
        oid_mph_mstr:{ type:Sequelize.DECIMAL}
       
        
        // ...base,
    },
    {
        tableName: "aa_specificationTestHistory",
    }
)
export default  SpecificationTestHistory ;
