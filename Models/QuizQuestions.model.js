import mongoose from "mongoose";

const quizQuestionsSchema = new mongoose.Schema(
        {
            Quiz_id:[{type:mongoose.Schema.Types.ObjectId,required:[true,"Quiz id is required"],ref:"Quiz"}],
            Question:{type:String,required:[true,"Question is Required"]},
            Answer_1:{type:String,required:[true,"Answer_1 is Required"]},
            Answer_2:{type:String,required:[true,"Answer_2 is Required"]},
            Answer_3:{type:String,required:[true,"Answer_3 is Required"]},
            Answer_4:{type:String,required:[true,"Answer_4 is Required"]},
            R_Answer:{type:String,required:[true,"R_Answer is Required"]},
        }
)

const QuizQuestions = new mongoose.model('QuizQuestions',quizQuestionsSchema)
export default QuizQuestions