import { numberToLetters } from "./string";

//preparer les données à utiliser dans le fichier pdf
export const prepareIhData = (rawData : any) => {
    const mt : number = Number(rawData.ih.ith_amt) + Number(rawData.ih.ith_tax_amt) + Number(rawData.ih.ith_trl1_amt);

    let data_ih = {
        titre : rawData.ihnbr, // à utiliser pour nommer le fichier
        nbr : rawData.ihnbr,
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
        
        line : prepareCmdData(rawData.detail),

        calc : {
            tht : rawData.ih.ith_amt,
            tva : rawData.ih.ith_tax_amt,
            timbre : rawData.ih.ith_trl1_amt,
            ttc : mt.toFixed(2)
        },

       // mt : numberToLetters(mt, rawData.ih.ith_curr),
    };
    return data_ih
}


const group = (arr : Array<any>, line : any) => {
    //compare each element of arr with line product and price
    const index = arr.findIndex((element) => {
        return (element.itdh_part == line.itdh_part && element.itdh_price == line.itdh_price)
    })

    //if no element has the same product and price : add the element to arr
    if (index == -1)
    {
        if (line.itdh_line == 1 ) arr.push(line)
        else arr.push(
            {
                itdh_line : arr[arr.length - 1].itdh_line + 1,
                itdh_part : line.itdh_part, 
                desc : line.desc,
                d_qty_ord : line.itdh_qty_inv,
                d_um : line.sod_um,
                d_price : line.itdh_price,
                d_taxc : line.itdh_taxc,
                d_disc_pct : line.itdh_disc_pct
            })
    }
    //if an element has the same product and price : sum qty
    else {
        arr[index].itdh_qty_inv += line.itdh_qty_inv
    }

    return arr
    
}
//preparer le tableau des lignes groupés de la commande
const prepareCmdData = (rawArr : Array<any>) => {
    let grArr = rawArr.reduce(group, [])
    let x : any, Arr= [];
    for (let i = 0; i < grArr.length; i++)
    {
       x = {
            d_line : String("000" + grArr[i].itdh_line).slice(-3), //insignificant 2 zeros
            d_part : grArr[i].itdh_part,
            desc : grArr[i].desc,
            d_qty_ord : Number(grArr[i].itdh_qty_inv).toFixed(2),
            d_um : grArr[i].sod_um,
            d_price : Number(grArr[i].itdh_price).toFixed(2),
            d_taxc : grArr[i].itdh_taxc,
            d_disc_pct : grArr[i].itdh_disc_pct,
            tht : (Number(grArr[i].itdh_price) * ((100 - Number(grArr[i].itdh_disc_pct)) / 100) * Number(grArr[i].itdh_qty_inv)).toFixed(2)
        }
        Arr.push(x);
    }
    return Arr;
}