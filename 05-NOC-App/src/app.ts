// import { envs } from './config/plugins/env.plugin';
import { envs } from './config/plugins/env.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
  // console.log(envs.PORT);
}

// DOMAIN reglas de negocio, reglas que van a regir mi aplicacion, origenes de datos, como
// son mis modelos mis entidades,

// REPOSITORY como voy a trabajar con mis datasources

// USE CASES casos de uso tal cual

// INFRAESTRUCTURA bases de datos, file sistem, procesado de datos,

// REPOSITORY trabajan con el datasource y cambiar el datasource

// PRESENTATION cosa cerca de los usuarios / consola
