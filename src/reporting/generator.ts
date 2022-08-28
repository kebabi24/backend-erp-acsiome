import JsReport from 'jsreport';
import * as fs from 'fs';
import * as path from 'path';
import { footer, header_so, body_so } from './templates';
import { prepareSoData } from './helpers';


export const generatePdf = async (rawData, template) => {
    let data;
    if(template == 'so')
    { data = prepareSoData(rawData) }

        let reportGenerator= JsReport({
            configFile: path.resolve('jsreport.config.json')
        });
        await reportGenerator.init()

        //initialisation du jsreport + création du fichier pdf
        const result = await reportGenerator.render({
                template: {
                    content: getTemplate(template),
                    engine: 'handlebars',
                    recipe: 'chrome-pdf', 
                    //to add header & footer 
                    chrome: {
                        "scale": 1,
                        "displayHeaderFooter": true,
                        "headerTemplate": getHeader(template),
                        "footerTemplate": footer,
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
            const filePath = "/pdf/" + data.titre + ".pdf";
            await fs.writeFileSync(__dirname + filePath, result.content)
            return result
}


const getTemplate = (template_name) => {
	switch (template_name)
	{
		case 'so' : return body_so
	}
}



const getHeader = (template_name) => {
	switch (template_name)
	{
		case 'so' : return header_so
	}
}
