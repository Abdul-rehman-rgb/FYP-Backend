// admin.js
import express from 'express'
import mongoose from 'mongoose'
import AdminJS, { ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import { fileURLToPath } from 'url' // Import for __filename and __dirname
import path from 'path'

// Import your models
import Attendance from '../Models/Attendance.model.js'
import Class_Student from '../Models/Class_Student.model.js'
import Classes from '../Models/Classes.model.js'
import IncompleteQuiz from '../Models/IncompleteQuiz.model.js'
import Quiz from '../Models/Quiz.model.js'
import QuizQuestions from '../Models/QuizQuestions.model.js'
import Schedules from '../Models/Schedules.model.js'
import User from '../Models/Users.model.js'
import Courses from '../Models/Courses.model.js'
import Exam from '../Models/Exam.model.js'
import Exam_Student from '../Models/Exam_Student.model.js'
import Reminder from '../Models/Reminder.model.js'
import Sabaq from '../Models/Sabaq.model.js'
import Parent_Student from '../Models/Parent_Student.model.js' // Import for path manipulation

// Get __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Register the AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose)


const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ammar:ammar123@ilm-pro.jeilouv.mongodb.net/?retryWrites=true&w=majority&appName=ILM-Pro")

//Create AdminJS instance
const adminJs = new AdminJS({
  rootPath: '/admin',
  resources: [
    {
      resource: User
    },
    {
      resource: Parent_Student
    },
    {
      resource: Quiz
    },
    {
      resource: Attendance
    },
    {
      resource: Classes
    },
    {
      resource: QuizQuestions
    },
    {
      resource: Schedules
    },
    {
      resource: Class_Student
    },
    {
      resource: IncompleteQuiz
    },
    {
      resource: Courses
    },
    {
      resource: Exam
    },
    {
      resource: Exam_Student
    },
    {
      resource: Reminder
    },
    {
      resource: Sabaq
    }
  ],
  branding: {
    companyName: 'ILM PRO',
    logo: process.env.LOGO_URL || 'http://localhost:5000/Images/Logos/IlmProLandscapeWhite.png',
    // favicon: 'https://yourdomain.com/favicon.ico',
    softwareBrothers: false, // removes "SoftwareBrothers" branding
  }
})

//Add admin panel router with login
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === (process.env.ADMIN_EMAIL || 'admin@example.com') && password === (process.env.ADMIN_PASSWORD || 'admin')) {
      return { email }
    }
    return null
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_PASSWORD || 'some-secret-password',
},null,
{
  resave:false,
  saveUninitialized:false
}
)

export { adminJs, adminRouter }