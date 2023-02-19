const teacherModel=require("../models/teacher")
const studentModel=require("../models/student")

exports.createTeacher=async(req,res)=>{
    try {
        const {name,age,course}=req.body
        const newUser= await teacherModel.create({
            name,age,course
        })
        
   return res.status(200).json({message:"teacher created successfully",newUser})
   
  } catch (error) {
   console.log(error)
  return res.status(404).json({message:"teacher not created"})
}
}


exports.getTeacherById=async (req,res)=>{
    
    try {
        
        const teacher=await teacherModel.findOne({_id:req.params.id})
        if(!teacher){
            return res.status(404).json("teacher not found")
        }
        return res.status(200).json(teacher)

    } catch (error) {
        console.log(error)
        return res.status(404).json("teacher not found")
    }
}

exports.deleteTeacherById=async (req,res)=>{
    
    try {
        
        const teacher=await teacherModel.findOne({_id:req.params.id})
        if(!teacher){
            return res.status(404).json("teacher not found to delete")
        }
          teacher.student.forEach(async function(e){
                   const student=await studentModel.findById(e._id)
                   student.mentor=null
                   await student.save()
          })
        await teacherModel.findOneAndDelete({_id:req.params.id})
    
        return res.status(200).json({message:"teacher deleted successfully",teacher})

b    } catch (error) {
        console.log(error)
        return res.status(404).json("teacher can not delete",error)
    }
}

exports.updateTeacherById=async(req,res)=>{
 try {
    
    const teacher=await teacherModel.findOne({_id:req.params.id})
    if(!teacher){
        return res.status(404).json("teacher not found to update")
    }
    const updatedTeacher=await teacherModel.findByIdAndUpdate(teacher._id,req.body,{new:true})

    return res.status(200).json({message:"teacher updated successfully",updatedTeacher})

 } catch (error) {
            console.log(error)
        return res.status(404).json({message:"teacher can not update",error})
 }
}

exports.getAllTeachers=async(req,res)=>{
    try {
     const teacherArray=await teacherModel.find()
     if(!teacherArray)
     {return res.status(404).json({message:"teachers not found"})
    }
    return res.json(teacherArray)  

    } catch (error) {
     console.log(error)
     return res.status(404).json({message:"error while fetching teachers"},error)
    }
}


exports.getAllStudentsBy_TeacherId=async(req,res)=>{
     try {
        const teacher= await teacherModel.findById(req.params.id,{student:1,_id:0}).populate({
            path:"student",
            select:{name:1,_id:0},
            populate:{
                path:"mentor",
                select:{name:1,_id:0}
            }
         })
         if(!teacher)
         {
            return res.status(404).json({message:"teacher not found to fetch students"})
          
         }
         return res.status(200).json({message:"student array found",teacher})
     } catch (error) {
        console.log(error)
        return res.status(404).json({message:"teacher not found to fetch students",error})

     }
}

exports.practiseOperators=async (req,res)=>{

   
    // const teachers= await teacherModel.find({course:{$eq:"node js"}})
    //    const teachers=await teacherModel.find({age:{$lt:"24"}})
    //    const teachers=await teacherModel.find({age:{$lte:"24"}})
    // const teachers=await teacherModel.find({age:{$gte:"25"}})
    // const teachers=await teacherModel.find({age:{$gt:"25"}})
    // const teachers=await teacherModel.find({course:{$in:["node js","dot net"]}})
    // const teachers=await teacherModel.find({course:{$nin:["node js"]}})


    const teacher=await teacherModel.find({name:"poonam",student:{$elemMatch:{name:"devanshu"}}})
    return res.json(teacher)

}

