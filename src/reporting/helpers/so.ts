import { numberToLetters } from "./string";

//preparer les données à utiliser dans le fichier pdf
export const prepareSoData = (rawData : any) => {
    const mt : number = Number(rawData.so.so_amt) + Number(rawData.so.so_tax_amt) + Number(rawData.so.so_trl1_amt);

    let data_so = {
        titre : rawData.so.so_nbr, // à utiliser pour nommer le fichier
        nbr : rawData.so.so_nbr,
        customer : {
            cm_addr : rawData.adr.ad_addr,  //vd for provider
            address : {
                ad_name : rawData.adr.ad_name,
                ad_line1 : rawData.adr.ad_line1,
                ad_misc2_id : rawData.adr.ad_misc2_id,
                ad_gst_id : rawData.adr.ad_gst_id,
                ad_pst_id : rawData.adr.ad_pst_id,
                ad_misc1_id : rawData.adr.ad_misc1_id
            }
        },
        
        line : prepareCmdData(rawData.sod),

        calc : {
            tht : rawData.so.so_amt,
            tva : rawData.so.so_tax_amt,
            timbre : rawData.so.so_trl1_amt,
            ttc : mt.toFixed(2)
        },

        mt : numberToLetters(mt, rawData.so.so_curr),
    };
    return data_so
}


//preparer le tableau des lignes de la commande
const prepareCmdData = (rawArr : Array<any>) => {
    let x : any, Arr= [];
    for (let i = 0; i < rawArr.length; i++)
    {
       x = {
            d_line : String("000" + rawArr[i].sod_line).slice(-3), //insignificant 2 zeros
            d_part : rawArr[i].sod_part,
            desc : rawArr[i].desc,
            d_qty_ord : Number(rawArr[i].sod_qty_ord).toFixed(2),
            d_um : rawArr[i].sod_um,
            d_price : Number(rawArr[i].sod_price).toFixed(2),
            d_taxc : rawArr[i].sod_taxc,
            d_disc_pct : rawArr[i].sod_disc_pct,
            tht : (Number(rawArr[i].sod_price) * ((100 - Number(rawArr[i].sod_disc_pct)) / 100) * Number(rawArr[i].sod_qty_ord)).toFixed(2)
        }
        Arr.push(x);
    }
    return Arr;
}