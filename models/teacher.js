const mongoose=require("mongoose")
const teacherSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    
    course:{
        type:String,
        required:true
    }
    ,
    student:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        }
    ]


},{timeStamp:true})

module.exports=mongoose.model("teacher",teacherSchema)