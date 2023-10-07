const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    verify_token: {
        type : String
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    pass:{
        type:String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
 
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const user = mongoose.model('Users', userSchema)
module.exports = user;