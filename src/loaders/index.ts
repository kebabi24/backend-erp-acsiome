import expressLoader from './express';
import { Container } from 'typedi';
import dependencyInjectorLoader from './dependencyInjector';
import sequelizeLoader from './sequelize'
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  const sequelizeConnection = await sequelizeLoader()
  Logger.info('✌️ DB loaded and connected!');
  Container.set('sequelize', sequelizeConnection)


  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const testModel = {
    name: 'testModel',
    // Notice the require syntax and the '.default'
    model: require('../models/test').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({
    models: [
      testModel,
      {name:'addressModel',model: require('../models/address').default},
      //{name:'currencyModel',model: require('../models/currency').default},
      {name:'providerModel',model: require('../models/provider').default},
      {name:'customerModel',model: require('../models/customer').default},
      {name:'productLineModel',model: require('../models/product-line').default},
      {name:'itemModel',model: require('../models/item').default},
      {name:'codeModel',model: require('../models/code').default},
      {name:'accountModel',model: require('../models/account').default},
      {name:'subaccountModel',model: require('../models/subaccount').default},
      {name:'subaccountDetailModel',model: require('../models/subaccount-detail').default},
      {name:'taxeModel',model: require('../models/taxe').default},
      {name:'siteModel',model: require('../models/site').default},
      {name:'locationModel',model: require('../models/location').default},
      {name:'profileModel',model: require('../models/profile').default},
      {name:'userModel',model: require('../models/user').default},
      {name:'requisitionModel',model: require('../models/requisition').default},
      {name:'requisitionDetailModel',model: require('../models/requisition-detail').default},
      {name:'sequenceModel',model: require('../models/sequence').default},
      {name:'deviseModel',model: require('../models/devise').default},
      {name:'mesureModel',model: require('../models/mesure').default},
      {name:'vendorProposalModel',model: require('../models/vendor-proposal').default},
      {name:'vendorProposalDetailModel',model: require('../models/vendor-proposal-detail').default},
      {name:'quoteModel',model: require('../models/quote').default},
      {name:'quoteDetailModel',model: require('../models/quote-detail').default},
      {name:'saleorderModel',model: require('../models/saleorder').default},
      {name:'saleorderDetailModel',model: require('../models/saleorder-detail').default},
      {name:'purchaseOrderModel',model: require('../models/purchase-order').default},
      {name:'purchaseOrderDetailModel',model: require('../models/purchase-order-detail').default},
      {name:'inventoryStatusModel',model: require('../models/inventory-status').default},
      {name:'inventoryStatusDetailsModel',model: require('../models/inventory-status-details').default},
      {name:'entityModel',model: require('../models/entity').default},
      {name:'accountdefaultModel',model: require('../models/accountdefault').default},
      {name:'costSimulationModel',model: require('../models/cost-simulation').default},
      {name:'tagModel',model: require('../models/tag').default},
      {name:'locationDetailModel',model: require('../models/location-detail').default},
      {name:'InvetoryTransactionModel',model: require('../models/inventory-transaction').default},
      {name:'PurchaseReceiveModel',model: require('../models/purchase-receive').default},
      {name:'exchangeRateModel',model: require('../models/exchange-rate').default},
      {name:'pricelistModel',model: require('../models/pricelist').default},
      {name:'SaleShiperModel',model: require('../models/sale-shiper').default},
      {name:'invoiceOrderModel',model: require('../models/invoice-order').default},
      {name:'invoiceOrderDetailModel',model: require('../models/invoice-order-detail').default},
      {name:'accountReceivableModel',model: require('../models/account-receivable').default},
      {name:'bankModel',model: require('../models/bank').default},
      {name:'bankDetailModel',model: require('../models/bank-detail').default},
      {name:'accountReceivableDetailModel',model: require('../models/account-receivable-detail').default},
      {name:'accountShiperModel',model: require('../models/account-shiper').default},
      {name:'voucherOrderModel',model: require('../models/voucher-order').default},
      {name:'voucherOrderDetailModel',model: require('../models/voucher-order-detail').default},
      {name:'accountPayableModel',model: require('../models/account-payable').default},
      {name:'accountPayableDetailModel',model: require('../models/account-payable-detail').default},
      {name:'generalLedgerModel',model: require('../models/general-ledger').default},
      {name:'daybookModel',model: require('../models/daybook').default},
      {name:'workcenterModel',model: require('../models/workcenter').default},
      {name:'workroutingModel',model: require('../models/workrouting').default},
      {name:'woroutingModel',model: require('../models/worouting').default},
      
      {name:'bomModel',model: require('../models/bom').default},
      {name:'bomPartModel',model: require('../models/bom-part').default},
      {name:'psModel',model: require('../models/ps').default},  
      {name:'workOrderModel',model: require('../models/work-order').default},  
      {name:'workOrderDetailModel',model: require('../models/work-order-detail').default},
      {name:'operationHistoryModel',model: require('../models/operation-history').default},  
      {name:'reasonModel',model: require('../models/reason').default},
      {name:'fraisModel',model: require('../models/frais').default},
      {name:'jobModel',model: require('../models/job').default},
      {name:'jobDetailModel',model: require('../models/job-detail').default},
      {name:'toolModel',model: require('../models/tool').default},
      {name:'toolDetailModel',model: require('../models/tool-detail').default},
      {name:'taskModel',model: require('../models/task').default},
      {name:'taskDetailModel',model: require('../models/task-detail').default},
      {name:'projectModel',model: require('../models/project').default},
      {name:'projectDetailModel',model: require('../models/project-detail').default},
      {name:'employeModel',model: require('../models/employe').default},
      {name:'employeAvailabilityModel',model: require('../models/employe-availability').default},
      {name:'affectEmployeModel',model: require('../models/affect-employe').default},
      {name:'projectTaskDetailModel',model: require('../models/project-task-detail').default},
      {name:'addReportModel',model: require('../models/add-report').default},
      {name:'configModel',model: require('../models/config').default},
      {name:'payMethModel',model: require('../models/pay-meth').default},
      {name:'payMethDetailModel',model: require('../models/pay-meth-detail').default},
      {name:'invoiceOrderTempModel',model: require('../models/invoice-order-temp').default},
      {name:'invoiceOrderTempDetailModel',model: require('../models/invoice-order-temp-detail').default},
      {name:'costcenterModel',model: require('../models/costcenter').default},
      {name:'costsubModel',model: require('../models/costsub').default},
      {name:'costaccountModel',model: require('../models/costaccount').default},
      // mobile models
      {name:'profileMobileModel',model: require('../models/mobile-models/profile-mobile').default},
      {name:'userMobileModel',model: require('../models/mobile-models/user-mobile').default},
      {name:'roleModel',model: require('../models/mobile-models/role').default},
      {name:'customerMobileModel',model: require('../models/mobile-models/customer').default},
      {name:'itineraryModel',model: require('../models/mobile-models/itinerary').default},
      {name:'codeMobileModel',model: require('../models/mobile-models/codes').default},
      {name:'addresseModel',model: require('../models/mobile-models/addresse').default},
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  require('../models/address').default.hasOne(require('../models/provider').default,{foreignKey: 'vd_addr',sourceKey: 'ad_addr'})
  require('../models/provider').default.belongsTo(require('../models/address').default,{  foreignKey: 'vd_addr', targetKey: 'ad_addr'})
  
  //associations between mobile models
  require('../models/mobile-models/profile-mobile').default.hasOne(require('../models/mobile-models/user-mobile').default,{foreignKey: 'username', sourceKey:'profile_name'})
  require('../models/mobile-models/user-mobile').default.belongsTo(require('../models/mobile-models/profile-mobile').default,{ foreignKey: 'username', targetKey:'profile_name'})

  require('../models/mobile-models/customer').default.hasOne(require('../models/mobile-models/addresse').default,{foreignKey: 'customer_id',sourceKey: 'customer_name'})
  require('../models/mobile-models/addresse').default.belongsTo(require('../models/mobile-models/customer').default,{  foreignKey: 'customer_id', targetKey: 'customer_name'})

  require('../models/mobile-models/user-mobile').default.hasOne(require('../models/mobile-models/role').default,{foreignKey: 'role_userMobileId',sourceKey: 'username'})
  require('../models/mobile-models/role').default.belongsTo(require('../models/mobile-models/user-mobile').default,{  foreignKey: 'role_userMobileId', targetKey: 'username'})

  require('../models/profile').default.hasOne(require('../models/user').default,{foreignKey: 'usrd_profile',sourceKey: 'usrg_code'})
  require('../models/user').default.belongsTo(require('../models/profile').default,{  foreignKey: 'usrd_profile', targetKey: 'usrg_code'})



  require('../models/address').default.hasOne(require('../models/customer').default,{foreignKey: 'cm_addr',sourceKey: 'ad_addr'})
  require('../models/customer').default.belongsTo(require('../models/address').default,{  foreignKey: 'cm_addr', targetKey: 'ad_addr'})

  require('../models/bom').default.hasOne(require('../models/bom-part').default,{foreignKey: 'ptb_bom',sourceKey: 'bom_parent'})
  require('../models/bom-part').default.belongsTo(require('../models/bom').default,{  foreignKey: 'ptb_bom', targetKey: 'bom_parent'})

  require('../models/sequence').default.hasOne(require('../models/requisition').default,{foreignKey: 'rqm_category',sourceKey: 'seq_seq'})
  require('../models/requisition').default.belongsTo(require('../models/sequence').default,{  foreignKey: 'rqm_category', targetKey: 'seq_seq'})
  require('../models/provider').default.hasOne(require('../models/requisition').default,{foreignKey: 'rqm_vend',sourceKey: 'vd_addr'})
  require('../models/requisition').default.belongsTo(require('../models/provider').default,{  foreignKey: 'rqm_vend', targetKey: 'vd_addr'})
  require('../models/item').default.hasOne(require('../models/requisition-detail').default,{foreignKey: 'rqd_part',sourceKey: 'pt_part'})
  require('../models/requisition-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'rqd_part', targetKey: 'pt_part'})
  require('../models/provider').default.hasOne(require('../models/vendor-proposal').default,{foreignKey: 'vp_vend',sourceKey: 'vd_addr'})
  require('../models/vendor-proposal').default.belongsTo(require('../models/provider').default,{  foreignKey: 'vp_vend', targetKey: 'vd_addr'})
  require('../models/requisition').default.hasOne(require('../models/vendor-proposal').default,{foreignKey: 'vp_rqm_nbr',sourceKey: 'rqm_nbr'})
  require('../models/vendor-proposal').default.belongsTo(require('../models/requisition').default,{  foreignKey: 'vp_rqm_nbr', targetKey: 'rqm_nbr'})
  require('../models/item').default.hasOne(require('../models/vendor-proposal-detail').default,{foreignKey: 'vpd_part',sourceKey: 'pt_part'})
  require('../models/vendor-proposal-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'vpd_part', targetKey: 'pt_part'})
  require('../models/provider').default.hasOne(require('../models/purchase-order').default,{foreignKey: 'po_vend',sourceKey: 'vd_addr'})
  require('../models/purchase-order').default.belongsTo(require('../models/provider').default,{  foreignKey: 'po_vend', targetKey: 'vd_addr'})
  require('../models/item').default.hasOne(require('../models/purchase-order-detail').default,{foreignKey: 'pod_part',sourceKey: 'pt_part'})
  require('../models/purchase-order-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'pod_part', targetKey: 'pt_part'})
  require('../models/item').default.hasOne(require('../models/cost-simulation').default,{foreignKey: 'sct_part',sourceKey: 'pt_part'})
  require('../models/cost-simulation').default.belongsTo(require('../models/item').default,{  foreignKey: 'sct_part', targetKey: 'pt_part'})
  require('../models/item').default.hasOne(require('../models/tag').default,{foreignKey: 'tag_part',sourceKey: 'pt_part'})
  require('../models/tag').default.belongsTo(require('../models/item').default,{  foreignKey: 'tag_part', targetKey: 'pt_part'})
  require('../models/quote').default.belongsTo(require('../models/customer').default,{  foreignKey: 'qo_cust', targetKey: 'cm_addr'})
  require('../models/quote-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'qod_part', targetKey: 'pt_part'})
  require('../models/taxe').default.hasOne(require('../models/item').default,{foreignKey: 'pt_taxc',sourceKey: 'tx2_tax_code'})
  require('../models/item').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'pt_taxc', targetKey: 'tx2_tax_code'})
  require('../models/item').default.hasOne(require('../models/location-detail').default,{foreignKey: 'ld_part',sourceKey: 'pt_part'})
  require('../models/location-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'ld_part', targetKey: 'pt_part'})
  require('../models/item').default.hasOne(require('../models/inventory-transaction').default,{foreignKey: 'tr_part',sourceKey: 'pt_part'})
  require('../models/inventory-transaction').default.belongsTo(require('../models/item').default,{  foreignKey: 'tr_part', targetKey: 'pt_part'})
  require('../models/item').default.hasOne(require('../models/purchase-receive').default,{foreignKey: 'prh_part',sourceKey: 'pt_part'})
  require('../models/purchase-receive').default.belongsTo(require('../models/item').default,{  foreignKey: 'prh_part', targetKey: 'pt_part'})
  require('../models/purchase-order').default.hasOne(require('../models/purchase-receive').default,{foreignKey: 'prh_nbr',sourceKey: 'po_nbr'})
  require('../models/purchase-receive').default.belongsTo(require('../models/purchase-order').default,{  foreignKey: 'prh_nbr', targetKey: 'po_nbr'})
  
  require('../models/location').default.hasOne(require('../models/item').default,{foreignKey: 'pt_loc',sourceKey: 'loc_loc'})
  require('../models/item').default.belongsTo(require('../models/location').default,{  foreignKey: 'pt_loc', targetKey: 'loc_loc'})
  // require('../models/exchange-rate').default.hasOne(require('../models/currency').default,{foreignKey: 'cu_curr',sourceKey: 'exr_curr1'})
  // require('../models/currency').default.belongsTo(require('../models/exchange-rate').default,{  foreignKey: 'cu_curr', targetKey: 'exr_curr1'})

  // require('../models/exchange-rate').default.hasOne(require('../models/currency').default,{foreignKey: 'cu_curr',sourceKey: 'exr_curr2'})
  // require('../models/currency').default.belongsTo(require('../models/exchange-rate').default,{  foreignKey: 'cu_curr', targetKey: 'exr_curr2'})
  require('../models/sale-shiper').default.belongsTo(require('../models/item').default,{  foreignKey: 'psh_part', targetKey: 'pt_part'})
  require('../models/saleorder').default.hasOne(require('../models/sale-shiper').default,{foreignKey: 'psh_nbr',sourceKey: 'so_nbr'})
  require('../models/sale-shiper').default.belongsTo(require('../models/saleorder').default,{  foreignKey: 'psh_nbr', targetKey: 'so_nbr'})
  
  require('../models/item').default.hasOne(require('../models/quote-detail').default,{foreignKey: 'qod_part',sourceKey: 'pt_part'})
  require('../models/sequence').default.hasOne(require('../models/saleorder').default,{foreignKey: 'so_category',sourceKey: 'seq_seq'})
  require('../models/saleorder').default.belongsTo(require('../models/sequence').default,{  foreignKey: 'so_category', targetKey: 'seq_seq'})
  require('../models/customer').default.hasOne(require('../models/saleorder').default,{foreignKey: 'so_cust',sourceKey: 'cm_addr'})
  require('../models/saleorder').default.belongsTo(require('../models/customer').default,{  foreignKey: 'so_cust', targetKey: 'cm_addr'})
  require('../models/item').default.hasOne(require('../models/saleorder-detail').default,{foreignKey: 'sod_part',sourceKey: 'pt_part'})
  require('../models/saleorder-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'sod_part', targetKey: 'pt_part'})
  require('../models/customer').default.hasOne(require('../models/invoice-order').default,{foreignKey: 'ih_bill',sourceKey: 'cm_addr'})
  require('../models/invoice-order').default.belongsTo(require('../models/customer').default,{  foreignKey: 'ih_bill', targetKey: 'cm_addr'})
  require('../models/item').default.hasOne(require('../models/invoice-order-detail').default,{foreignKey: 'idh_part',sourceKey: 'pt_part'})
  require('../models/invoice-order-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'idh_part', targetKey: 'pt_part'})
  require('../models/customer').default.hasOne(require('../models/account-receivable').default,{foreignKey: 'ar_bill',sourceKey: 'cm_addr'})
  require('../models/account-receivable').default.belongsTo(require('../models/customer').default,{  foreignKey: 'ar_bill', targetKey: 'cm_addr'})
  require('../models/customer').default.hasOne(require('../models/account-receivable').default,{foreignKey: 'ar_cust',sourceKey: 'cm_addr'})
  require('../models/account-receivable').default.belongsTo(require('../models/customer').default,{  foreignKey: 'ar_cust', targetKey: 'cm_addr'})

  require('../models/taxe').default.hasOne(require('../models/saleorder-detail').default,{foreignKey: 'sod_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/saleorder-detail').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'sod_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/taxe').default.hasOne(require('../models/purchase-order-detail').default,{foreignKey: 'pod_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/purchase-order-detail').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'pod_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/taxe').default.hasOne(require('../models/quote-detail').default,{foreignKey: 'qod_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/quote-detail').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'qod_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/taxe').default.hasOne(require('../models/invoice-order-detail').default,{foreignKey: 'idh_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/invoice-order-detail').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'idh_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/taxe').default.hasOne(require('../models/purchase-receive').default,{foreignKey: 'prh_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/purchase-receive').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'prh_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/taxe').default.hasOne(require('../models/sale-shiper').default,{foreignKey: 'psh_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/sale-shiper').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'psh_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/address').default.hasOne(require('../models/bank').default,{foreignKey: 'bk_code',sourceKey: 'ad_addr'})
  require('../models/bank').default.belongsTo(require('../models/address').default,{  foreignKey: 'bk_code', targetKey: 'ad_addr'})

  require('../models/customer').default.hasOne(require('../models/account-shiper').default,{foreignKey: 'as_cust',sourceKey: 'cm_addr'})
  require('../models/account-shiper').default.belongsTo(require('../models/customer').default,{  foreignKey: 'as_cust', targetKey: 'cm_addr'})

  require('../models/provider').default.hasOne(require('../models/voucher-order').default,{foreignKey: 'vh_vend',sourceKey: 'vd_addr'})
  require('../models/voucher-order').default.belongsTo(require('../models/provider').default,{  foreignKey: 'vh_vend', targetKey: 'vd_addr'})
  require('../models/item').default.hasOne(require('../models/voucher-order-detail').default,{foreignKey: 'vdh_part',sourceKey: 'pt_part'})
  require('../models/voucher-order-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'vdh_part', targetKey: 'pt_part'})
  require('../models/taxe').default.hasOne(require('../models/voucher-order-detail').default,{foreignKey: 'vdh_tax_code',sourceKey: 'tx2_tax_code'})
  require('../models/voucher-order-detail').default.belongsTo(require('../models/taxe').default,{  foreignKey: 'vdh_tax_code', targetKey: 'tx2_tax_code'})

  require('../models/provider').default.hasOne(require('../models/account-payable').default,{foreignKey: 'ap_vend',sourceKey: 'vd_addr'})
  require('../models/account-payable').default.belongsTo(require('../models/provider').default,{  foreignKey: 'ap_vend', targetKey: 'vd_addr'})
  require('../models/account-payable').default.belongsTo(require('../models/address').default,{  foreignKey: 'ap_vend', targetKey: 'ad_addr'})

  require('../models/general-ledger').default.belongsTo(require('../models/address').default,{  foreignKey: 'glt_addr', targetKey: 'ad_addr'})

  require('../models/item').default.hasOne(require('../models/ps').default,{foreignKey: 'ps_comp',sourceKey: 'pt_part'})
  require('../models/ps').default.belongsTo(require('../models/item').default,{  foreignKey: 'ps_comp', targetKey: 'pt_part'})
  
  
  require('../models/item').default.hasOne(require('../models/work-order').default,{foreignKey: 'wo_part',sourceKey: 'pt_part'})
  require('../models/work-order').default.belongsTo(require('../models/item').default,{  foreignKey: 'wo_part', targetKey: 'pt_part'})
 
  require('../models/item').default.hasOne(require('../models/work-order-detail').default,{foreignKey: 'wod_part',sourceKey: 'pt_part'})
  require('../models/work-order-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'wod_part', targetKey: 'pt_part'})

  require('../models/customer').default.hasOne(require('../models/project').default,{foreignKey: 'pm_cust',sourceKey: 'cm_addr'})
  require('../models/project').default.belongsTo(require('../models/customer').default,{  foreignKey: 'pm_cust', targetKey: 'cm_addr'})
 
  require('../models/item').default.hasOne(require('../models/project-detail').default,{foreignKey: 'pmd_part',sourceKey: 'pt_part'})
  require('../models/project-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'pmd_part', targetKey: 'pt_part'})

  require('../models/task').default.hasOne(require('../models/project-detail').default,{foreignKey: 'pmd_task',sourceKey: 'tk_code'})
  require('../models/project-detail').default.belongsTo(require('../models/task').default,{  foreignKey: 'pmd_task', targetKey: 'tk_code'})

  require('../models/employe').default.hasOne(require('../models/employe-availability').default,{foreignKey: 'empd_addr',sourceKey: 'emp_addr'})
  require('../models/employe-availability').default.belongsTo(require('../models/employe').default,{  foreignKey: 'empd_addr', targetKey: 'emp_addr'})

  require('../models/project').default.hasOne(require('../models/affect-employe').default,{foreignKey: 'pme_pm_code',sourceKey: 'pm_code'})
  require('../models/affect-employe').default.belongsTo(require('../models/project').default,{  foreignKey: 'pme_pm_code', targetKey: 'pm_code'})

  

  require('../models/project').default.hasOne(require('../models/add-report').default,{foreignKey: 'pmr_pm_code',sourceKey: 'pm_code'})
  require('../models/add-report').default.belongsTo(require('../models/project').default,{  foreignKey: 'pmr_pm_code', targetKey: 'pm_code'})

  require('../models/customer').default.hasOne(require('../models/invoice-order-temp').default,{foreignKey: 'ith_bill',sourceKey: 'cm_addr'})
  require('../models/invoice-order-temp').default.belongsTo(require('../models/customer').default,{  foreignKey: 'ith_bill', targetKey: 'cm_addr'})
  require('../models/item').default.hasOne(require('../models/invoice-order-temp-detail').default,{foreignKey: 'itdh_part',sourceKey: 'pt_part'})
  require('../models/invoice-order-temp-detail').default.belongsTo(require('../models/item').default,{  foreignKey: 'itdh_part', targetKey: 'pt_part'})

 

  Logger.info('✌️ ADD MODEL ASSOCIATION');
  // sync models
  await sequelizeConnection.sync()
  Logger.info('✌️ SYNC ALL MODELS');
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
