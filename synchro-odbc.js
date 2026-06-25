const odbc = require('odbc');

// Remplacez par votre chaîne de connexion (DSN ou Driver)
const connectionString = 'DSN=mfgprod;UID=rpt;PWD=rpt;';

async function run() {
  let connection;
  try {
    // Établissement de la connexion
    connection = await odbc.connect(connectionString);
    
    // Exécution d'une requête
    const result = await connection.query('SELECT * FROM public.pt_mstr');
    console.log(result);

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

run();
