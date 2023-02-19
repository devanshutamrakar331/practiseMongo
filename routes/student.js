const express=require('express')
const router=express()
const {createStudent, getStudentById, deleteStudentById, updateStudentById, getAllStudents}=require("../controllers/student")



router.post("/student",createStudent)
router.get("/student",getAllStudents)
router.get("/student/:id",getStudentById)
router.delete("/student/:id",deleteStudentById)
router.put("/student/:id",updateStudentById)


module.exports=router
