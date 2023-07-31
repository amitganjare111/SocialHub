const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Post = require('../models/Post');
const SendEmail = require('../Middlewares/SendEmail');

// USER REGISTRATION
exports.Register = async(req, res) => {

    try{

        const {name, email, password} = req.body;

        let user = await User.findOne({email});
        if(user) {
           return res.status(400).json({success: false, message: "User Already exists"});
        }
        
        user = await User.create({name, email, password, avatar});
        res.status(201).json({success:true, user});

    } catch(err) {
        res.status(500).json({
        success:false,
        message:err.message
    })
  }
};

// USER LOGIN
exports.login = async(req, res) => {

    try{
        
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user)
        {
            res.status(400).json({
                success: false,
                message:"user not exist"
            });
        }

         User.matchPassword = async function (password) {
            return await bcrypt.compare(password,user.password);
        };
        
        const isMatch = await User.matchPassword(password);

        if(!isMatch)
        {
            res.status(400).json({success: false, message:"Password Incorrect"});
        }


        User.generateToken = function() {
            return jwt.sign({_id:user._id}, process.env.JWT_SECRET);
         }

        const Token = await User.generateToken();

        const options = {
            expires : new Date(Date.now()+90*24*60*60*1000),httpOnly:false
        };
       
        res.cookie("token", Token, options).json({success:true, user, Token});
    
    }catch(err) {
        res.status(400).json({
            success:false,
            message:"main"+err.message
        })
    }
};


//FOR LOG OUT
exports.logOut = async (req, res) => {
    try{
        res.status(200).cookie("token", null,{expires:new Date(Date.now()), httpOnly:true})
        .json({
            success:true,
            message: "Logged out",
        });
        
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"User Log Out"
        })
    }
}
//FOR FOLLOW USER  
exports.followUser = async (req, res) => {

    try{

    const userToFollow = await User.findById(req.params.id);
    const logInUser = await User.findById(req.user._id);

   // console.log("loginuser  "+ logInUser)
   // console.log("usertofollow "+userToFollow)
    
    if(!userToFollow){
        return res.status(500).json({
            status:false,
            message:"User Not Found"
        })
    }
      // FOR UNFOLLOW
    if(logInUser.following.includes(userToFollow._id)){

        const indexFollowing = logInUser.following.indexOf(userToFollow._id);
        const indexFollowers = userToFollow.followers.indexOf(logInUser._id);

        logInUser.following.splice(indexFollowing, 1);
        userToFollow.followers.splice(indexFollowers, 1);

        await logInUser.save();
        await userToFollow.save();

        res.status(200).json({
            status: true,
            message:"User Unfollowed"
        })
    }else {

    logInUser.following.push(userToFollow.id);
    userToFollow.followers.push(logInUser._id);

    await logInUser.save();
    await userToFollow.save();

    res.status(200).json({
        status: true,
        message:"User Followed"
    })
   }
  }catch(err){
    return res.status(400).json({
        status:false,
        message: err.message
    })
  }
};

// FOR UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"please provide old and new password"
            })
        };

        const user = await User.findById(req.user._id).select("+password");

        User.matchPassword = async function (oldPassword) {
            return await bcrypt.compare(oldPassword,user.password);
        };
        const isMatch = await User.matchPassword(oldPassword);

        if(!isMatch)
        {
            res.status(400).json({
                success: false, 
                message:"Incorrect Old Password",
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            status:true,
            message:"Password Updated"
        });

    }catch(err){
        return res.status(400).json({
           status:false,
           message: err.message 
        })
    }
};

// FOR UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try{
    const user = await User.findById(req.user._id);

    const {name, email} = req.body;

    if(name){
        user.name = name;
    }
    if(email){
        user.email = email;
    }

    //user avatar:todo

    await user.save();

    res.status(200).json({
        status:true,
        message:"User Updated",
    })

}catch(err){
    res.status(200).json({
        status:false,
        message:"Update Profile Failed",
    })
  }
};

// DELETE PROFILE
exports.deleteProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;

        // Delete All posts of the user
        for(let i = 0; i<posts.length; i++){
            const post = await Post.findById(posts[i]);
            await post.deleteOne();
        }

        //DELETE USER'ID FROM FOLLOWERS FOLLOWING LIST
          for(let i=0; i<followers.length; i++){
            const follower = await User.findById(followers[i]);
            const index = follower.following.indexOf(user._id);
              follower.following.splice(index, 1);
              await follower.save();
         }

         //DELETE USER'ID FROM FOLLOWING's follower LIST
         for(let i=0; i<followers.length; i++){
            const follower = await User.findById(followers[i]);
            const index = follower.followers.indexOf(user._id);
              follower.followers.splice(index, 1);
              await follower.save();
         }

        // Logout user after deleting profile
          res.status(200).cookie("token", null,
          {expires:new Date(Date.now()), httpOnly:true})

          await user.deleteOne();

        res.status(200).json({
            status:true,
            message:"profile deleted"
        });

    }catch(err){
        return res.status(400).json({
            status:false,
            message: err.message
        })
    }
};

// FOR VIEW SELF PROFILE
exports.viewMyProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).populate('posts followers following');

        res.status(200).json({
            success:true,
            message:"User View",
            user
        })

    }catch(err){
        return res.status(400).json({
            status:false,
            message:"Profile View Failed"
        })
    }
};

// FOR VIEW ANOTHER USER PROFILE
exports.viewProfile = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('posts');

        if(!user){
            res.status(400).json({
                status:false,
                message:"USER NOT FOUND"
            })
        }

        res.status(200).json({
            success:true,
            message:"User View",
            user
        })
console.log(user);
    }catch(err  ){
        return res.status(400).json({
            status:false,
            message:"Profile View Failed"
        })
    }
};

//FOR GETTING ALL USERS PROFILE
exports.viewAllProfile = async (req, res) => {
    try{
        const users = await User.find({});

        res.status(200).json({
            success:true,
            message:"User View",
            users
        })

    }catch(err){
        return res.status(400).json({
            status:false,
            message:"Profile View Failed"
        })
    }
};

// FOR VIEW ALL SELF POSTS
exports.viewMyPosts = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).populate('posts');

          const Posts = (user.posts);

        res.status(200).json({
            success:true,
            message:"Posts View",
            Posts
        })

    }catch(err){
        return res.status(400).json({
            status:false,
            message:"MyPosts view failed"+err
        })
    }
};

// FOR FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                status:false,
                message:"user not found"
            })    
        }

        User.getResetPasswordToken = function(){

            const resetToken = crypto.randomBytes(20).toString("hex");
            console.log(resetToken);

            this.resetPasswordToken = crypto.createHash("sha256").update(resetToken);
            this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
             
            return resetToken;
        }

        const resetPasswordToken = User.getResetPasswordToken();

        await user.save();

        const resetURL = `${req.protocol}://${req.get("host")}/reset/password/${resetPasswordToken}`;

        const message = `Reset Your Password by clicling the link below: \n\n ${resetURL}`;

        try{
            await SendEmail({email: user.email, subject:"Reset Password", message});

            res.status(200).json({
                success:true,
                message:`Email Sent to ${user.email}`,
            });
        }catch(err){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            res.status(500).json({
                success:false,
                message:"hhh "+err.message
            })
        }
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"fargot password failed"+err.message
        })
    }
};

exports.resetPassword = async (req, res) => {
    try{
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token);

        const user = await User.findOne({
            resetPasswordToken,
            //resetPasswordToken: {$gt: Date.now()},
        });

        if(!user){
            return res.status(401).json({
                succcess:false,
                message:"Token is invalid or has expired"
            })
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

         res.status(401).json({
            succcess:false,
            message:"Password Updated"
        })
    }catch(err){
        return res.status(400).json({
            status:false,
            message:err.message
        })
    }
};