//Sortie / entrée non planifiée

//preparer les données à utiliser dans le fichier pdf
export const prepareItData = (rawData : any, name : string) => {

    let titre : string, rcp : boolean
    if (name == 'it-unp'){
        titre = "Bon de sortie non planifiée N° "
        rcp = false
    }
    else if (name=="rct-unp") {
        titre = "Bon de réception non planifiée N° "
        rcp = true
    }
    console.log("rawData.adr.ad_name",rawData.adr)
    let data_it = {
        rcp : rcp,
        titre : titre.concat(rawData.nlot), // à utiliser pour nommer le fichier
        nbr : rawData.nlot,
        info : {
            addr : (rawData.it.tr_addr!= null) ? rawData.it.tr_addr : "" ,
            name : (rawData.adr  != null) ? rawData.adr.ad_name: "",
            line1 : (rawData.adr != null) ? rawData.adr.ad_name : "",
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
            prix : Number(rawArr[i].tr_price).toFixed(2),
            site : rawArr[i].tr_site,
            empl : rawArr[i].tr_loc,
            lot : rawArr[i].tr_serial,
            expiration : rawArr[i].tr_expire,
        }
        Arr.push(x);
    }
    return Arr;
}