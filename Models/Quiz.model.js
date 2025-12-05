import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        Title:{type:String,required:[true,"Title is Required"]},
        Class_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Class id is Required"],ref:"Classes"},
        Class_Name:{type:String,required:[true,"Class Name is Required"]},
        Due_Date:{type:Date,required:[true,"Due_Date is Required"]},
        T_Questions:{type:Number,required:[true,"T_Questions is Required"]},
        Quiz_Questions:[{type:mongoose.Schema.Types.ObjectId,required:[true,"Quiz Questions are required"],ref:"QuizQuestions"}],
    }
)

const Quiz = new mongoose.model('Quiz',quizSchema)
export default Quiz