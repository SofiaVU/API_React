const express = require('express')
const apiRoutes = require('./routes/api')
const mongoose = require('mongoose') // Conectar BBDD
const bodyParser = require('body-parser') // lectura de peticiones
// const cors = require('cors') 


const app = express()
const port = process.env.PORT || '3000'

// Conectar BBDD
//const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/openwebinars'
//mongoose.connect(mongoUri)
//mongoose.connect('mongodb+srv://admin:admin@cluster0-gicm1.gcp.mongodb.net/test?retryWrites=true&w=majority')

// << db setup >>

const db = require("./db");
const dbName = "BBDD";
const collectionName = "posts";


// Para poder leer el cuerpo de una peticion
app.use(bodyParser.json()) // Convertira el cuerpo en un objeto JSON.
// app.use(cors())

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
	app.get('/', (req, res) => {
	    res.send('Hello World')
	});

	// get all posts
   dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);

      // << return response to client >>
   });

	// GET all Posts
	app.get("/posts", (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
         if (error) throw error;
         response.json(result);
      });
   });

	// GET Post by given Id
	app.get("/posts/:id", (request, response) => {
      const postId = request.params.id;

      dbCollection.findOne({ id: postId }, (error, result) => {
         if (error) throw error;
         // return post
         response.json(result);
      });
   });

	// POST Posts
	app.post("/posts", (request, response) => {
      const posts = request.body;
      dbCollection.insertOne(posts, (error, result) => { // callback of insertOne
         if (error) throw error;
         // return updated list
         dbCollection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            response.json(_result);
         });
      });
   });

	// DELETE by given Id
	app.delete("/posts/:id", (request, response) => {
      const postId = request.params.id;
      console.log("Delete post with id: ", postId);

      dbCollection.deleteOne({ id: postId }, function (error, result) {
         if (error) throw error;
         // send back entire updated list after successful request
         dbCollection.find().toArray(function (_error, _result) {
            if (_error) throw _error;
            response.json(_result);
         });
      });
   });


	/*
	app.get('/api/posts/', apiRoutes.loadPosts)
	app.get('/api/posts/:id', apiRoutes.loadPost)
	app.post('/api/posts/', apiRoutes.newPost)
	app.put('/api/posts/', apiRoutes.updatePost) // No lleva parámetro id, ya que lo mandamos en el body.
	app.delete('/api/posts/:id', apiRoutes.deletePost)
	*/
}, function (err) { // failureCallback
   throw (err);
})


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

