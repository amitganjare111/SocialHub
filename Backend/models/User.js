const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'please enter a name'],
    },

    avatar:{
        public_id:String,
        url:String,
    },

    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
        select:false,
    },

    posts:[
       {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
       },
    ],

    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],

    resetPasswordToken:String,
    resetPasswordExpire:Date, 
});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    }
});


module.exports = mongoose.model("User", userSchema);