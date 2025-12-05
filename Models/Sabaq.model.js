import mongoose from "mongoose";

const sabaqSchema = new mongoose.Schema(
    {
        Title:{type:String,required:[true,"Title is Required"]},
        Course_id:{type:mongoose.Schema.Types.ObjectId,required:[true,"Course id is Required"],ref:"Courses"},
        Lesson:{type:Number,required:[true,"Lesson is Required"]}
    }
)

const Sabaq = new mongoose.model('Sabaq',sabaqSchema)
export default Sabaq