import JsReport from 'jsreport';
import * as fs from 'fs';
import * as path from 'path';
import * as template from './templates';
import * as prep from './helpers';

export const generatePdf = async (rawData : any , name : string) => {
    let data = getData(rawData, name)
    //console.log("\n\n FROM GEN", data)


        let reportGenerator= JsReport({
            configFile: path.resolve('jsreport.config.json')
        });
        await reportGenerator.init()

        //initialisation du jsreport + création du fichier pdf
        const result = await reportGenerator.render({
                template: {
                    content: getTemplate(name),
                    engine: 'handlebars',
                    recipe: 'chrome-pdf', 
                    //to add header & footer 
                    chrome: {
                        "scale": 1,
                        "displayHeaderFooter": true,
                        "headerTemplate": getHeader(name),
                        "footerTemplate": template.footer,
                        "printBackground": true,
                        "pageRanges": "",
                        "format": "A4",
                        "width": "",
                        "height": "",
                        "marginTop": "350px",
                        "marginRight": "20px",
                        "marginBottom": "80px",
                        "marginLeft": "20px",
                        "waitForJS": false,
                        "waitForNetworkIddle": false
                    },

                },
                //données so 
                data: data,
            })

            reportGenerator.close()
            if (!fs.existsSync("/Users/bchahrazed/desktop/acsiome/commandes")) {
                fs.mkdir("/Users/bchahrazed/desktop/acsiome/commandes", err => {
                    if(err) return err;
                })
            }
            const filePath = "/Users/bchahrazed/desktop/acsiome/commandes/" + data.titre + ".pdf";
            await fs.writeFileSync(filePath, result.content)
            return result
}


const getTemplate = (name : string) => {
	switch (name)
	{
		case 'so' : return template.body;
        case 'psh' : return template.body;
        case 'po' : return template.body;
        case 'ih' : return template.body;
	}
}



const getHeader = (name) => {
	switch (name)
	{
		case 'so' : return template.header_so;
        case 'psh' : return template.header_psh;
        case 'po' : return template.header_po;
        case 'ih' : return template.header_ih;
	}
}

const getData = (rawData, name) => {
    switch (name)
    {
        case 'so' : return  prep.prepareSoData(rawData);
        case 'po' : return  prep.preparePoData(rawData);
        case 'psh' : return  prep.preparePshData(rawData);
        case 'ih' : return prep.prepareIhData(rawData);
    }
}