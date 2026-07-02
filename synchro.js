// // const {  Client } = require("pg");
const { Pool } = require("pg");
 const odbc = require('odbc');

// // Remplacez par votre chaîne de connexion (DSN ou Driver)
const connectionString = 'DSN=mfgprod;UID=rpt;PWD=rpt;';

 async function run() {
  let connection;
  try {
    // Établissement de la connexion
     this.local = new Pool({
             user: 'postgres',
             host: '10.10.3.6',
             database: 'PrimaGlaces',
             password: 'adm@AxiomDD83',
             port: 8383,
         });


         await this.local.connect()
         console.log("local connected")
     connection = await odbc.connect(connectionString);
    
     // Exécution d'une requête
//     const result = await connection.query("SELECT tr_part, tr_effdate,tr_type,tr_loc,tr_site,tr_qty_loc, tr_serial,tr_nbr, tr_lot,tr_addr,tr_trnbr FROM MFGPROD.PUB.tr_hist where  ((tr_type = 'rct-wo' or tr_type = 'rct-po') and  tr_domain = 'prima' and tr_effdate>={d '2026-01-01'})") ;
     const result = await connection.query("SELECT tr_part, tr_effdate,tr_type,tr_loc,tr_site,tr_qty_loc, tr_serial,tr_nbr, tr_lot,tr_addr,tr_trnbr FROM MFGPROD.PUB.tr_hist where  ((tr_type = 'rct-wo' or tr_type = 'rct-po') and  tr_domain = 'prima' and tr_effdate =SYSDATE())") ;

     const res = result[0]
for (let res of result) {
     console.log(res);
     const employe = await this.local.query("SELECT * FROM pt_mstr  where pt_part = " + "'" + res.tr_part + "'" + "");
     await this.local.query("INSERT INTO  tr_hist(tr_part,tr_effdate,tr_type,tr_loc,tr_site,tr_qty_loc,tr_serial,tr_nbr,tr_lot,tr_addr,tr_trnbr,tr_domain,chr01) VALUES ('" + res.tr_part + "', '" + res.tr_effdate + "', '" + res.tr_type + "','" + res.tr_loc + "', '" + res.tr_site + "', '" + res.tr_qty_loc + "', '" + res.tr_serial + "', '" + res.tr_nbr + "', '" + res.tr_lot + "' , '" + res.tr_addr  + "' , '" + res.tr_trnbr + "' , '" + "prima"  + "import" +"')") 
}


   } catch (error) {
     console.error('Erreur lors de la connexion ou de la requête : ', error);
   } finally {
     // Fermeture de la connexion
     if (connection) {
       await connection.close();
       console.log('Connexion fermée');
     }
   }
 }

run()
