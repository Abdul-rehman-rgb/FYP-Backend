import mongoose from "mongoose";

const parent_studentSchema = new mongoose.Schema(
    {
        Parent_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Parent id is required"],ref:"User"},
        Student_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Student id is required"],ref:"User"}
    }
)

const Parent_Student = new mongoose.model('Parent_Student',parent_studentSchema)
export default Parent_Student