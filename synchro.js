const {  Client } = require("pg");
const { Pool } = require("mssql");

var pool;
var local;
const sql = require("mssql");
const connectDb = async () => {


// SQL Server configuration

    try {
        var config = {
            "user": "sa", // Database username
            "password": "admin", // Database password
            "server": "localhost", // Server IP address
            "database": "test", // Database name
            "options": {
                "encrypt": false // Disable encryption
            }
        }
        
        // Connect to SQL Server
        sql.connect(config, err => {
            if (err) {
                throw err;
            }
            console.log("Connection Successful!");
            synchro()
        });
    } catch (error) {
        console.log(error)
    }

}
const synchro = async () => {

    try {
        // console.log(new Date())
        console.log("ld")
        // // synchro ld_det***************************************

        const res = await sql.query("SELECT * FROM Utilisateur ")
      //  await this.pool.query("DELETE FROM ld_det WHERE ld_site='1601'")
        console.log(res)
    } catch (error) {
        console.log(error)
    }
//         for (const item of ld) {

//             var date = item.ld_date
//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let format4 = `${year}-${month}-${day}`;
//             await this.pool.query("INSERT INTO  ld_det(ld_loc, ld_part,ld_date,ld_qty_oh, ld_site, ld_status, last_modified_by) VALUES ('" + item.ld_loc + "', '" + item.ld_part + "', '" + format4 + "','" + item.ld_qty_oh + "', '" + item.ld_site + "', '" + item.ld_status + "', '" + item.last_modified_by + "')")

//         }
//         console.log("kemel")



//         // // // synchro pos_order***************************************

//         // const ordery = await this.local.query("SELECT * FROM bb_order_pos WHERE bool05=false AND usrd_site='1601' ORDER BY id")

//         // const pos_orderyy = ordery.rows

//         // for (const item of pos_orderyy) {
//         //     var date = item.created_date

//         //     let day = date.getDate();
//         //     if (day < 10) {
//         //         day = "0" + day
//         //     }

//         //     let month = date.getMonth();
//         //     if (month < 10) {
//         //         month = month + 1
//         //         month = "0" + month
//         //     } else {
//         //         month = month + 1
//         //     }

//         //     let year = date.getFullYear();
//         //     let date0 = `${year}-${month}-${day}`;
//         //     // const pos_order_server = await this.pool.query("SELECT * FROM bb_order_pos WHERE created_date=" + "'" + date0 + "'" + " AND usrd_site='1601' AND order_code=" + "'" + item.order_code + "'" + " ORDER BY id")
//         //     // const pos_order_server_rows = pos_order_server.rows
//         //     // console.log(pos_order_server_rows.length)
//         //     // if (pos_order_server_rows.length > 0 && pos_order_server_rows[0].status === 'N') {
//         //     //     // await this.pool.query("DELETE FROM bb_order_pos WHERE bool05=true WHERE usrd_site='1601'AND order_code=" + "'" + pos_order_server_rows[0].order_code + "'" + " AND created_date=" + "'" + date0 + "'" + "")
//         //     //     // await this.pool.query("INSERT INTO  bb_order_pos(order_code, customer, site_loc, order_emp, status, loy_num, disc_amt, del_comp,usrd_site,plateforme, total_price, created_date) Values ('" + item.order_code + "', '" + item.customer + "' ,'" + item.site_loc + "','" + item.order_emp + "', '" + item.status + "', '" + item.loy_num + "', '" + Number(item.disc_amt) + "', '" + item.del_comp + "','" + item.usrd_site + "', '" + item.plateforme + "', '" + Number(item.total_price) + "', '" + date0 + "')")
//         //     //     await this.pool.query("UPDATE bb_order_pos SET status=" + "'" + item.status + "'" + " WHERE usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date0 + "'" + " AND total_price=" + "'" + item.total_price + "'" + "")

//         //     // } else {
//         //     //     console.log('payés')
//         //     // }
//         //     await this.pool.query("INSERT INTO  bb_order_pos(order_code, customer, site_loc, order_emp, status, loy_num, disc_amt, del_comp,usrd_site,plateforme, total_price, created_date) Values ('" + item.order_code + "', '" + item.customer + "' ,'" + item.site_loc + "','" + item.order_emp + "', '" + item.status + "', '" + item.loy_num + "', '" + Number(item.disc_amt) + "', '" + item.del_comp + "','" + item.usrd_site + "', '" + item.plateforme + "', '" + Number(item.total_price) + "', '" + date0 + "')")
//         //     await this.local.query("UPDATE bb_order_pos SET bool05=true WHERE bool05=false AND usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date0 + "'" + "")
//         // }





//         // //synchro pos_order_detail***************************************

//         // const bb_order_pos_detail = await this.local.query("SELECT * FROM bb_order_pos_detail_product WHERE bool05=false AND usrd_site='1601'")

//         // const pos_order_detail = bb_order_pos_detail.rows

//         // for (const item of pos_order_detail) {
//         //     var date = item.created_date
//         //     let day = date.getDate();
//         //     if (day < 10) {
//         //         day = "0" + day
//         //     }

//         //     let month = date.getMonth();
//         //     if (month < 10) {
//         //         month = month + 1
//         //         month = "0" + month
//         //     } else {
//         //         month = month + 1
//         //     }

//         //     let year = date.getFullYear();
//         //     let date1 = `${year}-${month}-${day}`;
//         //     await this.pool.query("INSERT INTO  bb_order_pos_detail_product(order_code, pt_part, line, pt_article, pt_bom_code, pt_formule, pt_desc1, pt_desc2,pt_loc, pt_size,pt_qty_ord_pos, pt_price_pos, usrd_site,created_date) Values ('" + item.order_code + "', '" + item.pt_part + "' ,'" + item.line + "','" + item.pt_article + "', '" + item.pt_bom_code + "', '" + item.pt_formule + "', '" + item.pt_desc1 + "', '" + item.pt_desc2 + "','" + item.pt_loc + "', '" + item.pt_size + "', '" + item.pt_qty_ord_pos + "', '" + Number(item.pt_price_pos) + "', '" + item.usrd_site + "', '" + date1 + "')")
//         //     await this.local.query("UPDATE bb_order_pos_detail_product SET bool05=true WHERE bool05=false AND usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date1 + "'" + " AND pt_part=" + "'" + item.pt_part + "'" + "")

//         // }
//         // //synchro pos_order_detail_ing***************************************

//         // const bb_order_pos_detail_ing = await this.local.query("SELECT * FROM bb_order_pos_detail_product_ing WHERE bool05=false AND usrd_site='1601' ORDER BY id")

//         // const pos_order_detail_ing = bb_order_pos_detail_ing.rows

//         // for (const item of pos_order_detail_ing) {
//         //     var date = item.created_date
//         //     let day = date.getDate();
//         //     if (day < 10) {
//         //         day = "0" + day
//         //     }

//         //     let month = date.getMonth();
//         //     if (month < 10) {
//         //         month = month + 1
//         //         month = "0" + month
//         //     } else {
//         //         month = month + 1
//         //     }

//         //     let year = date.getFullYear();
//         //     let date2 = `${year}-${month}-${day}`;
//         //     await this.pool.query("INSERT INTO  bb_order_pos_detail_product_ing(order_code, pt_part,pt_pt_part,pt_bom_code, pt_desc1,pt_loc, pt_desc2, pt_price,line, usrd_site, created_date) Values ('" + item.order_code + "', '" + item.pt_part + "' ,'" + item.pt_pt_part + "','" + item.pt_bom_code + "', '" + item.pt_desc1 + "', '" + item.pt_loc + "', '" + item.pt_desc2 + "','" + Number(item.pt_price) + "', '" + item.line + "','" + item.usrd_site + "', '" + date2 + "')")
//         //     await this.local.query("UPDATE bb_order_pos_detail_product_ing SET bool05=true WHERE bool05=false AND usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date2 + "'" + " AND pt_part=" + "'" + item.pt_part + "'" + " AND pt_pt_part=" + "'" + item.pt_pt_part + "'" + "")


//         // }


//         // // synchro bkh***************************************

//         const bk = await this.local.query("SELECT * FROM bkh_hist WHERE bool05=false AND bkh_site='1601' ORDER BY id")
//         console.log("bkh")
//         const bkh = bk.rows
//         console.log(bkh)
//         for (const item of bkh) {

//             var date = item.bkh_effdate
//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let bkhdate = `${year}-${month}-${day}`;
//             console.log(item.id)
//             await this.pool.query("INSERT INTO  bkh_hist(bkh_code,bkh_num_doc,bkh_date, bkh_balance, bkh_type, dec01, bkh_site, bkh_effdate) Values ('" + item.bkh_code + "', '" + item.bkh_num_doc + "' , '" + bkhdate + "' ,'" + item.bkh_balance + "','" + item.bkh_type + "', '" + item.dec01 + "','" + item.bkh_site + "', '" + bkhdate + "')")
//             await this.local.query("UPDATE bkh_hist SET bool05=true WHERE bool05=false AND bkh_site='1601' AND id=" + "'" + item.id + "'" + "")
//         }

//         // synchro pos_order***************************************

//         // const bb_order_posa = await this.local.query("SELECT * FROM bb_order_pos WHERE usrd_site='1601' ORDER BY id")

//         // const pos_ordera = bb_order_posa.rows

//         // for (const item of pos_ordera) {
//         //     var date = item.created_date

//         //     let day = date.getDate();
//         //     if (day < 10) {
//         //         day = "0" + day
//         //     }

//         //     let month = date.getMonth();
//         //     if (month < 10) {
//         //         month = month + 1
//         //         month = "0" + month
//         //     } else {
//         //         month = month + 1
//         //     }

//         //     let year = date.getFullYear();
//         //     let date0 = `${year}-${month}-${day}`;
//         //     const pos_order_server = await this.pool.query("SELECT * FROM bb_order_pos WHERE created_date=" + "'" + date0 + "'" + " AND usrd_site='1601' AND order_code=" + "'" + item.order_code + "'" + " ORDER BY id")
//         //     const pos_order_server_rows = pos_order_server.rows
//         //     console.log(pos_order_server_rows.length)
//         //     if (pos_order_server_rows.length > 0 && pos_order_server_rows[0].status === 'N') {
//         //         // await this.pool.query("DELETE FROM bb_order_pos WHERE bool05=true WHERE usrd_site='1601'AND order_code=" + "'" + pos_order_server_rows[0].order_code + "'" + " AND created_date=" + "'" + date0 + "'" + "")
//         //         // await this.pool.query("INSERT INTO  bb_order_pos(order_code, customer, site_loc, order_emp, status, loy_num, disc_amt, del_comp,usrd_site,plateforme, total_price, created_date) Values ('" + item.order_code + "', '" + item.customer + "' ,'" + item.site_loc + "','" + item.order_emp + "', '" + item.status + "', '" + item.loy_num + "', '" + Number(item.disc_amt) + "', '" + item.del_comp + "','" + item.usrd_site + "', '" + item.plateforme + "', '" + Number(item.total_price) + "', '" + date0 + "')")
//         //         await this.pool.query("UPDATE bb_order_pos SET status=" + "'" + item.status + "'" + " WHERE usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date0 + "'" + " AND total_price=" + "'" + item.total_price + "'" + "")

//         //     } else {
//         //         console.log('payés')
//         //     }
//         //     // await this.pool.query("INSERT INTO  bb_order_pos(order_code, customer, site_loc, order_emp, status, loy_num, disc_amt, del_comp,usrd_site,plateforme, total_price, created_date) Values ('" + item.order_code + "', '" + item.customer + "' ,'" + item.site_loc + "','" + item.order_emp + "', '" + item.status + "', '" + item.loy_num + "', '" + Number(item.disc_amt) + "', '" + item.del_comp + "','" + item.usrd_site + "', '" + item.plateforme + "', '" + Number(item.total_price) + "', '" + date0 + "')")
//         //     // await this.local.query("UPDATE bb_order_pos SET bool05=true WHERE bool05=false AND usrd_site='1601'AND order_code=" + "'" + item.order_code + "'" + " AND created_date=" + "'" + date0 + "'" + "")
//         // }


//         // new synchro pos_order***************************************
//         const service = await this.local.query("SELECT * FROM aa_service WHERE service_site='1601' and service_open=true LIMIT 1")
//         if (service.rows.length > 0) {
//             console.log("cyrr")
//             const currentService = service.rows[0]
//             console.log(currentService)
//             var date_service0 = currentService.service_period_activate_date

//             let day = date_service0.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date_service0.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date_service0.getFullYear();
//             var date_service1 = `${year}-${month}-${day}`;
//             console.log(date_service1)
//         } else {
//             console.log('makesh')
//         }

//         const bb_order_pos = await this.local.query("SELECT * FROM bb_order_pos WHERE usrd_site='1601' and created_date=" + "'" + date_service1 + "'" + "ORDER BY id")
//         const pos_order = bb_order_pos.rows
//         console.log('makesh')
//         await this.pool.query("DELETE FROM bb_order_pos WHERE usrd_site='1601'AND created_date=" + "'" + date_service1 + "'" + "")
//         for (const item of pos_order) {
//             var date = item.created_date

//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let date0 = `${year}-${month}-${day}`;

//             await this.pool.query("INSERT INTO  bb_order_pos(order_code, customer, site_loc, order_emp, status, loy_num, disc_amt, del_comp,usrd_site,plateforme, total_price, created_date) Values ('" + item.order_code + "', '" + item.customer + "' ,'" + item.site_loc + "','" + item.order_emp + "', '" + item.status + "', '" + item.loy_num + "', '" + Number(item.disc_amt) + "', '" + item.del_comp + "','" + item.usrd_site + "', '" + item.plateforme + "', '" + Number(item.total_price) + "', '" + date0 + "')")
//             console.log('makesh2')
//         }
//         const bb_order_pos_detail = await this.local.query("SELECT * FROM bb_order_pos_detail_product WHERE usrd_site='1601' and created_date=" + "'" + date_service1 + "'" + "ORDER BY id")
//         const pos_order_detail = bb_order_pos_detail.rows
//         await this.pool.query("DELETE FROM bb_order_pos_detail_product WHERE usrd_site='1601'AND created_date=" + "'" + date_service1 + "'" + "")
//         for (const item of pos_order_detail) {
//             var date = item.created_date

//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let date0 = `${year}-${month}-${day}`;
//             await this.pool.query("INSERT INTO  bb_order_pos_detail_product(order_code, pt_part, line, pt_article, pt_bom_code, pt_formule, pt_desc1, pt_desc2,pt_loc, pt_size,pt_qty_ord_pos, pt_price_pos, usrd_site,created_date, pt_part_type, pt_dsgn_grp, pt_promo, pt_group ) Values ('" + item.order_code + "', '" + item.pt_part + "' ,'" + item.line + "','" + item.pt_article + "', '" + item.pt_bom_code + "', '" + item.pt_formule + "', '" + item.pt_desc1 + "', '" + item.pt_desc2 + "','" + item.pt_loc + "', '" + item.pt_size + "', '" + item.pt_qty_ord_pos + "', '" + Number(item.pt_price_pos) + "', '" + item.usrd_site + "', '" + date0 + "', '" + item.pt_part_type + "', '" + item.pt_dsgn_grp + "', '" + item.pt_promo + "', '" + item.pt_group + "')")

//         }
//         const bb_order_pos_ing = await this.local.query("SELECT * FROM bb_order_pos_detail_product_ing WHERE usrd_site='1601' and created_date=" + "'" + date_service1 + "'" + "ORDER BY id")
//         const pos_order_detail_ing = bb_order_pos_ing.rows
//         // await this.pool.query("DELETE FROM bb_order_pos_detail_product_ing WHERE usrd_site='1601'AND created_date=" + "'" + date_service1 + "'" + "")
//         for (const item of pos_order_detail_ing) {
//             var date = item.created_date

//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let date0 = `${year}-${month}-${day}`;
//             await this.pool.query("INSERT INTO  bb_order_pos_detail_product_ing(order_code, pt_part,pt_pt_part,pt_bom_code, pt_desc1,pt_loc, pt_desc2, pt_price,line, usrd_site, created_date) Values ('" + item.order_code + "', '" + item.pt_part + "' ,'" + item.pt_pt_part + "','" + item.pt_bom_code + "', '" + item.pt_desc1 + "', '" + item.pt_loc + "', '" + item.pt_desc2 + "','" + Number(item.pt_price) + "', '" + item.line + "','" + item.usrd_site + "', '" + date0 + "')")

//         }

//         const bb_order_pos_sauce = await this.local.query("SELECT * FROM bb_order_pos_detail_product_sauce WHERE usrd_site='1601' and created_date=" + "'" + date_service1 + "'" + "ORDER BY id")
//         const pos_order_detail_sauce = bb_order_pos_sauce.rows
//         // await this.pool.query("DELETE FROM bb_order_pos_detail_product_ing WHERE usrd_site='1601'AND created_date=" + "'" + date_service1 + "'" + "")
//         for (const item of pos_order_detail_sauce) {
//             var date = item.created_date

//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let date0 = `${year}-${month}-${day}`;
//             await this.pool.query("INSERT INTO  bb_order_pos_detail_product_sauce(order_code, pt_part,pt_pt_part,pt_bom_code,pt_loc, pt_desc2, pt_price,line, usrd_site, created_date) Values ('" + item.order_code + "', '" + item.pt_part + "' ,'" + item.pt_pt_part + "','" + item.pt_bom_code + "', '" + item.pt_loc + "', '" + item.pt_desc2 + "','" + Number(item.pt_price) + "', '" + item.line + "','" + item.usrd_site + "', '" + date0 + "')")

//         }


//         // synchro tr_hist***************************************

//         const tr = await this.local.query("SELECT * FROM tr_hist WHERE bool05=false AND tr_site='1601' ORDER BY id")
//         const trhist = tr.rows
//         console.log("tr")
//         for (const item of trhist) {
//             var date = item.tr_effdate

//             let day = date.getDate();
//             if (day < 10) {
//                 day = "0" + day
//             }

//             let month = date.getMonth();
//             if (month < 10) {
//                 month = month + 1
//                 month = "0" + month
//             } else {
//                 month = month + 1
//             }

//             let year = date.getFullYear();
//             let format5 = `${year}-${month}-${day}`;

//             await this.pool.query("INSERT INTO  tr_hist(tr_part,tr_date,tr_lot, tr_type, tr_loc, tr_loc_begin, tr_qty_chg, tr_um_conv, tr_nbr,tr_addr, tr_mtl_std, tr_price, tr_gl_amt, tr_qty_loc, tr_effdate, tr_site, tr_domain) Values ('" + item.tr_part + "', '" + format5 + "' , '" + item.tr_lot + "' ,'" + item.tr_type + "','" + item.tr_loc + "', '" + item.tr_loc_begin + "', '" + item.tr_qty_chg + "', '" + item.tr_um_conv + "', '" + item.tr_nbr + "', '" + item.tr_addr + "', '" + item.tr_mtl_std + "', '" + item.tr_price + "', '" + item.tr_gl_amt + "', '" + item.tr_qty_loc + "' ,'" + format5 + "' , '" + item.tr_site + "', '" + item.tr_domain + "')")
//             await this.local.query("UPDATE tr_hist SET bool05=true WHERE bool05=false AND tr_site='1601' AND id=" + "'" + item.id + "'" + "")
//         }

//     } catch (error) {
//         console.log(error)

//     }

 }

connectDb();

