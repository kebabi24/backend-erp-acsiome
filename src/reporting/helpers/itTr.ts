//Transfert de stock

import { numberToLetters } from "./string";

//preparer les données à utiliser dans le fichier pdf
export const prepareItTrData = (rawData : any) => {

    const titre = "Bon de Transfert N° "
    let data_it = {
        titre : titre.concat(rawData.nlot), // à utiliser pour nommer le fichier
        nbr : rawData.nlot,
        info : {
            site : rawData.it.tr_site,
            siteA : rawData.it.tr_ref_site,
            location : rawData.it.tr_loc,
            locationA : rawData.it.tr_ref_loc,
            date : rawData.it.tr_effdate,
        },
        
        line : prepareCmdData(rawData.detail),
    };
    return data_it
}


//preparer les lignes 
const prepareCmdData = (rawArr : Array<any>) => {
    let x, Arr= [];
    for (let i = 0; i < rawArr.length; i++)
    {
       x = {
            line : String("000" + rawArr[i].tr_line).slice(-3), //insignificant 2 zeros
            part : rawArr[i].tr_part,
            desc : rawArr[i].desc,
            qty : Number(rawArr[i].tr_qty_loc).toFixed(2),
            um : rawArr[i].tr_um,
            um_conv : rawArr[i].tr_um_conv,
            lot : rawArr[i].tr_serial,
            expiration : rawArr[i].tr_expire,
        }
        Arr.push(x);
    }
    return Arr;
}