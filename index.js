import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { createServer } from "http"
import mongoose from 'mongoose'
import multer from 'multer'
import { Server } from "socket.io"

import UserControllers from './Controllers/User.controller.js'
import QuizController from './Controllers/Quiz.controller.js'
import ClassesController from './Controllers/Classes.controller.js'
import ReminderController from './Controllers/Reminder.controller.js'

import Message from './Models/Message.model.js'
import { adminJs, adminRouter } from './Admin/admin.js'

// moved to admin.js
// await mongoose.connect("mongodb+srv://ammar:ammar123@ilm-pro.jeilouv.mongodb.net/?retryWrites=true&w=majority&appName=ILM-Pro")


const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(file.fieldname === "pfp")
        {
        return cb(null,"./Public/Images/ProfilePictures/")
        }
        else if(file.fieldname === "media")
        {
        return cb(null,"./Public/Media/")
        }
    },
    filename:function(req,file,cb){
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'),
        file.originalname.length);
        return cb(null,file.fieldname+'-'+Date.now()+'-'+Math.round(Math.random()* 1E9)+ext)
    }
})
const upload = multer({storage:Storage})

const app=express()
const port=process.env.PORT || 5000
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
app.use(express.static('public'))
app.use(express.json())

app.use(adminJs.options.rootPath, adminRouter)

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true
    }
})

io.on('connection', (socket) => 
{
    app.set('Socket',socket)

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });
    
    socket.on("message",async (msg,id)=>
    {
        io.to(id).emit("messageResponse",msg)
        await Message.create(
            {
                "Id":msg.Id,
                "Type":msg.Type,
                "Text":msg.Text,
                "Sender":msg.Sender,
                "SocketId":msg.SocketId,
                "SenderId":msg.SenderId,
                "ReceiverId":msg.ReceiverId
            }
        )
    })
    
})
httpServer.listen(port,()=>{
    console.log(`Server running at port  ${port}`)
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})


//User
app.get('/api/getUser',UserControllers.getUser)

app.get('/api/user/:User',UserControllers.findUser)

app.post('/api/search-user',UserControllers.SearchUser)

app.get('/api/getAllUsers',UserControllers.getAllUsers)

app.post('/api/getContacts',UserControllers.getContacts)

app.post('/api/getGroups',UserControllers.getGroups)

app.post('/api/Register',upload.single('pfp'),UserControllers.checkInput,UserControllers.AddUser)

app.post('/api/Login',UserControllers.checkInput,UserControllers.loginUser)

app.post('/api/addContact',UserControllers.addContact)

app.post('/api/addMultipleContacts',UserControllers.addMultipleContacts)

app.post('/api/getMessages',UserControllers.getMessages)

app.post('/api/getGroupMessages',UserControllers.getGroupMessages)

app.post('/api/createGroup',upload.single('pfp'),UserControllers.createGroup)

app.post('/api/getGroupMembers',UserControllers.getGroupMembers)

app.post('/api/getStudent',UserControllers.getStudent)

app.post('/api/getTeachersfromClasses',UserControllers.getTeachersfromClasses)

app.get('/api/getTeacherfromClass',UserControllers.getTeacherfromClass)

app.post('/api/getStudentsfromClasses',UserControllers.getStudentsfromClasses)

app.post('/api/getParentsfromStudents',UserControllers.getParentsfromStudents)

app.get('/api/getParentStudent',UserControllers.getParentStudent)

app.post('/api/getStudentsOfClass',UserControllers.getStudentsOfClass)

app.post('/api/getAttendance',UserControllers.getAttendance)

app.post('/api/getStudentAttendance',UserControllers.getStudentAttendance)

app.post('/api/setAttendance',UserControllers.setAttendance)

app.post('/api/updatePoints',UserControllers.UpdatePoints)

app.put('/api/updateUserProfile/:id',upload.single('pfp'), UserControllers.updateUserProfile);


//Quiz 
app.post('/api/addQuiz',QuizController.AddQuiz)

app.post('/api/getQuizes',QuizController.getQuizes)

app.post('/api/getQuizQuestion',QuizController.getQuizQuestion)

app.post('/api/getAllQuizQuestions',QuizController.getAllQuizQuestions)

app.post('/api/addIncompleteQuiz',QuizController.addIncompleteQuiz)


//Classes
app.post('/api/getExams',ClassesController.getExams)

app.post('/api/uploadExamMarks',ClassesController.uploadExamMarks)

app.get('/api/getStudentExamMarks',ClassesController.getStudentExamMarks)

app.get('/api/getStudentTotalExamMarks',ClassesController.getStudentTotalExamMarks)

app.post('/api/createExam',ClassesController.createExam)

app.post('/api/getStudentExam',ClassesController.getStudentExam)

app.post('/api/getScheduleForAttendance',ClassesController.getScheduleForAttendance)

app.post('/api/getSchedule',ClassesController.getSchedule)

app.post('/api/getClasses',ClassesController.getClasses)

app.get('/api/getSabaqs',ClassesController.getSabaqs)

app.get('/api/getCourse',ClassesController.getCourse)


//Reminder
app.post('/api/addReminder',ReminderController.addReminder)

app.get('/api/getReminders',ReminderController.getReminders)

app.delete('/api/removeReminder',ReminderController.removeReminder)


