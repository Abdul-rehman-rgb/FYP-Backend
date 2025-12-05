
import Reminder from '../Models/Reminder.model.js'

async function addReminder(req,res){
    try
    {
        const rem = await Reminder.create({
            User_id:req.body.user_id,
            Title:req.body.title,
            Date:req.body.date,
            Color:req.body.color
        })
        
        res.status(200).send(rem)
    }
    catch(err)
    {
        console.log(err);
    }
}

async function getReminders(req,res)
{
    try
    {
        let reminders = await Reminder.find({"User_id":req.query.user_id})
        res.status(200).send(reminders)
    }
    catch(e)
    {
        console.log(e)
    }

}

async function removeReminder(req,res)
{
    try
    {
        const { id } = req.body;
        let remove = await Reminder.deleteOne({"_id":id})
        console.log(remove)
        res.status(200).send(remove)
    }
    catch(e)
    {console.log(e)}
}


export default {addReminder,getReminders,removeReminder}