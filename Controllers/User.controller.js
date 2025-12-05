import Attendance from '../Models/Attendance.model.js'
import Class_Student from '../Models/Class_Student.model.js'
import Contact from '../Models/Contacts.model.js'
import Message from '../Models/Message.model.js'
import Room from '../Models/Room.model.js'
import User from '../Models/Users.model.js'
import Parent_Student from '../Models/Parent_Student.model.js'
import Classes from '../Models/Classes.model.js'
import bcrypt from "bcrypt";


async function AddUser(req,res,next){
    try
    {
        let check = await User.findOne({"Email":req.body.email},{"_id":1})
        if(!check)
        {
            let resp = await User.create(
                {
                    "Name":req.body.name,
                    "Email":req.body.email,
                    "Password":req.body.pass,
                    "Age":req.body.age,
                    "Gender":req.body.gender,
                    "Phone":req.body.phone,
                    "Role":req.body.role,
                    "pfp":`/Images/ProfilePictures/${req.file.filename}`
                }
            )
            res.send("Account Created Successfully")
            next()
        }
        res.send("Email Already Exists")
    }
    catch(error)
    {
        console.log(error.message);
        // res.send(error.message)
    }
}

async function UpdatePoints(req,res,next){
    try
    {        
                  // await User.User.findOne({"Email":req.body.email},{"Points":1})  both are correct syntax
        const user = await User.findOne({"_id":req.body.id}).select("Points")

        if(req.body.flag)
        {
            let resp = await User.updateOne({"_id":req.body.id},{ $set:{Points:user.Points+req.body.points}})
            const updatedPoints = await User.findOne({"_id":req.body.id}).select("Points")
            
            res.status(200).send(updatedPoints)
        }
        else
        {
            let resp = await User.updateOne({"_id":req.body.id},{ $set:{Points:user.Points-req.body.points}})
            const updatedPoints = await User.findOne({"_id":req.body.id}).select("Points")
            
            res.status(200).send(updatedPoints)
        }
    }
    catch(error)
    {
        console.log(error.message);
        // res.send(error.message)
    }
}

async function getStudentsOfClass(req,res){
    try
    {
        let students = await Class_Student.find({"Class_id":req.body.class_id})
        res.status(200).send(students)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getStudent(req,res){
    try
    {
        let student = await User.findOne({"_id":req.body.student_id})
        res.status(200).send(student)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getParentsfromStudents(req,res){
    try
    {
        let parents = await Parent_Student.find({"Student_id":{$in:req.body}})
        res.status(200).send(parents)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getStudentsfromClasses(req,res){
    try
    {
        let students = await Class_Student.find({"Class_id":{$in:req.body}})
        res.status(200).send(students)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getTeachersfromClasses(req,res){
    try
    {
        let teachers = await Classes.find({"_id":{$in:req.body}})
        res.status(200).send(teachers)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getTeacherfromClass(req,res){
    try
    {
        let teacher = await Classes.findOne({"_id":req.query.Class_id})
        res.status(200).send(teacher)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getParentStudent(req,res){
    try
    {
        let student = await Parent_Student.findOne({"Parent_id":req.query.parent_id},{"Student_id":1,"_id":0})        
        res.status(200).send(student)
    }
    catch(e)
    {
        console.log(e)
    }
}

async function getAttendance(req,res){
    try
    {
        let attendance

        attendance = await Attendance.find({"Class_id":req.body.class_id, "Date" : req.body.date})
        console.log(attendance);
        
        if(attendance.length === 0)
        {
            let students = await Class_Student.find({"Class_id":req.body.class_id},{"Student_id":1,"_id":0})
            
            let studentIds =[]
            students.map((i)=>(
                studentIds.push(i.Student_id)
            ))
            
            students = await User.find({"_id":{$in:studentIds}})
            let resp = 
            {
                studentsData : students,
                marked:false
            }
            console.log(resp)
            res.status(200).send(resp)
        }
        else
        {
            let resp = 
            {
                attendanceData : attendance,
                marked:true
            }
            console.log(resp)
            res.status(200).send(resp)
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getStudentAttendance(req,res){
    try
    {
        const attendance = await Attendance.find({"Class_id":req.body.class_id, "Student_id" : req.body.student_id})
        res.status(200).send(attendance)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function setAttendance(req,res){
    try
    {
        console.log(req.body);
        
        if(req.body.marked != true)
        {
            const attendance = await Attendance.insertMany(req.body.attendanceData)            
            res.status(201).send(attendance)
        }
        else
        {
            let updateData=[]
            req.body.attendanceData.map((i)=>(
                updateData.push(
                    {
                        updateOne:{
                            filter:{_id:i._id},
                            update:{$set:{Status:i.Status}}
                        }
                    }
                )
            ))

            const updateAttendance = await Attendance.bulkWrite(updateData)
            // const updateAttendance = await Attendance.updateMany(req.body.attendanceData)
            res.status(201).send(updateAttendance)
        }
            
    }
    catch(e)
    {
        console.log(e)
    }
}

async function loginUser(req, res, next) {
    try {
        let user = await User.findOne({
            "Email": req.body.email,
            "Password": req.body.pass
        });

        if (user === null) {
            throw new Error("No User found");
        }

        res.status(200).send(user);
    } catch (err) {
        console.error("Login error:", err.message); // Log just the message
        res.status(400).send({ error: err.message }); // Send a readable error response
    }
}


function checkInput(req,res,next){
    if(req.body.name== "" || req.body.email== "" || req.body.pass== "" 
    || req.body.age== "" || req.body.gender== "" || req.body.phone== "")
    {
        res.status(400).send("Please fill all fields")
    }
    else{
        next()
    }
}

async function getAllUsers(req,res,next){
    try
    {
        let users = await User.find()
        
        res.status(200).send(users)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function findUser(req,res,next){

    try
    {
        console.log(req.params);
        
        console.log(req.params);
        
        let user = await User.findOne({'_id':req.params.User})
        
        res.status(200).send(user)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function getUser(req,res,next){

    try
    {
        let user = await User.findOne({'_id':req.query.User})
        
        res.status(200).send(user)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function SearchUser(req,res,next){

    try
    {
        if(req.body.username)
        {
        let user = await User.find({'Name':new RegExp(req.body.username)},{"pfp":1,"Name":1,_id:1})
        res.status(200).send(user)
        }
        else{
        res.status(200).send([])
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function addMultipleContacts(req,res,next){
    try
    {
        let resp = await Contact.insertMany(req.body)
        res.status(200).send(resp.message)
    }
    catch(error)
    {
        console.log(error.message);
        // res.status(400).send(error.name)
    }
}


async function addContact(req,res,next){
    try
    {
        let resp = await Contact.create(
            {
                "UserId1":req.body.id1,
                "UserId2":req.body.id2
            }
        )
        res.status(200).send(resp.message)
    }
    catch(error)
    {
        console.log(error.message);
        // res.status(400).send(error.name)
    }
    next()
}


async function getContacts(req,res,next){
    // const socket = req.app.get('Socket')
    // const socket = req.app.get('Socket')
    try
    {
        let currentUser = req.body.id
        let userToFind = ''
        let contacts = []
        let users = await Contact.find({$or:[{'UserId1':currentUser},
        {'UserId2':currentUser}]})
        
        await Promise.all(users.map(async(user,index) => {
            if(currentUser === user.UserId1.valueOf())
            {
                userToFind = user.UserId2.valueOf()
            }
            else if(currentUser === user.UserId2.valueOf())
            {
                userToFind = user.UserId1.valueOf()
            }
            contacts[index] = {
                contactId : await User.findOne({'_id':userToFind}),
                commonId : user._id
            }
            
            // socket.join(user._id.valueOf())
            // socket.join(user._id.valueOf())
        }))
        res.status(200).send(contacts)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getGroups(req,res){
    const socket = req.app.get('Socket')
    try
    {
        let groupDetails = []
        let groups = await User.findOne({"_id":req.body.id},{"Groups":1,"_id":0})

        await Promise.all(groups.Groups.map(async(g,i)=>{
            groupDetails[i] = await Room.findOne({"_id":g})
            socket.join(g.valueOf())
        }))

        res.status(200).send(groupDetails)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send("Error while fetching groups")
    }
}

async function getMessages(req,res,next){
    
    try
    {
        // let currentUser = req.body.user
        // let messages = await Message.find({$and:[{"Type":false},
        // {$or:[{'SenderId':currentUser},{ReceiverId:{$in:[currentUser]}}]}]})

        let messages = await Message.find({"SocketId":req.body.SocketId})

        res.status(200).send(messages)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}
async function getGroupMessages(req,res,next){
    try
    {
        let currentUser = req.body.user
        let groupMessages = await Message.find({$and:[{"Type":true},
        {ReceiverId:{$in:[currentUser]}}]})
        res.status(200).send(groupMessages)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function createGroup(req,res)
{
    let members = JSON.parse(req.body.members)
    let group = await Room.create(
        {
            'RoomName':req.body.groupName,
            'pfp':`/Images/ProfilePictures/${req.file.filename}`,
            'Members':members
        }
    )
    await Promise.all(members.map(async(member)=>{
        await User.updateOne({'_id':member},{$push:{Groups:group._id}})
    })
    )
}

async function getGroupMembers(req,res){

    let members = []
    await Promise.all(req.body.map(async(member,i)=>{
        let temp = await User.find({"_id" : member})
        members[i] = temp[0]
    })
    )
    res.status(200).send(members)
}

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender, password, pfp } = req.body;

  try {  
    const user = await User.findById(id);
    
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.Name = name || user.Name;
    user.Email = email || user.Email;
    user.Phone = phone || user.Phone;
    user.Gender = gender || user.Gender;
    user.Password = password || user.Password;
    if (req.file) {
      user.pfp = req.file.filename || user.pfp;
    }
    else{
        user.pfp = user.pfp;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    let userResp = await user.save();
    console.log(userResp)
    
    res.status(200).json({ success: true, userResp });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ success: false, message: "Server error"+err.message });
  }
};





export default {getUser,AddUser,getStudent,getParentsfromStudents,getTeachersfromClasses,getTeacherfromClass,
    getStudentsfromClasses,getParentStudent,getStudentsOfClass,getAttendance,getStudentAttendance,updateUserProfile,
    setAttendance,UpdatePoints,checkInput,getAllUsers,findUser,loginUser,SearchUser,addContact,addMultipleContacts,
    getContacts,getMessages,getGroupMessages,createGroup,getGroups,getGroupMembers}