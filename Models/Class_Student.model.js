import mongoose from "mongoose";

const class_studentSchema = new mongoose.Schema(
    {
        Class_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Class id is Required"],ref:"Classes"},
        Class_Name:{type:String,required:[true,"Class is Required"]},
        Student_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Student id is Required"],ref:"User"}
    }
)

const Class_Student = new mongoose.model('Class_Student',class_studentSchema)
export default Class_Student