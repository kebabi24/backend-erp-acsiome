export const header_so = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>
        <h2 style="margin-left : 30px;">Commande N° {{nbr}}</h2>
    </div>
</body>

</html>`;

export const body = `<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@300&display=swap');
        th, tr,td  {
            border : 1px solid;
            word-break: break-all;
            font-size : 12px;
            padding: 3px;
            text-align : center;
        }

        ul {
            list-style-type: none;
        }

        .container {
            margin-top : -20px;
            display : block;
            flex-direction : column;
            font-size : 14px;
        }
        .commande-table {
            width : 90%;
            margin : auto;
            border-collapse : collapse;
            font-family: 'Open Sans', sans-serif;
            table-layout: fixed;
        }
        .calc-table {
            width : 40%;
            border-collapse : collapse;
            margin-top : 20px;
            margin-left : 55%;
            font-family: 'Open Sans', sans-serif;
            table-layout: fixed;
            page-break-inside : avoid;

        }
        .info {
            margin-left : 5px;
            line-height: 1.6;
            font-family: 'Open Sans', sans-serif;
            display : flex;
            gap : 20px;
        }
        .prix {
            text-align: right;
        }  
    </style>      
</head>

<body>
    <div class = "container">
        <div class = "info">
            <div style = "flex-grow: 0; flex-shrink: 0; flex-basis : 60%;">
                <ul>
                    <li> Code Client : {{customer.cm_addr}} </li>
                    <li> Nom Client : {{customer.address.ad_name}} </li>
                    <li> Adresse Client : {{customer.address.ad_line1}} </li>
                </ul>
            </div>
            <div style = "justify-self : end; flex-grow: 0; flex-shrink: 0; flex-basis : 40%; font-size : 16px;">
                <ul>
                    <li> MF : {{customer.address.ad_misc2_id}} </li>
                    <li> RC : {{customer.address.ad_gst_id}} </li>
                    <li> AI : {{customer.address.ad_pst_id}} </li>
                    <li> NIS : {{customer.address.ad_misc1_id}} </li>          
                </ul> 
            </div>
        </div>


        <table class = "commande-table">
            <thead>
                <tr>
                    <th> LN </th>
                    <th style = "width: 20%;"> Code Article </th>
                    <th style = "width: 30%;"> Désignation </th>
                    <th style = "width: 9%;"> QTE </th>
                    <th> UM </th>
                    <th style = "width: 9%;"> PU </th>
                    <th> TVA </th>
                    <th> REM </th>
                    <th style = "width: 12%;">  THT </th>
                </tr>
            </thead>
            <tbody>
                {{#each line}}
                <!-- informations commande -->
                    <tr>
                        <td> {{d_line}}  </td>
                        <td> {{d_part}} </td>
                        <td>  {{desc}}  </td>
                        <td>  {{d_qty_ord}}  </td>
                        <td>  {{d_um}}  </td>
                        <td class = "prix">  {{d_price}} </td>
                        <td>  {{d_taxc}}% </td>
                        <td>  {{d_disc_pct}}% </td>
                        <td class = "prix">  {{tht}} </td>
                    </tr>
                {{/each}}
            </tbody>
        </table>
        <table class = "calc-table">
            <!-- à calculer (0 par défaut) : fonction caluculatetot()-->
            <tr>
                <th>Total HT </th>
                <td class = "prix"> {{calc.tht}} </td>
            </tr>
             <tr>
                <th>TVA</th>
                <td class = "prix"> {{calc.tva}} </td>
            </tr>
            <tr>
                <th>Timbre</th>
                <td class = "prix"> {{calc.timbre}} </td>
            </tr>
            <tr>
                <th>Total TC</th>
                <td class = "prix" > {{calc.ttc}} </td>
            </tr>
        </table>
        
        <p style = "margin-left : 35px; margin-top : 50px; font-family: 'Open Sans', sans-serif;"> Arreter la présente commande à la somme de : {{mt}}.
        </p>
    </div>
</body>
</html>`;


export const footer = `<html>

<head>
  <style>
    html,
    body {
      font-size: 10px;
    }
    .pageNumber {
        margin-left : 50%;
    }
  </style>
</head>

<body>
      &nbsp;<span class="pageNumber"></span>&nbsp;/&nbsp;<span class="totalPages"></span>
</body>

</html>`


export const header_psh = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>
        <h2 style="margin-left : 30px;">Bon Livraison N° {{nbr}}</h2>
    </div>
</body>

</html>`;


export const header_po = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>
        <h2 style="margin-left : 30px;">Bon Commande N° {{nbr}}</h2>
    </div>
</body>

</html>`;



export const header_ih = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>
        <h2 style="margin-left : 30px;">Bon Facture N° {{nbr}}</h2>
    </div>
</body>

</html>`;



export const body_prh = `<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@300&display=swap');
        th, tr,td  {
            border : 1px solid;
            word-break: break-all;
            font-size : 12px;
            padding: 3px;
            text-align : center;
        }
        ul {
            list-style-type: none;
        }

        .container {
            margin-top : -20px;
            display : block;
            flex-direction : column;
            font-size : 14px;
            font-family: 'Open Sans', sans-serif;
        }
        .commande-table {
            width : 90%;
            margin : auto;
            border-collapse : collapse;
            table-layout: fixed;
        }
        .info {
            margin-left : 5px;
            margin-bottom : 5px;
            line-height: 1.6;
            display : flex;
            gap : 20px;
        }
        .prix {
            text-align: right;
        }  
    </style>      
</head>

<body>
    <div class = "container">
        <div class = "info">
            <div style = "flex-grow: 0; flex-shrink: 0; flex-basis : 60%;">
                <ul>
                    <li> Code Fournisseur : {{fournisseur.cm_addr}} </li>
                    <li> Nom Fournisseur : {{fournisseur.address.ad_name}} </li>
                    <li> Adresse Fournisseur : {{fournisseur.address.ad_line1}} </li>
                    <li> Site : {{site}} </li>
                </ul>
            </div>
            <div style = "justify-self : end; flex-grow: 0; flex-shrink: 0; flex-basis : 40%; font-size : 16px;">
                <ul>
                    <li> MF : {{fournisseur.address.ad_misc2_id}} </li>
                    <li> RC : {{fournisseur.address.ad_gst_id}} </li>
                    <li> AI : {{fournisseur.address.ad_pst_id}} </li>
                    <li> NIS : {{fournisseur.address.ad_misc1_id}} </li>          
                </ul> 
            </div>
        </div>


        <table class = "commande-table">
            <thead>
                <tr>
                    <th> LN </th>
                    <th style = "width: 19%;"> Code Article </th>
                    <th style = "width: 27%;"> Désignation </th>
                    <th style = "width: 9%;"> QTE </th>
                    <th> UM </th>
                    <th style = "width: 8%;"> Prix </th>
                    <th style = "width: 9%;"> Empl </th>
                    <th style = "width: 10%;"> Lot/Serie </th>
                    <th style = "width: 10%;">  Réference </th>
                </tr>
            </thead>
            <tbody>
                {{#each line}}
                <!-- informations commande -->
                    <tr>
                        <td> {{d_line}}  </td>
                        <td> {{d_part}} </td>
                        <td>  {{desc}}  </td>
                        <td>  {{d_qty}}  </td>
                        <td>  {{d_um}}  </td>
                        <td class = "prix">  {{d_price}} </td>
                        <td>  {{d_empl}} </td>
                        <td>  {{d_lot_ser}} </td>
                        <td>  {{d_ref}} </td>
                    </tr>
                {{/each}}
            </tbody>
        </table>
        <p style="text-align : center;""> Fin. </p>
    </div>
</body>
</html>`

export const header_prh = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>
        <h2 style="margin-left : 30px;">RC N° {{nbr}}</h2>
    </div>
</body>

</html>`;

export const header_itTr = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }

    ul {
        list-style-type: none;
    }

    .info {
        text-align : left;
        margin-left : 5px;
        margin-bottom : 5px;
        line-height: 1.6;
        display : flex;
        gap : 20px;
        font-size : 12px;
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>

        <h2 style="margin-left : 30px;">{{titre}}</h2>
        <p style="align-self : flex-end; font-size : 12px;"> le : {{info.date}}</p>

        <div class = "info">
            <ul style = "flex-grow: 0; flex-shrink: 0; flex-basis : 60%;">
                <li> Site  : {{info.site}} </li>
                <li> Empl : {{info.location}} </li>
            </ul>
            <ul style = "justify-self : end; flex-grow: 0; flex-shrink: 0; flex-basis : 40%;">
                <li> Site A : {{info.siteA}} </li>
                <li> Empl A : {{info.locationA}} </li>       
            </ul> 
        </div>
    </div>
</body>

</html>`

export const body_itTr = `<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@300&display=swap');
        th, tr,td  {
            border : 1px solid;
            word-break: break-all;
            font-size : 12px;
            padding: 3px;
            text-align : center;
        }

        .container {
            display : block;
            flex-direction : column;
            font-size : 14px;
            font-family: 'Open Sans', sans-serif;
        }
        .commande-table {
            width : 90%;
            margin : auto;
            border-collapse : collapse;
            table-layout: fixed;
        }
    </style>      
</head>

<body>
    <div class = "container">
        <table class = "commande-table">
            <thead>
                <tr>
                    <th> LN </th>
                    <th style = "width: 16%;"> Code Article </th>
                    <th style = "width: 27%;"> Désignation </th>
                    <th style = "width: 9%;"> QTE </th>
                    <th> UM </th>
                    <th style = "width: 10%;"> Conv UM </th>
                    <th style = "width: 10%;"> Lot/Serie </th>
                    <th style = "width: 10%;"> Expire </th>
                </tr>
            </thead>
            <tbody>
                {{#each line}}
                <!-- informations commande -->
                    <tr>
                        <td> {{line}}  </td>
                        <td> {{part}} </td>
                        <td>  {{desc}}  </td>
                        <td>  {{qty}}  </td>
                        <td>  {{um}}  </td>
                        <td>  {{um_conv}} </td>
                        <td> {{lot}}</td>
                        <td>  {{expiration}} </td>
                    </tr>
                {{/each}}
            </tbody>
        </table>
        <p style="text-align : center;""> Fin. </p>
    </div>
</body>
</html>`

export const header_it = `<html>
<head>
  <style>
    body {
      font-size: 12px;
    }
    .header {
        width : 90%;
        text-align : center;
        display : flex;
        flex-direction : column;
        padding : 10px;
    }

    hr {             
        background-color:#FFFF00;
        width : 100%
    }

    ul {
        list-style-type: none;
    }

    .info {
        text-align : left;
        margin-left : 5px;
        margin-bottom : 5px;
        line-height: 1.6;
        font-size : 12px;
    }
  </style>
</head>

<body>
    <div class = "header">
        <div style = "display: flex;">
            <img src="{#asset ./src/reporting/assets/logo.png @encoding=dataURI}" style = "width : 20%; margin-left : 10px;" />
            <h1 style = "margin-left : 40px;"> Sarl El Hamiz Gros Alimentaire 
                <br> Production Boissons
            </h1>
        </div>
        <div style = "font-family: 'Montserrat', sans-serif; letter-spacing  : 0,3 em;margin-left : 40px;">
            <p style = "line-height: 1.6;"> Hai Ouled Brahim Local N°01 Hammadi Boumerdes
                <br> RC N°: 03 B 0964126-01/35    Art N° 353600562905  NIF : 000316096412640
            </p>
            <p style="color : blue;  margin-top : -10px; ">Banque BNA : 001 0649 0300 00034430 Tel/Fax : 024 860 287 E-Mailzima_rad@yahoo.fr</p>
        </div>
        <hr style = "background-color:#FFFF00; width : 100%; margin-left : 20px;"></hr>

        <h2 style="margin-left : 30px;">{{titre}}</h2>
        <p style="align-self : flex-end; font-size : 12px;"> le : {{info.date}}</p>

        <div class = "info">
            <ul>
                <li> {{info.addr}} </li>
                <li> {{info.name}} </li>
                <li> {{info.line1}} </li>
            </ul>
        </div>
    </div>
</body>

</html>`


export const body_it = `<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@300&display=swap');
        th, tr,td  {
            border : 1px solid;
            word-break: break-all;
            font-size : 12px;
            padding: 3px;
            text-align : center;
        }

        .container {
            display : block;
            flex-direction : column;
            font-size : 14px;
            font-family: 'Open Sans', sans-serif;
        }
        .commande-table {
            width : 90%;
            margin : auto;
            border-collapse : collapse;
            table-layout: fixed;
        }
    </style>      
</head>

<body>
    <div class = "container">
        <table class = "commande-table">
            <thead>
                <tr>
                    <th> LN </th>
                    <th style = "width: 14%;"> Code Article </th>
                    <th style = "width: 25%;"> Désignation </th>
                    <th style = "width: 7%;"> QTE </th>
                    <th> UM </th>
                    {{#if rcp}}
                        <th style = "width: 10%;"> prix </th>
                    {{/if}} 
                    <th style = "width: 9%;"> site </th>
                    <th style = "width: 10%;"> Emplacement </th>
                    <th style = "width: 10%;"> Lot/Serie </th>
                    <th style = "width: 7%;"> Expire </th>
                </tr>
            </thead>
            <tbody>
                {{#each line}}
                <!-- informations commande -->
                    <tr>
                        <td> {{line}}  </td>
                        <td> {{part}} </td>
                        <td>  {{desc}}  </td>
                        <td>  {{qty}}  </td>
                        <td>  {{um}}  </td>
                        <td> {{prix}} </td>
                        <td>  {{site}} </td>
                        <td>  {{empl}} </td>
                        <td> {{lot}}</td>
                        <td>  {{expiration}} </td>
                    </tr>
                {{/each}}
            </tbody>
        </table>
        <p style="text-align : center;""> Fin. </p>
    </div>
</body>
</html>`