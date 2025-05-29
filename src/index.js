//Importar express
const express = require('express');
const ServerRouter = require('./routers/serverRouter').default; // Importamos la clase ServerRouter
//Importar mongoose
const mongoose = require('mongoose');
//Importar url de conexión a la BD
const database = require('./database/db'); // Asumo que database.db contiene la URL de tu DB
//Importar cors
const cors = require('cors');
//Importar path para servir archivos estáticos
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);

        this.conectarBD(); // Conecta a la BD al iniciar el servidor

        // Middlewares
        this.app.use(cors()); // Configuración de CORS (antes de las rutas para que se aplique a todas)
        this.app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

        // Servir archivos estáticos (tu index.html y script.js)
        // Esto permite que el navegador pida http://localhost:3000/index.html o http://localhost:3000/script.js
        // Ajusta la ruta si tu index.html y script.js no están directamente en la raíz de tu proyecto
        this.app.use(express.static(path.join(__dirname, '../'))); // Asume que index.html y script.js están en la raíz de Trabajo final Backend

        // Crear instancia del router y usarlo
        const serverR = new ServerRouter();
        // Todas las rutas de serverR se montarán en la raíz ('/')
        this.app.use('/', serverR.getRouter()); // Usamos el método getRouter() como buena práctica

        // Manejador para la ruta raíz '/' para servir index.html
        // Esto es útil si quieres que http://localhost:3000/ sirva tu index.html
        // Si no tienes un endpoint /api/users/search, puedes simplemente tener esto:
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html')); // Envía tu index.html
        });
        // NOTA: Si serverR.getRouter() ya tiene una ruta GET / (lo cual no debería con las que te di),
        // podría haber conflicto. En tu caso, serverR no tiene un GET /, así que esta línea está bien.


        // Iniciar el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
            console.log(`Frontend accesible en: http://localhost:${this.app.get('port')}/`);
            console.log(`API endpoints: http://localhost:${this.app.get('port')}/api/...`);
        });
    }

    conectarBD() {
        mongoose.connect(database.db).then(() => {
            console.log("Conexión a BD con éxito");
        }).catch((err) => {
            console.error("Error de conexión a la base de datos:", err); // Mensaje más descriptivo
        });
    }
}

const objServer = new Server();


/* CODIGO DEL PROFE//Importar express
const express = require('express');
const serverRouter = require('.routes/serverRouter');

class Server {
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });

        const router = express.Router();
        router.get('/', (_req, res) => {
            console.log("Nueva conexión");
            res.status(200).json({ message: "Hola mundo!" });
        });
        
        const serverR = new serverRouter.default();

        this.app.use(serverR.router);
        this.app.use(router);
    }
}

const objServer = new Server(); */