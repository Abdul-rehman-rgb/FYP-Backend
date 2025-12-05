import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        Title:{type:String,required:[true,"Title is Required"]},
        Class_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Class id is Required"],ref:"Classes"},
        Class_Name:{type:String,required:[true,"Class Name is Required"]},
        Date:{type:Date,required:[true,"Date is Required"]},
        Total_Marks:{type:Number,required:[true,"Total Marks is Required"]}
    }
)

const Exam = new mongoose.model('Exam',examSchema)
export default Exam