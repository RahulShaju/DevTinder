const mongoose = require("mongoose")
const validator = require("validator")

const {Schema} = mongoose

const userSchema = new Schema({
   
    firstName:{
        type:String,
        required:true
    },
   lastName:{
        type:String,
        required:true
    },
   emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate:{
        validator:function(value){
            return validator.isEmail(value)
        },
        message:"Enter Valid Email"
    }
   
},
  password:{
        type:String,
        required:true
    },
   age:{
        type:Number,
        required:true
    },
   gender:{
    type:String,
    required:true,
    //validate method is onl called first creation not on updating the data
validate(value){
    if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid")
    }
}
  },
  skills:{type:[String]},
  photoUrl:{
    type:String,
    validate:{
    validator:function(value){
        return validator.isURL(value)
    },
    message:"Invalid Url"
    
  }
  

  }
  
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User