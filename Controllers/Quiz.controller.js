import IncompleteQuiz from '../Models/IncompleteQuiz.model.js'
import Quiz from '../Models/Quiz.model.js'
import QuizQuestions from '../Models/QuizQuestions.model.js'


async function AddQuiz(req, res, next) {
    try {
        const { title, class_id, class_name, due_date, t_questions, questions } = req.body;

        // Validate required fields
        if (!title || !class_id || !due_date || !t_questions || !questions || questions.length === 0) {
            console.log(req.body)
            
            console.log(title, class_id, class_name, due_date, t_questions, questions)            
            return res.status(400).send("Missing required fields");
        }

        // Step 1: Create the Quiz first with empty Quiz_Questions
        const quiz = await Quiz.create({
            Title: title,
            Class_id: class_id,
            Class_Name: class_name,
            Due_Date: due_date,
            T_Questions: t_questions,
            Quiz_Questions: [] // will update this later
        });

        // Step 2: Shuffle and save each question
        const questionPromises = questions.map(async (item) => {
            // Step 2.1: Build options array and shuffle
            const options = [
                { label: item.option_1 },
                { label: item.option_2 },
                { label: item.option_3 },
                { label: item.r_answer, isCorrect: true },
            ];

            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            // Step 2.2: Find which one is the correct answer after shuffle
            const r_answer = options.find(opt => opt.isCorrect)?.label;

            // Step 2.3: Create the question with shuffled options
            const question = await QuizQuestions.create({
                Question: item.question,
                Answer_1: options[0].label,
                Answer_2: options[1].label,
                Answer_3: options[2].label,
                Answer_4: options[3].label,
                R_Answer: r_answer,
                Quiz_id: quiz._id
            });

            return question._id;
        });

        // Step 3: Wait for all questions to be created
        const questionIds = await Promise.all(questionPromises);

        // Step 4: Update the quiz with question IDs
        await Quiz.findByIdAndUpdate(quiz._id, {
            Quiz_Questions: questionIds
        });

        res.status(201).send("Quiz Added Successfully");

    } catch (error) {
        console.error("Error adding quiz:", error.message);
        res.status(500).send("Server error while adding quiz");
    }
}



// async function AddQuiz(req, res, next) {
//     try {
//         const { title, class_id, class_name, due_date, t_questions, questions } = req.body;

//         // Validate required fields
//         if (!title || !class_id || !due_date || !t_questions || !questions || questions.length === 0) {
//             return res.status(400).send("Missing required fields");
//         }

//         // Step 1: Create the Quiz first with empty Quiz_Questions
//         const quiz = await Quiz.create({
//             Title: title,
//             Class_id: class_id,
//             Class_Name: class_name,
//             Due_Date: due_date,
//             T_Questions: t_questions,
//             Quiz_Questions: [] // will update this later
//         });

//         // Step 2: Create each question and link to quiz._id
//         const questionPromises = questions.map(async (item) => {
//             const question = await QuizQuestions.create({
//                 Question: item.question,
//                 Answer_1: item.option_1,
//                 Answer_2: item.option_2,
//                 Answer_3: item.option_3,
//                 Answer_4: item.r_answer,
//                 R_Answer: item.r_answer,
//                 Quiz_id: quiz._id
//             });
//             return question._id;
//         });

//         // Step 3: Wait for all questions to be created
//         const questionIds = await Promise.all(questionPromises);

//         // Step 4: Update the quiz with question IDs
//         await Quiz.findByIdAndUpdate(quiz._id, {
//             Quiz_Questions: questionIds
//         });

//         res.status(201).send("Quiz Added Successfully");

//     } catch (error) {
//         console.error("Error adding quiz:", error.message);
//         res.status(500).send("Server error while adding quiz");
//     }
// }

// async function AddQuiz(req,res,next){

//     try
//     {        
//         console.log(req.body)
        
//         if(req.body == null || req.body.title == null || req.body.class_id == null || req.body.due_date == null || req.body.t_questions == 0)
//         {      
//             console.log(req.body)         
//             res.status(400).send("Missing required fields")
//         }
//         else
//         {
//             const questionPromises = req.body.questions.map(async(item)=> {
//                 const question = await QuizQuestions.create(
//                     {
//                         "Question":item.question,
//                         "Answer_1":item.option_1,
//                         "Answer_2":item.option_2,
//                         "Answer_3":item.option_3,
//                         "R_Answer":item.r_answer
//                     })
//                     // id_arr.push(resp._id)
//                     return question._id
//                 }
//             )
//             //wait for all promises to resolve before contnuing below code
//             const id_arr = await Promise.all(questionPromises);
//             console.log(id_arr);
            
//             let resp2 = await Quiz.create(
//                 {
//                     "Title":req.body.title,
//                     "Class_id":req.body.class_id,
//                     "Class_Name":req.body.class_name,
//                     "Due_Date":req.body.due_date,
//                     "T_Questions":req.body.t_questions,
//                     "Quiz_Questions":id_arr
//                 }
//             )
//             res.status(201).send("Quiz Added Successfully")
//         }
//     }
//     catch(error)
//     {
//         console.log(error.message);
//         // res.send(error.message)
//     }
// }
async function getQuizes(req,res){
    try
    {
        if(req.body.role == "Student")
        {
            let classIds = []
            req.body.class_id.map((i)=>(
                classIds.push(i.Class_id)
            ))
            
            const quizes = await Quiz.find({"Class_id":classIds})
            let quiz = []
            await Promise.all(
            quizes.map(async(item,index)=>{
                const inc_quiz = await IncompleteQuiz.findOne({$and:[{"User_id":req.body.user_id},{"Quiz_id":item._id}]})
                if(inc_quiz)
                {
                    // quizes[index].completed=inc_quiz.Completed
                    quiz[index] = {
                        quiz : item,
                        completed : inc_quiz.Completed,
                        correct : inc_quiz.Correct 
                    }
                }
                else
                {
                    quiz[index] = {
                        quiz : item,
                        completed : 0,
                        correct : 0
                    }
                }
            })
            )
            res.status(200).send(quiz)
        }
        else
        {
            const quizes = await Quiz.find({"Class_id":req.body.class_id})
            res.status(200).send(quizes)
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getQuizQuestion(req,res){
    try
    {
        let question = await QuizQuestions.findOne({"_id":req.body.id})
        res.status(200).send(question)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function getAllQuizQuestions(req,res){
    try
    {
        let questions = await QuizQuestions.find({"Quiz_id":req.body.Quiz_id})
        res.status(200).send(questions)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error)
    }
}

async function addIncompleteQuiz(req,res){
    try
    {
        const quiz = await IncompleteQuiz.updateOne({$and:[{"User_id":req.body.user_id},
            {"Quiz_id":req.body.quiz_id}]},{$set:{Completed:req.body.completed,Correct:req.body.correct}})
        if(quiz.matchedCount === 0)
        {
            console.log(req.body);
            
            const inc_quiz = await IncompleteQuiz.create({
                "User_id":req.body.user_id,
                "Quiz_id":req.body.quiz_id,
                "Completed":req.body.completed,
                "Correct":req.body.correct
            })
        }
        res.status(200).send("updated successfully")
    }
    catch(err)
    {
        console.log(err);
    }
}

export default {AddQuiz,getQuizes,getQuizQuestion,getAllQuizQuestions,addIncompleteQuiz}