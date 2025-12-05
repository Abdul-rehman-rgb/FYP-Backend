
//table name (incomplete quiz) because it is used to show quizes in progress and are incomplete
//this table is many to many relation table of quiz and users

import mongoose from "mongoose";

const incompleteQuizSchema = new mongoose.Schema(
    {
        User_id:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        Quiz_id:{type:mongoose.Schema.Types.ObjectId,ref:"Quiz"},
        Completed:{type:Number},
        Correct:{type:Number}
    }
)

const IncompleteQuiz = new mongoose.model('IncompleteQuiz',incompleteQuizSchema)
export default IncompleteQuiz