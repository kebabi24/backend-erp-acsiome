import { Container } from 'typedi';
import Sequelize from 'sequelize';
import base from './base';
import Sequence from './sequence';
import { update } from 'lodash';

const sequelize = Container.get('sequelize');

const Requisition = sequelize.define(
  'requisition',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rqm_nbr: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    rqm_req_date: Sequelize.DATEONLY,
    rqm_rqby_userid: Sequelize.STRING,
    rqm_end_userid: Sequelize.STRING,
    rqm_ship: Sequelize.STRING,
    rqm_cmtindx: Sequelize.DATEONLY,
    rqm_reason: Sequelize.STRING,
    rqm_eby_userid: Sequelize.STRING,
    rqm_status: Sequelize.STRING,
    rqm_print: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_due_date: Sequelize.DATEONLY,
    rqm_need_date: Sequelize.DATEONLY,
    rqm_vend: {
      type: Sequelize.STRING,
      references: {
        model: 'vd_mstr',
        key: 'vd_addr',
      },
    },
    rqm_acct: Sequelize.STRING,
    rqm_sub: Sequelize.STRING,
    rqm_cc: Sequelize.STRING,
    rqm_project: Sequelize.STRING,
    rqm_fix_pr: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_curr: Sequelize.STRING,
    rqm_ex_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_ent_date: Sequelize.DATEONLY,
    rqm_site: Sequelize.STRING,
    rqm_lang: Sequelize.STRING,
    rqm_disc_pct: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_bill: Sequelize.STRING,
    rqm_contact: Sequelize.STRING,
    rqm_ln_fmt: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_type: Sequelize.STRING,
    rqm_pr_list: Sequelize.STRING,
    rqm_ent_ex: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_rtdto_purch: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_partial: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_buyer: Sequelize.STRING,
    rqm_job: Sequelize.STRING,
    rqm_category: {
      type: Sequelize.STRING,
      references: {
        model: 'seq_mstr',
        key: 'seq_seq',
      },
    },
    rqm_fix_rate: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_rmks: Sequelize.STRING,
    rqm_direct: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_apr_cmtindx: Sequelize.INTEGER,
    rqm_rtto_userid: Sequelize.STRING,
    rqm_prev_userid: Sequelize.STRING,
    rqm_fob: Sequelize.STRING,
    rqm_shipvia: Sequelize.STRING,
    rqm_email_opt: Sequelize.STRING,
    rqm_entity: Sequelize.STRING,
    rqm_pent_userid: Sequelize.STRING,
    rqm_total: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_max_total: {type: Sequelize.DECIMAL, defaultValue : 0  },
    rqm_pr_list2: Sequelize.STRING,
    rqm_rtto_date: Sequelize.DATEONLY,
    rqm_rtto_time: Sequelize.INTEGER,
    rqm_open: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_prev_rtp: {type: Sequelize.BOOLEAN, defaultValue : false  },
    rqm_cls_date: Sequelize.DATEONLY,
    rqm_aprv_stat: Sequelize.STRING,
    rqm_ex_rate2: Sequelize.DATEONLY,
    rqm_ex_ratetype: Sequelize.STRING,
    rqm_exru_seq: Sequelize.INTEGER,
    rqm_domain:  {
      type: Sequelize.STRING,
      defaultValue: 'zima'
    },
    oid_rqm_mstr: {type: Sequelize.DECIMAL, defaultValue : 0  },
    ...base,
  },
  {
    tableName: 'rqm_mstr',
  },
);
Requisition.addHook('beforeCreate', async (instance, option) => {
  const seq = await Sequence.findOne({ where: { seq_seq: instance.rqm_category, seq_type: "RQ"  } });
  instance.rqm_nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val)+1}`;
  await Sequence.update({ seq_curr_val: Number(seq.seq_curr_val )+1 }, { where: { seq_seq: instance.rqm_category } });
});
export default Requisition;
