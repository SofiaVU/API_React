// modelo para BBDD -- este modelo identifica un CURSO
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    contents: Array,
    image: String,
    releaseDate: Date,
    special: Boolean
})

module.exports = mongoose.model('Post', PostSchema)

 // mongodb+srv://admin:admin@cluster0-gicm1.gcp.mongodb.net/test?retryWrites=true&w=majority
 /*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0-gicm1.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

 */