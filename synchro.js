// const {  Client } = require("pg");
const { Pool } = require("pg");

var pool;
var local;
const sql = require("mssql");
//const pool = require("pg")

// const connectDb = async () => {

//     try {
//         this.pool = new Pool({
//             user: 'admin',
//             host: '146.59.157.107',
//             database: 'abraa',
//             password: 'admin',
//             port: 5432,
//         });
//         await this.pool.connect()

//         console.log("server connected")
//         this.local = new Pool({
//             user: 'postgres',
//             host: 'localhost',
//             database: 'abracadabra',
//             password: 'adm@axiom',
//             port: 5432,
//         });


//         await this.local.connect()
//         console.log("local connected")
//         synchro(this.pool, this.local)
//     } catch (error) {
//         console.log(error)
//     }

//}
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
         
        });

        this.local = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'AxiomRH',
            password: 'admin',
            port: 5433,
        });


        await this.local.connect()
        console.log("local connected")
        synchro()
    } catch (error) {
        console.log(error)
    }

}
const synchro = async () => {

    try {
        // console.log(new Date())
        //console.log("ld")
        // // synchro ld_det***************************************

        const res = await sql.query("SELECT * FROM Utilisateur ")
        const emps = res.recordset
      //  console.log(emps)
        for (let item of emps) {
         const  idemp = item.Matricule
       const employe = await this.local.query("SELECT * FROM emp_mstr  where emp_addr = " + "'" + idemp + "'" + "");
      if (employe.rows.length >0) { //console.log(employe.rows)
    /*update*/

    var adr = (item.Adresse !=null) ? item.Adresse.replace("'", ' ') : null
    var date = item.DateNaissance
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day
    }

    let month = date.getMonth();
  //  console.log(month)
    if (month < 9) {
        month = month + 1
        month = "0" + month
    } else {
        month = month + 1
    }

    let year = date.getFullYear();
    let datebirth = `${year}-${month}-${day}`;


    var date1 = item.DateDebut
    let day1 = date1.getDate();
    if (day1 < 10) {
        day1 = "0" + day1
    }

    let month1 = date1.getMonth();
    if (month1 < 9) {
        month1 = month1 + 1
        month1 = "0" + month1
    } else {
        month1 = month1 + 1
    }

    let year1 = date1.getFullYear();
    let DateDebut = `${year1}-${month1}-${day1}`;

    var DateFin = `2900-01-01`
  if(item.DateFin != null) {  
    var date2 = item.DateFin
    let day2 = date1.getDate();
    if (day2 < 10) {
        day2 = "0" + day2
    }

    let month2 = date2.getMonth();
    if (month2 < 9) {
        month2 = month2 + 1
        month2 = "0" + month2
    } else {
        month2 = month2 + 1
    }

    let year2 = date2.getFullYear();
     DateFin = `${year2}-${month2}-${day2}`;
} 

var DateFinPeriodeEssai = `2900-01-01`
if(item.DateFinPeriodeEssai != null) {  
    var date3 = item.DateFinPeriodeEssai
    let day3 = date1.getDate();
    if (day3 < 10) {
        day3 = "0" + day3
    }

    let month3 = date3.getMonth();
    if (month3 < 9) {
        month3 = month3 + 1
        month3 = "0" + month3
    } else {
        month3 = month3 + 1
    }

    let year3 = date3.getFullYear();
    DateFinPeriodeEssai = `${year3}-${month3}-${day3}`;
}

var DateRupture = `2900-01-01`
if(item.DateRupture!=null){
   // console.log("hounaaaaaaa")
    var date4 = item.DateRupture
    let day4 = date1.getDate();
    if (day4 < 10) {
        day4 = "0" + day4
    }

    let month4 = date4.getMonth();
    if (month4 < 9) {
        month4 = month4 + 1
        month4 = "0" + month4
    } else {
        month4 = month4 + 1
    }

    let year4 = date4.getFullYear();
     DateRupture = `${year4}-${month4}-${day4}`;
} 

    await this.local.query("UPDATE emp_mstr SET emp_lname=" + "'" +  item.Nom +  "'" + "," +  "emp_fname=" + "'" +  item.Prenom + "'" +   "," + "emp_birth_date=" + "'" +  datebirth + "'" +  "," +
    "emp_sex=" + "'" +  item.Sexe + "'"  + "," +
    "emp_mail=" + "'" +  item.Email + "'" + "," +

    "emp_line1=" + "'" +  adr + "'" + "," +
    "emp_first_date=" + "'" +  DateDebut + "'" + "," +
    "emp_last_date=" + "'" + DateFin + "'" + "," +

    "emp_ss_id=" + "'" +  item.NumSecuriteSociale + "'" + "," +
    "emp_upper=" + "'" +  item.Responsable1 + "'" + "," +
    "emp_familysit=" + "'" + item.SituationFamiliale + "'" + "," +

    "emp_site=" + "'" +  item.Affectation + "'" + "," +
    "emp_conf_date=" + "'" +  DateFinPeriodeEssai + "'" + "," +
    "emp_dism_date=" + "'" + DateRupture + "'"  


    + "where emp_addr=" + "'" +  item.Matricule + "'" + "") 


    

    /*update*/
            }
            else {

var adr = (item.Adresse !=null) ? item.Adresse.replace("'", ' ') : null
                var date = item.DateNaissance
                let day = date.getDate();
                if (day < 10) {
                    day = "0" + day
                }
    
                let month = date.getMonth();
               // console.log(month)
                if (month < 9) {
                    month = month + 1
                    month = "0" + month
                } else {
                    month = month + 1
                }
    
                let year = date.getFullYear();
                let datebirth = `${year}-${month}-${day}`;


                var date1 = item.DateDebut
                let day1 = date1.getDate();
                if (day1 < 10) {
                    day1 = "0" + day1
                }
    
                let month1 = date1.getMonth();
                if (month1 < 9) {
                    month1 = month1 + 1
                    month1 = "0" + month1
                } else {
                    month1 = month1 + 1
                }
    
                let year1 = date1.getFullYear();
                let DateDebut = `${year1}-${month1}-${day1}`;

                var DateFin = `2900-01-01`
              if(item.DateFin != null) {  
                var date2 = item.DateFin
                let day2 = date1.getDate();
                if (day2 < 10) {
                    day2 = "0" + day2
                }
    
                let month2 = date2.getMonth();
                if (month2 < 9) {
                    month2 = month2 + 1
                    month2 = "0" + month2
                } else {
                    month2 = month2 + 1
                }
    
                let year2 = date2.getFullYear();
                 DateFin = `${year2}-${month2}-${day2}`;
            } 

            var DateFinPeriodeEssai = `2900-01-01`
            if(item.DateFinPeriodeEssai != null) {  
                var date3 = item.DateFinPeriodeEssai
                let day3 = date1.getDate();
                if (day3 < 10) {
                    day3 = "0" + day3
                }
    
                let month3 = date3.getMonth();
                if (month3 < 9) {
                    month3 = month3 + 1
                    month3 = "0" + month3
                } else {
                    month3 = month3 + 1
                }
    
                let year3 = date3.getFullYear();
                DateFinPeriodeEssai = `${year3}-${month3}-${day3}`;
            }

            var DateRupture = `2900-01-01`
            if(item.DateRupture!=null){
             //   console.log("hounaaaaaaa")
                var date4 = item.DateRupture
                let day4 = date1.getDate();
                if (day4 < 10) {
                    day4 = "0" + day4
                }
    
                let month4 = date4.getMonth();
                if (month4 < 9) {
                    month4 = month4 + 1
                    month4 = "0" + month4
                } else {
                    month4 = month4 + 1
                }
    
                let year4 = date4.getFullYear();
                 DateRupture = `${year4}-${month4}-${day4}`;
            } else {
              //  console.log("hhhhhhhhhhhhhhh")
            }
                await this.local.query("INSERT INTO  emp_mstr(emp_addr,emp_lname,emp_fname,emp_birth_date,emp_sex,emp_mail,emp_line1,emp_first_date,emp_last_date,emp_ss_id,emp_upper,emp_familysit,emp_site,emp_conf_date,emp_dism_date,emp_domain) VALUES ('" + item.Matricule + "', '" + item.Nom + "', '" + item.Prenom + "','" + datebirth + "', '" + item.Sexe + "', '" + item.Email + "', '" + adr + "', '" + DateDebut + "', '" + DateFin + "' , '" + item.NumSecuriteSociale  + "' , '" + item.Responsable1 + "' , '" + item.SituationFamiliale + "' , '" + item.Affectation + "' , '" + DateFinPeriodeEssai + "' , '" + DateRupture + "' , '" +"palmary" +"')") 
            }
        }
        console.log("Success Synchro")

    } catch (error) {
        console.log(error)
    }
    process.exit()

 }

connectDb();

