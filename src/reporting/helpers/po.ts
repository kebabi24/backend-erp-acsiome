import { numberToLetters } from "./string";

//preparer les données à utiliser dans le fichier pdf
export const preparePoData = (rawData : any) => {
    const mt = Number(rawData.po.po_amt) + Number(rawData.po.po_tax_amt) + Number(rawData.po.po_trl1_amt);

    let data_po = {
        titre : rawData.po.po_nbr, // à utiliser pour nommer le fichier
        nbr : rawData.po.po_nbr,
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
        
        line : prepareCmdData(rawData.pod),

        calc : {
            tht : rawData.po.po_amt,
            tva : rawData.po.po_tax_amt,
            timbre : rawData.po.po_trl1_amt,
            ttc : mt.toFixed(2)
        },

        mt : numberToLetters(mt, rawData.po.po_curr),
    };
   // console.log("\n\n FROM PREP", data_po)
    return data_po
}


//preparer le tableau des lignes de la commande
const prepareCmdData = (rawArr : Array<any>) => {
    let x, Arr= [];
    for (let i = 0; i < rawArr.length; i++)
    {
       x = {
            d_line : String("000" + rawArr[i].pod_line).slice(-3), //insignificant 2 zeros
            d_part : rawArr[i].pod_part,
            desc : rawArr[i].desc,
            d_qty_ord : Number(rawArr[i].pod_qty_ord).toFixed(2),
            d_um : rawArr[i].pod_um,
            d_price : Number(rawArr[i].pod_price).toFixed(2),
            d_taxc : rawArr[i].pod_taxc,
            d_disc_pct : rawArr[i].pod_disc_pct,
            tht : (Number(rawArr[i].pod_price) * ((100 - Number(rawArr[i].pod_disc_pct)) / 100) * Number(rawArr[i].pod_qty_ord)).toFixed(2)
        }
        Arr.push(x);
    }
    return Arr;
}