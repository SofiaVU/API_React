const Post = require('../models/post')

// DEFINIMOS LAS OPERACIONES PARA EL PATRON CRUD 
module.exports = {

	// GET Post ordenados por "releaseDate" de más reciente a menos
	async getPosts(){
		const Posts = await Post.find({}).sort({"releaseDate": -1})
		return Posts
	},

	// GET Post by id 
	async getPost(id) {
        const currentPost = await Post.findById(id)
        return currentPost
    },

    // CREATE or UPDATE Post 
    async createOrUpdatePost(post) {
    	if(post._id){
    		const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new:true})
    		return updatedPost
    	}
    	const newPost = await Post.create(post)
    	return newPost
    },

    // DELETE Post
    async deletePost(id){
    	const deletedPost = await Post.findByIdAndRemove(id)
    	return deletedPost
    }
}