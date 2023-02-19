const express=require('express')
const router=express()
const {createTeacher, getTeacherById, deleteTeacherById, updateTeacherById, getAllTeachers, getAllStudentsBy_TeacherId, practiseOperators}=require("../controllers/teacher")



router.post("/teacher",createTeacher)
router.get("/teacher",getAllTeachers)
router.get("/teacher/:id",getTeacherById)
router.delete("/teacher/:id",deleteTeacherById)
router.put("/teacher/:id",updateTeacherById)
router.get("/teacher/allstudents/:id",getAllStudentsBy_TeacherId)
router.get("/node",practiseOperators)
module.exports=router
