import React from 'react'
import postImg from './Images/nature.jpg'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { AiOutlineHeart, AiFillHeart,AiOutlineAliwangwang,AiFillWechat } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import {likePost} from '../Actions/Post';
import User from './User';
import CommentCard from './CommentCard';
import {getPostsOfFollowing} from '../Actions/User';
import {addComment} from '../Actions/Post';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Post = ({
    postId,caption,postImage,
    likes = [],
    comments = [],
    ownerImage,ownerName,ownerId,
    isDelete = false,
    isAccount = false,}) => {
    
    const [liked, setliked]= useState(false);
    const [open, setOpen] = useState(false);

    const [comment, setComment]= useState("");
     const [commentToggle, setCommentToggle] = useState(false);

    const handleOpen = () => setOpen(!open);
    const handleCommentToggle = ()=> setCommentToggle(!commentToggle)

    const dispatch = useDispatch();

    const handleLike =async () => {
     
      setliked(!liked);
      await dispatch(likePost(postId));
      dispatch(getPostsOfFollowing());
    }

    const handleInput = (e) =>{
      const name = e.target.name
      const value = e.target.value;
      setComment({...comment, [name]:value});
    };

    const AddCommentHandler = (e) =>{
         e.preventDefault();
         dispatch(addComment(postId,comment))
    };

    const {user} = useSelector((state)=>state.user);
  
    useEffect(()=> {
      likes.forEach((item)=>{
        if(item.ObjectId === user){
          setliked(true);
        }
      })
    }, [])

    const handlecomment = () => {
      setComment(!comment);
    }

  return (
    <div className="card mt-3">
            <div className="card-body">
               <div className="circle-row">
                {/*AvatarIMAGE*/}
                <a href="/" src={ownerImage}></a>
               <Link to={`/user/${ownerId}`} ></Link>
               <p>{ownerName}</p>
               </div>
            </div>
            {/*POST IMAGE*/}
            <div> <img src={postImage}/></div>
             
            <p>{caption}</p>
            <p>{postId}{}</p>

            <div className="card-body">
               <div className="">

               <button onClick={handleOpen}>
                   {likes.length}
               </button>
                 
                 <button className="text-2xl m-3" onClick={handleLike}>
                   {liked ? <AiFillHeart style={({color:"red"})}/> : <AiOutlineHeart/> }
                 </button>
            
                 <button className="text-2xl " onClick={handleCommentToggle} >
                    {comment ? <AiFillWechat/> : <AiOutlineAliwangwang/> }
                 </button>
               </div>
            </div>
            
      {/*like Dialog */}  
          <Dialog open={open} handler={handleOpen} className="w-[350px] h-[300px] bg-[red] mx-auto mt-[100px]">
            <DialogHeader>Liked By</DialogHeader>
            <DialogBody>
            {
              likes.map((like)=>(
            <User  
                 // Avatar={like.avatar.url}
                   UserId={like._id}
                   Name={like.name}
            />
              ))
              }
            </DialogBody>
          </Dialog>

      {/*comment Dialog */}  
           <Dialog open={commentToggle} handler={handleCommentToggle} className="w-[350px] h-[300px] bg-[red] mx-auto mt-[100px]">
           <DialogHeader>Liked By</DialogHeader>
           <DialogBody>

             <form onSubmit={AddCommentHandler}>
                <input type="text" name="comment" value={comment.comment} onChange={handleInput} placeholder="Comment Here" required></input>
                <button type="submit"> Post Comment</button>   
             </form>

             {
               comments.length > 0 ? comments.map(comment=>(
                 <CommentCard
                 userId={comment._id}
                 Name={comment.user}
                 //Avatar={comment.user.avatar.url}
                 Comment={comment.comment}
                 CommentId={comment._id}
                 postId={postId}
                 isAccount={isAccount}
                 />))
                 : <h3>No Comment Yet</h3>
                }

           </DialogBody>
         </Dialog>
        
     </div>
  );
};

export default Post;
