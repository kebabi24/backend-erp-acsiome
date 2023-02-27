import { numberToLetters } from "./string";

//preparer les données à utiliser dans le fichier pdf
export const preparePshData = (rawData : any) => {
    const mt = Number(rawData.tot.tht) + Number(rawData.tot.tva) + Number(rawData.tot.timbre);

    let data_psh = {
        titre : rawData.pshnbr, // à utiliser pour nommer le fichier
        nbr : rawData.pshnbr,
        customer : {
            cm_addr : rawData.adr.ad_addr, 
            address : {
                ad_name : rawData.adr.ad_name,
                ad_line1 : rawData.adr.ad_line1,
                ad_misc2_id : rawData.adr.ad_misc2_id,
                ad_gst_id : rawData.adr.ad_gst_id,
                ad_pst_id : rawData.adr.ad_pst_id,
                ad_misc1_id : rawData.adr.ad_misc1_id
            }
        },
        
        line : prepareCmdData(rawData.detail),

        calc : {
            tht : rawData.tot.tht,
            tva : rawData.tot.tva,
            timbre : rawData.tot.timbre,
            ttc : mt.toFixed(2)
        },

        mt : numberToLetters(mt, rawData.ps.psh_curr),
    };
    return data_psh
}


//preparer le tableau des lignes de la commande
const prepareCmdData = (rawArr : Array<any>) => {
    let x, Arr= [];
    for (let i = 0; i < rawArr.length; i++)
    {
       x = {
            d_line : String("000" + rawArr[i].psh_line).slice(-3), //insignificant 2 zeros
            d_part : rawArr[i].psh_part,
            desc : rawArr[i].desc,
            d_qty_ord : Number(rawArr[i].psh_qty_ship).toFixed(2),
            d_um : rawArr[i].psh_um,
            d_price : Number(rawArr[i].psh_price).toFixed(2),
            d_taxc : rawArr[i].psh_taxc,
            d_disc_pct : rawArr[i].psh_disc_pct,
            tht : (Number(rawArr[i].psh_price) * ((100 - Number(rawArr[i].psh_disc_pct)) / 100) * Number(rawArr[i].psh_qty_ship)).toFixed(2)
        }
        Arr.push(x);
    }
    return Arr;
}