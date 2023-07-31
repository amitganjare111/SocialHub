import React from 'react'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../Actions/Post';
import {getPostsOfFollowing} from '../Actions/User';

const CommentCard = ({userId,Name,Avatar,Comment,CommentId,postId,isAccount}) => {

   const dispatch = useDispatch();
   const {user} = useSelector((state)=>state.user);

   const deleteCommentHandler = async (e) => {
      e.preventDefault();
     await dispatch(deleteComment(postId,CommentId))
     
      if(isAccount) {
         console.log("mypost")
      }else{
         dispatch(getPostsOfFollowing())
      }
   }

  return (
    <div>
       <Link to={`/user/${userId}`}>
          <img src={Avatar} alt={Name}/>
          <h3>{Name}</h3>
       </Link>
          <p>{postId}</p>
          <p>{Comment}</p>
          <p>{CommentId}</p>
       {/*   {
            isAccount ? <button onClick={deleteCommentHandler}>Delete</button>
            : userId===user ?  <button onClick={deleteCommentHandler}>Delete</button>
            : null 
         } */}
         <button onClick={deleteCommentHandler}>Delete</button>
      
    </div>
  );
};

export default CommentCard; 