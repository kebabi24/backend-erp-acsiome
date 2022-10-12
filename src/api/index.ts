import { Router } from 'express';
import provider from './routes/provider';
import currency from './routes/currency';
import address from './routes/address';
import productLine from './routes/product-line';
import item from './routes/item';
import code from './routes/code';
import site from './routes/site';
import location from './routes/location';
import sequence from './routes/sequence';
import requisition from './routes/requisition';
import devise from './routes/devise';
import profile from './routes/profile';
import profileMobile from './routes/profile-mobile';
import user from './routes/user';
import userMobile from './routes/user-mobile';
import account from './routes/account';
import subaccount from './routes/subaccount';
import taxe from './routes/taxe';
import auth from './routes/auth';
import mesure from './routes/mesure';
import vendorProposal from './routes/vendor-proposal';
import quote from './routes/quote';
import saleorder from './routes/saleorder';
import customer from './routes/customer';
import customerMobile from './routes/customer-mobile';
import purchaseOrder from './routes/purchase-order';
import inventoryStatus from './routes/inventory-status';
import entity from './routes/entity';
import accountdefault from './routes/accountdefault';
import costSimulation from './routes/cost-simulation';
import tag from './routes/tag';
import locationDetail from './routes/location-detail';
import inventoryTransaction from './routes/inventory-transaction';
import purchaseReceives from './routes/purchase-receive';
import exchangeRate from './routes/exchange-rate';
import pricelist from './routes/pricelist';
import saleShiper from './routes/sale-shiper';
import invoiceOrder from './routes/invoice-order';
import accountReceivable from './routes/account-receivable';
import accountShiper from './routes/account-shiper';
import bank from './routes/bank';
import voucherOrder from './routes/voucher-order';
import accountPayable from './routes/account-payable';
import daybook from './routes/daybook';
import workcenter from './routes/workcenter';
import workrouting from './routes/workrouting';
import bom from './routes/bom';
import ps from './routes/ps';
import workOrder from './routes/work-order';
import workOrderDetail from './routes/work-order-detail';
import operationHistory from './routes/operation-history';
import reason from './routes/reason';
import frais from './routes/frais';
import job from './routes/job';
import tool from './routes/tool';
import task from './routes/task';
import project from './routes/project';
import employe from './routes/employe';
import employeAvailability from './routes/employe-availability';
import affectEmploye from './routes/affect-employe';
import role from './routes/role';
import codeMobile from './routes/code-mobile';
import addresseMobile from './routes/addresse-mobile';
import menu from './routes/menu';
import service from './routes/mobile-service';
import addReport from './routes/add-report';
import config from './routes/config';
import payMeth from './routes/pay-meth';
import invoiceOrderTemp from './routes/invoice-order-temp';
import worouting from './routes/worouting';
import bomPart from './routes//bom-part';
import costcenter from './routes/costcenter';
import generalLedger from './routes/general-ledger';
import itinerary from './routes/itinerary';
import roleItinerary from './routes/role-itinerary';
import mobileSettings from './routes/mobile-settings';
import posCategory from './routes/pos-category';
import posProduct from './routes/pos-product';
import posCategoryProduct from './routes/pos-category-product';
import posOrder from './routes/pos-order';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  provider(app);
  customer(app);
  customerMobile(app);
  currency(app);
  devise(app);
  bom(app);
  ps(app);
  address(app);
  code(app);
  mesure(app);
  account(app);
  taxe(app);
  productLine(app);
  item(app);
  site(app);
  location(app);
  sequence(app);
  requisition(app);
  profile(app);
  profileMobile(app);
  user(app);
  userMobile(app);
  vendorProposal(app);
  quote(app);
  saleorder(app);
  purchaseOrder(app);
  auth(app);
  inventoryStatus(app);
  entity(app);
  accountdefault(app);
  costSimulation(app);
  tag(app);
  locationDetail(app);
  inventoryTransaction(app);
  purchaseReceives(app);
  exchangeRate(app);
  pricelist(app);
  saleShiper(app);
  invoiceOrder(app);
  accountReceivable(app);
  accountShiper(app);
  bank(app);
  voucherOrder(app);
  accountPayable(app);
  daybook(app);
  workcenter(app);
  workrouting(app);
  workOrder(app);
  workOrderDetail(app);
  operationHistory(app);
  reason(app);
  frais(app);
  job(app);
  tool(app);
  task(app);
  project(app);
  employe(app);
  employeAvailability(app);
  affectEmploye(app);
  //addReport(app)
  config(app);
  payMeth(app);
  invoiceOrderTemp(app);
  worouting(app);
  bomPart(app);
  subaccount(app);
  costcenter(app);
  generalLedger(app);
  role(app);
  codeMobile(app);
  addresseMobile(app);
  itinerary(app);
  roleItinerary(app);
  menu(app);
  service(app);
  addReport(app);
  mobileSettings(app);
  posCategory(app);
  posProduct(app);
  posCategoryProduct(app);
  posOrder(app);
  return app;
};
