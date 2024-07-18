const { mongoose } = require("mongoose")
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    snippet :{
        type : String,
        required : true
    },
    body : {
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    likes:[
        {
            type:String,
        }
    ]
},{timestamps : true});

 
module.exports = mongoose.model('Blog',blogSchema);
