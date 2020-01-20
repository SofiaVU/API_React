// Funciones que se apsaran a Express 
// CREACION DE LAS FUNCIONES DE LAS RUTAS

const DB = require('../lib/post')

module.exports = {

	loadPosts: async (req, res) => {
		const Entries = await DB.getPosts()
		res.status(200) // Todo OK
		res.json(Entries)
	},

	loadPost: async (req, res) => {
		const Entry = await DB.getPost(req.params.id)
		res.status(200) // Todo OK
		res.json(Entry)
	},

	newPost: async (req, res) => {
		const newEntry = await DB.createOrUpdatePost(req.body)
		res.status(201) // Hay nuevo contenido.
        res.json(newEntry)
	},

	updatePost: async (req, res) => {
        const updatedEntry = await Db.createOrUpdatePost(req.body)
        res.status(201)
        res.json(updatedEntry)
    },

    deletePost: async (req, res) => {
        const deletedEntry = await Db.deletePost(req.params.id)
        res.status(204) // 204 => No existe contenido.
        res.json(deletedEntry)
    }
}