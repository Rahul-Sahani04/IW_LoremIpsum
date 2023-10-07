//id url title content username likes

const mongoose = require('mongoose');

const { Schema } = mongoose;


const PostSchema = new Schema({
    likes:{
        type:Number,
        
    },
    content: {
        type : String
    },
    title:{
        type:String,
        required: true,
        unique: true
    },
    imageURI:{
        type:String,
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
 
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;