import mongoose from "mongoose";

const exam_studentSchema = new mongoose.Schema(
    {
        Exam_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Exam id is Required"],ref:"Exam"},
        Student_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Student id is Required"],ref:"User"},
        Obtained_Marks:{type:Number}
    }
)

const Exam_Student = new mongoose.model('Exam_Student',exam_studentSchema)
export default Exam_Student