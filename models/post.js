// modelo para BBDD -- este modelo identifica un CURSO
const mongoose = require('mongoose')

const posts = new mongoose.Schema({
    title: String,
    contents: Array,
    image: String,
    releaseDate: Date,
    special: Boolean
})

module.exports = mongoose.model('posts', posts)
