const express = require('express')
const apiRoutes = require('./routes/api')

const app = express()
const port = process.env.PORT || '3000'




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
