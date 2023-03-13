//preparer les données à utiliser dans le fichier pdf
export const preparePrhData = (rawData : any) => {
    let data_prh = {
        titre : rawData.prhnbr, // à utiliser pour nommer le fichier
        nbr : rawData.prhnbr,
        fournisseur : {
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
        
        line : prepareLnData(rawData.detail),

        site : rawData.pr.prh_site

    };
   // console.log("\n\n\nNEW DATA", data_prh)
    return data_prh;
}


//preparer le tableau des lignes 
const prepareLnData = (rawArr : Array<any>) => {
    let x, Arr= [];
    for (let i = 0; i < rawArr.length; i++)
    {
       x = {
            d_line : String("000" + rawArr[i].prh_line).slice(-3), //insignificant 2 zeros
            d_part : rawArr[i].prh_part,
            desc : rawArr[i].desc,
            d_qty : Number(rawArr[i].qty_received).toFixed(2),
            d_um : rawArr[i].prh_um,
            d_price : Number(rawArr[i].prh_pur_cost).toFixed(2),
            d_empl : rawArr[i].prh_loc,
            d_lot_ser : rawArr[i].prh_serial,
            d_ref : "not in db"
        }
        Arr.push(x);
    }
    return Arr;
}