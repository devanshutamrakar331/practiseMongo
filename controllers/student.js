const student = require("../models/student")
const studentModel=require("../models/student")
const teacherModel=require("../models/teacher")
exports.createStudent=async(req,res)=>{
  try {
    const {name,age,mentor,roll}=req.body
    const newUser= await studentModel.create({
        name,age,roll,mentor
    })
    

   const teacher= await teacherModel.findById(mentor)
   await teacher.student.push(newUser._id)
   await teacher.save()
   
   return res.status(200).json({
    message:"new student created successfully",
    newUser
   })

  } catch (error) {
    console.log(error)
   return res.status(404).json({message:"user not created",error})
}
}


exports.getStudentById=async (req,res)=>{
    
    try {
        
        const student=await studentModel.findOne({_id:req.params.id}).populate({path:"mentor",select:{name:1,_id:0}})
        if(!student){
            return res.status(404).json("student not found")
        }
        return res.status(200).json(student)

    } catch (error) {
        console.log(error)
        return res.status(404).json("student not found")
    }
}

exports.deleteStudentById=async (req,res)=>{
    
    try {
        
        const student=await studentModel.findOneAndDelete({_id:req.params.id})
        if(!student){
            return res.status(404).json("student not found to delete")
        }
        return res.status(200).json({message:"student deleted successfully",student})

b    } catch (error) {
        console.log(error)
        return res.status(404).json("student can not delete",error)
    }
}



exports.updateStudentById=async(req,res)=>{
    try {
       
       const student=await studentModel.findOne({_id:req.params.id})
       if(!student){
           return res.status(404).json("student not found to update")
       }
      const updatedStudent= await studentModel.findByIdAndUpdate(student._id,req.body,{new:true})
   
       return res.status(200).json({message:"student updated successfully",updatedStudent})
   
    } catch (error) {
               console.log(error)
           return res.status(404).json("student can not update",error)
    }
   }

   exports.getAllStudents=async(req,res)=>{
       try {
        const studentArray=await studentModel.find().populate({path:"mentor",select:{name:1,_id:0}})
        if(!studentArray)
        {return res.status(404).json({message:"students not found"})
       }
       return res.json(studentArray)  

       } catch (error) {
        console.log(error)
        return res.status(404).json({message:"error while fetching students"},error)
       }
   }