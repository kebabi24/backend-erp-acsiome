import JsReport from 'jsreport';
import * as fs from 'fs';
import * as path from 'path';
import * as template from './templates';
import * as prep from './helpers';
import { substring } from 'sequelize/types/lib/operators';
import { indexOf } from 'lodash';

export const generatePdf = async (rawData: any, name: string) => {
  let data = getData(rawData, name);

  let reportGenerator = JsReport({
    configFile: path.resolve('jsreport.config.json'),
  });
  await reportGenerator.init();

  //initialisation du jsreport + création du fichier pdf
  const result = await reportGenerator.render({
    template: {
      content: getTemplate(name),
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      //to add header & footer
      chrome: {
        scale: 1,
        displayHeaderFooter: true,
        headerTemplate: getHeader(name),
        footerTemplate: template.footer,
        printBackground: true,
        pageRanges: '',
        format: 'A4',
        width: '',
        height: '',
        marginTop: getHeaderSize(name),
        marginRight: '20px',
        marginBottom: '80px',
        marginLeft: '20px',
        waitForJS: false,
        waitForNetworkIddle: false,
      },
    },
    //données so
    data: data,
  });

  if (name != 'it-unp' && name != 'it-tr' && name != 'rct-unp') {
    reportGenerator.close();
    if (!fs.existsSync('C:/Users/DELL/projects/backend-erp-acsiome/src/reporting/files')) {
      fs.mkdir('C:/Users/DELL/projects/backend-erp-acsiome/src/reporting/files', err => {
        if (err) return err;
      });
    }
    console.log('NEW GEN', data);
    const filePath = 'C:/Users/DELL/projects/backend-erp-acsiome/src/reporting/files/' + data.titre + '.pdf';
    await fs.writeFileSync(filePath, result.content);
  }
  return result;
};

const getTemplate = (name: string) => {
  //const sub = name.split('-')[0];

  switch (name) {
    case 'so':
      return template.body;
    case 'psh':
      return template.body;
    case 'po':
      return template.body;
    case 'ih':
      return template.body;
    case 'prh':
      return template.body_prh;
    case 'it-tr':
      return template.body_itTr;
    case 'it-unp':
      return template.body_it;
    case 'rct-unp':
      return template.body_it;
  }
};

const getHeader = name => {
  //const sub = name.split('-')[0];
  switch (name) {
    case 'so':
      return template.header_so;
    case 'psh':
      return template.header_psh;
    case 'po':
      return template.header_po;
    case 'ih':
      return template.header_ih;
    case 'prh':
      return template.header_prh;
    case 'it-tr':
      return template.header_itTr;
    case 'it-unp':
      return template.header_it;
    case 'rct-unp':
      return template.header_it;
  }
};

const getData = (rawData, name: string) => {
  // const sub = name.split('-')[0];
  switch (name) {
    case 'so':
      return prep.prepareSoData(rawData);
    case 'po':
      return prep.preparePoData(rawData);
    case 'psh':
      return prep.preparePshData(rawData);
    case 'ih':
      return prep.prepareIhData(rawData);
    case 'prh':
      return prep.preparePrhData(rawData);
    case 'it-tr':
      return prep.prepareItTrData(rawData);
    case 'it-unp':
      return prep.prepareItData(rawData, name);
    case 'rct-unp':
      return prep.prepareItData(rawData, name);
  }
};

const getHeaderSize = (name: string) => {
  //const sub = name.split('-')[0];
  switch (name) {
    case 'it-tr':
      return '470px';
    case 'it-unp':
      return '470px';
    case 'rct-unp':
      return '470px';
    default:
      return '350px';
  }
};
