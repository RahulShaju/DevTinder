const express = require("express")

const app = express()

const connectDB = require("./config/database")
const User = require("./models/user")



app.use(express.json());

app.post("/signup",async(req,res)=>{
   
   console.log("req.body",req.body)
    // creating a new instance of the user model
    // const user =new User( {
    //   firstName:req.body.firstName,
    //   lastName:req.body.lastName,
    //   emailId:req.body.emailId,
    //   password:req.body.password,
    //   age:req.body.age,
    //   gender:req.body.gender
    // })
     const user =new User( req.body)

   try {
    const saveData= await user.save()
   console?.log("saved",saveData)

    res.send("user added successfully")
   } catch (error) {
     res.status(400)?.send("error adding user" + error?.message)
   }
   
})


app.get("/user",async(req,res)=>{
    try {
        const userEmail = req.body?.emailId
        const users = await User.findOne({emailId:userEmail})
        if(users?.length===0){
            throw new Error("user not found")
        }
        console?.log("userData",users)
        res.send(users)
    } catch (error) {
        console?.log("error",error)
        res.status(400).send(error.message)
    }
})

app.patch("/user",async(req,res)=>{
    try {
        const userId = req.params?.userId
        const data = req.body

    const allowedUpdates=["firstName","LastName"]

    const isUpdateAllowed = Object.keys(data).every((k)=>allowedUpdates?.includes(k))
        if(!isUpdateAllowed){
            throw new Error("user uodate not allowed")
        }
        const updateUser = await User.findByIdAndUpdate({_id:userId},data,{runValidators:true})
        // updateUser?.save()

        console.log("updated user with id",updateUser)
        res.status(200).send(updateUser)

    } catch (error) {
        console?.log("error",error)
        res.status(400).send(error.message)
    }
})

connectDB()?.then((res)=>{
    console.log("database connection established")
    app.listen(4000,()=>{
    console.log("listening on prot 4000")
})

}).catch((error)=>{
   console.log("database connection wrong")
})








