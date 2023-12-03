// import { envs } from './config/plugins/env.plugin';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
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
