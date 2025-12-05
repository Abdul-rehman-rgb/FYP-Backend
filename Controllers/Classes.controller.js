import Class_Student from '../Models/Class_Student.model.js'
import Classes from '../Models/Classes.model.js'
import Schedules from '../Models/Schedules.model.js'
import Exam from '../Models/Exam.model.js'
import Exam_Student from '../Models/Exam_Student.model.js'
import Sabaq from '../Models/Sabaq.model.js'



async function getExams(req,res){
    try
    {
            const exams = await Exam.find({"Class_id":req.body.class_id})
            res.status(200).send(exams)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function createExam(req,res){
    try
    {
        const exam = await Exam.create(req.body)

        const students = await Class_Student.find({"Class_id":req.body.Class_id},{"Student_id":1,"_id":0})

        students.map(async(student)=>{
            await Exam_Student.create({
                "Student_id":student.Student_id,
                "Exam_id":exam._id
            })
        })

        res.status(200).send(exam)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getStudentExam(req,res){
    try
    {
        const exams = await Exam.find({"Class_id":req.body.class_id})
        res.status(200).send(exams)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getStudentExamMarks(req,res)
{
    try
    {
        const {exam_id,student_id} = req.query
        
        let Marks = await Exam_Student.findOne({"Exam_id":exam_id,"Student_id":student_id},{"Obtained_Marks":1,"_id":0})

        if(!Marks)
        {
            Marks = await Exam_Student.create({
                "Exam_id" : exam_id,
                "Student_id" : student_id
            })
            console.log(Marks)
            
        }
        res.status(200).send(Marks)
    }
    catch(e)
    {
        console.log(e)
    }

}
async function getStudentTotalExamMarks(req,res)
{
    try
    {
        const {student_id} = req.query
        
        let Marks = await Exam_Student.find({"Student_id":student_id},{"Obtained_Marks":1,"_id":0})

        let Total = 0
        
        Marks.map((i)=>{
            Total = Total + i.Obtained_Marks
        })
       
        res.status(200).send(Total)
    }
    catch(e)
    {
        console.log(e)
    }

}

async function uploadExamMarks(req,res)
{
    try
    {
        console.log(req.body)
        
        let Marks = await Exam_Student.findOneAndUpdate({Exam_id:req.body.Exam_id,Student_id:req.body.Student_id},{$set:{Obtained_Marks:req.body.Obtained_Marks}},{ new: true })
        console.log(Marks)
        
        res.status(200).send(Marks)
    }
    catch(e)
    {
        console.log(e)
    }

}

async function getSchedule(req,res){
    try
    {
        let classes
        let classIds=[]
        if(req.body.role == 'Student')
        {
            classes = await Class_Student.find({"Student_id":req.body.user_id},{"Class_id":1,"_id":0})
            classes.map((i)=>(
                classIds.push(i.Class_id)
            ))
        }
        else if(req.body.role == 'Teacher')
        {
            classes = await Classes.find({"Teacher_id":req.body.user_id},{"_id":1,"Class":1})
            classes.map((i)=>(
                classIds.push(i._id)
            ))  
        }
        let schedule = await Schedules.find({"Class_id":{$in:classIds}})
        
        res.status(200).send(schedule)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getScheduleForAttendance(req,res){
    try
    {
        let schedule = await Schedules.find({"Class_id":req.body.class_id})
        
        res.status(200).send(schedule)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getClasses(req,res){
    try
    {
        let classes
        if(req.body.role == 'Student')
        {
            classes = await Class_Student.find({"Student_id":req.body.user_id})
        }
        else if(req.body.role == 'Teacher')
        {
            classes = await Classes.find({"Teacher_id":req.body.user_id})
        }
        
        res.status(200).send(classes)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getCourse(req,res)
{
    try
    {        
        let course = await Classes.findOne({"_id":req.query.class_id},{"Course_id":1,"_id":0})
        
        res.status(200).send(course)
    }
    catch(e)
    {
        console.log(e)
    }

}

async function getSabaqs(req,res)
{
    try
    {
        let sabaqs = await Sabaq.find({"Course_id":req.query.course_id}).sort({Lesson:1})
        
        res.status(200).send(sabaqs)
    }
    catch(e)
    {
        console.log(e)
    }

}


export default {getCourse,getSabaqs,getExams,getStudentExam,uploadExamMarks,getStudentExamMarks,
                createExam,getScheduleForAttendance,getSchedule,getClasses,getStudentTotalExamMarks}