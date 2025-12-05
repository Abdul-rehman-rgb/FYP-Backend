import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        Course_Name:{type:String,required:[true,"Course Name is Required"]}
    }
)

const Courses = new mongoose.model('Courses',courseSchema)
export default Courses