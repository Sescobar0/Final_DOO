const person = require('../models/person'); 
// Importamos el modelo de la base de datos NoSQL (MongoDB) que hemos creado

class ServerController {

    
    constructor() {
        // En un constructor real de una aplicación más grande, aquí podrías
        // inicializar la conexión a la base de datos o pasarla como dependencia.
    }

    // Obtiene todos los registros de la colección de la base de datos NoSQL
    async getAllUsers(req, res) {
        try {
            const data = await person.find({});
            res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            res.status(500).json({ message: "Error interno del servidor al obtener todos los usuarios." });
        }
    }


    // Obtiene el registro según el id que le estemos pasando a la colección de la base de datos NoSQL
    async getUsers(req, res) {
        try {
            const id = req.params.id;
            const data = await person.findById(id);

            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            console.error(`Error al obtener el usuario con ID ${req.params.id}:`, error);
            if (error.name === 'CastError') {
                return res.status(400).json({ message: "ID de usuario no válido." });
            }
            res.status(500).json({ message: "Error interno del servidor al obtener el usuario." });
        }
    }

    // *** FUNCIÓN PARA LA BÚSQUEDA ***
    async searchUsers(req, res) {
        try {
            const searchTerm = req.query.q;

            if (!searchTerm) {
                return res.status(400).json({ message: "El término de búsqueda 'q' es requerido." });
            }

            // Búsqueda en los campos 'nombre', 'apellido', y 'email' usando expresiones regulares
            // $regex: busca un patrón (el término de búsqueda)
            // $options: 'i': hace la búsqueda insensible a mayúsculas y minúsculas
            // $or: permite que el documento coincida si cualquiera de las condiciones es verdadera
            const results = await person.find({
                $or: [
                    { nombre: { $regex: searchTerm, $options: 'i' } },
                    { apellido: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } }
                ]
            });

            res.status(200).json(results);

        } catch (error) {
            console.error('Error al buscar personas en la base de datos:', error);
            res.status(500).json({ message: "Error interno del servidor al realizar la búsqueda." });
        }
    }

    // *** MÉTODOS PARA REGISTER, UPDATE, DELETE USER ***
    async register(req, res) {
        try {
            const newPerson = new person(req.body); 
            await newPerson.save();
            res.status(201).json(newPerson); 
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Error interno del servidor al registrar usuario." });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id; 
            const updatedPerson = await person.findByIdAndUpdate(id, req.body, { new: true }); 

            if (updatedPerson) {
                res.status(200).json(updatedPerson);
            } else {
                res.status(404).json({ message: "Usuario a actualizar no encontrado." });
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            if (error.name === 'CastError') { 
                return res.status(400).json({ message: "ID de usuario no válido para actualizar." });
            }
            res.status(500).json({ message: "Error interno del servidor al actualizar usuario." });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id; 
            const deletedPerson = await person.findByIdAndDelete(id);

            if (deletedPerson) {
                res.status(200).json({ message: "Usuario eliminado exitosamente." });
            } else {
                res.status(404).json({ message: "Usuario a eliminar no encontrado." });
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            if (error.name === 'CastError') { 
                return res.status(400).json({ message: "ID de usuario no válido para eliminar." });
            }
            res.status(500).json({ message: "Error interno del servidor al eliminar usuario." });
        }
    }
}

exports.default = ServerController;


// const person = require('../models/person');

// class ServerController {
//     constructor() {
//     }
// // obtiene todos los registros de la coleccion de la base de datos noSQL
//     getAllUsers(req, res) {
//         person.find((error, data) => {
//             if (error) {
//                 res.status(500).send();
//             } else {
//                 res.status(200).json(data);
//             }
//         })
//     }
// // obtiene el regisitro segun el id que le estemos pasando a la coleccion de la base de datos noSQL
//     // el id es el que se le pasa por la url
//     getUsers(req, res) {
//         let id = req.params.id;
//         person.findById(id, (error, data) => {
//             // si la data no existe dice que hay error o un error del servidor
//             if (error) {
//                 res.status(500).send();
//             } else {
//                 res.status(200).json(data);
//             }
//         })
//     }
// // a traves del findbyid que es una funcion del mongodb esa funcion me trae todo porque a traves del id con el object que le paso puede 
//     // buscar el id y me trae el objeto completo
//     // la funcion find es para que me traiga todos los objetos no especifico que
// }

// exports.default = ServerController;