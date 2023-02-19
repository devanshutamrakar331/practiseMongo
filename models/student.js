const mongoose=require("mongoose")
const studentSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    roll:{
        type:Number,
        required:true
    }
    ,
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },


},{timeStamp:true})

module.exports=mongoose.model("student",studentSchema)