const express = require('express')
const apiRoutes = require('./routes/api')
const mongoose = require('mongoose') // Conectar BBDD
const bodyParser = require('body-parser') // lectura de peticiones
const cors = require('cors') 


const app = express()
const port = process.env.PORT || '3000'

// Conectar BBDD
//const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/openwebinars'
//mongoose.connect(mongoUri)
mongoose.connect('mongodb+srv://admin:admin@cluster0-gicm1.gcp.mongodb.net/test?retryWrites=true&w=majority')


// << db setup >>
/*
const db = require("./db");
const dbName = "BBDD";
const collectionName = "posts";
*/


// Para poder leer el cuerpo de una peticion
app.use(bodyParser.json()) // Convertira el cuerpo en un objeto JSON.
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/posts/', apiRoutes.loadPosts)
app.get('/api/posts/:id', apiRoutes.loadPost)
app.post('/api/posts/', apiRoutes.newPost)
app.put('/api/posts/', apiRoutes.updatePost) // No lleva parámetro id, ya que lo mandamos en el body.
app.delete('/api/posts/:id', apiRoutes.deletePost)


app.listen(port, () => {
    console.log(`[Express App] The app is listening on port: ${port}`)
})


// Gestionar Errores
app.on('error', (err) => handleError)
app.on('uncaughtException', (err) => handleError)
app.on('unhandledRejection', (err) => handleError)

function handleError(err) {
    console.error(`[Error] ${err.message}`)
    console.error(err.stack)
}

