const express = require('express');
const serverController = require("../controllers/serverController"); // Asegúrate de que esta ruta sea correcta

class ServerRouter {
    constructor() {
        this.router = express.Router();
        // <<-- ¡MOVEMOS LA CREACIÓN DE objServerC AQUÍ!
        // Hacemos que 'objServerC' sea una propiedad de la instancia de la clase 'ServerRouter'
        this.objServerC = new serverController.default();
        this.config(); // Llama a config después de inicializar this.objServerC
    }

    config() {
        // Ahora, en lugar de declarar una nueva 'objServerC' local,
        // usamos la propiedad de la instancia 'this.objServerC' para todas las rutas.
        this.router.get("/users", this.objServerC.getAllUsers);
        this.router.get("/users/:id", this.objServerC.getUsers);

        // Rutas POST, PUT, DELETE (descomentadas y usando this.objServerC)
        this.router.post("/users", this.objServerC.register);
        // NOTA: Ajusté PUT y DELETE para usar :id, como es estándar para actualizar/eliminar específicos.
        // Si no lo hiciste antes, POR FAVOR, cámbialo en tu archivo serverRouter.js también.
        this.router.put("/users/:id", this.objServerC.update);
        this.router.delete("/users/:id", this.objServerC.deleteUser);

        // ¡NUEVA RUTA DE BÚSQUEDA! (ya está correcta con this.objServerC)
        this.router.get("/api/users/search", this.objServerC.searchUsers);
    }

    // Este método es necesario para que el router pueda ser usado en tu aplicación Express (ej. en app.js)
    getRouter() {
        return this.router;
    }
}

exports.default = ServerRouter;

/*const express = require('express');
const serverController = require("../controllers/serverController");

class ServerRouter{
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){

        // los onbjetos se nombran con obj el .default porque es exports.default
        // en serveercontroller tiene un metodo que se llama getAllUsers por eso se llama
        const objServerC = new serverController.default();
        this.router.get("/users", objServerC.getAllUsers);
        // get obtiene, el post para insertar, el put para actualizar y el delete para eliminar
        this.router.get("/users/:id", objServerC.getUsers);
        // this.router.post("/users", objServerC.register);
        // this.router.put("/users/:id", objServerC.update);
        // this.router.delete("/users/:id", objServerC.deleteUser);

    }
}

exports.default = ServerRouter;
// siempre exportar el default con el nombre de la clase
*/