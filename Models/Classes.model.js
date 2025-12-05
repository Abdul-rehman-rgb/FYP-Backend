import mongoose from "mongoose";

const classesSchema = new mongoose.Schema(
    {
        Class:{type:String,required:[true,"Class is Required"]},
        Course_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Course id is Required"],ref:"Courses"},
        Teacher_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Teacher id is Required"],ref:"User"}
    }
)

const Classes = new mongoose.model('Classes',classesSchema)
export default Classes