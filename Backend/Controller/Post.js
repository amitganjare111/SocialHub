const Post = require("../models/Post");
const User = require("../models/User");

//CREATE POST AND SEND CREATED POST'S ID TO USER'S POSTS ARRAY.
exports.createPost = async (req, res) => {

    try{

        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                url:"req.body.url",
            },
            owner:req.user._id
        };

        const newPost = await Post.create(newPostData);
         
        const user = await User.findById(req.user._id);
      
        user.posts.push(newPost._id);

        await user.save();
         
          res.status(201).json({
          success:true,
          message:"post saved",
          newPost
          });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
};

// DELETE POST FROM POST COLLECTION ALSO DELETE POST FROM USER'S POSTS ARRAY
exports.deletePost = async (req, res) => {
    try{

    const post = await Post.findById(req.params.id);
    //console.log(req.params.id)
    
    if(!post){
        return res.status(400).json({
            success:false,
            message:"Post not found"
        })
    }
       
    if(post.owner.toString() !== req.user._id.toString()){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    await post.deleteOne();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1)
    await user.save();

    res.status(200).json({
        success:true,
        message:"Post Deleted"
    })

  }catch(err){
     return res.status(500).json({
        success:false,
        message: err.message
     })
  }
};

//LIKE AND UNLIKE POST
exports.likeAndUnlikePost = async (req, res) => {
    try{
      const post = await Post.findById(req.params.id);
     
      if(!post){
        return res.status(404).json({
            success:false,
            message:"Post Not Found"
        })
      }
 
      if(post.likes.includes(req.user._id)){
        const index = post.likes.indexOf(req.user._id);

        post.likes.splice(index, 1);

        await post.save();
        return res.status(200).json({
            success:true,
            message:"Post Unliked",
        });
      }
      else{

        post.likes.push(req.user._id);

        await post.save();

        return res.status(200).json({
            success:true,
            message:"Post Liked"
        })
      }

    }catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
};

// GET ALL POSTS OF FOLLOWING USER 
exports.getPostOfFollowing = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
       
        // finding post jinko user follow krta hai
        const posts = await Post.find({
           owner: {
             $in: user.following,
           },
        }).populate("owner likes likes.usercomments.user");

        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        });
    }catch(err){
        res.status(400).json({
        success:false,
        message: err.message
      })
    }
};

// ADD COMMENT IN POST
exports.addComment = async (req, res) => {
    try{      
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(400).json({
                status:false,
                message:"Post Not Found"
            })
        }

        post.comments.push({
            user:req.user._id,
            comment:req.body.comment,
        })

        await post.save();
        return res.status(200).json({
            status:true,
            message:"Comment Added"
        })

    }catch(err){
        return res.status(400).json({
            status:false,
            message:err.message
        })
    }
};

//DELETE COMMENT
exports.deleteComment = async (req, res) => {
       try{
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(400).json({
                status:false,
                message:"Post Not Found"
            })
        }

        // IF OWNER WANT TO DELETE
        if(post.owner.toString() === req.user._id.toString()){
            if(req.body.commentId == undefined){
                return res.status(400).json({
                    status:true,
                    message:"comment Id is Required"
                })
            };

            post.comments.forEach((item, index) => {
                if(item._id.toString() === req.body.commentId.toString()){
                    return post.comments.splice(index, 1);
                }
            });
            await post.save();

            return res.status(200).json({
                success:true,
                message:"Selected comment has deleted"
            })

        }else{
            post.comments.forEach((item, index) => {
                if(item.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index, 1)
                }
            })

            await post.save();

            return res.status(200).json({
                success:true,
                message:" Comment deleted"
            })
        }

       }catch(err){
        return res.status(400).json({
            status:false,
            message:"Delete Comment Failed"
        })
       }
};