import React, { useEffect} from 'react'
import Sidebar from './Sidebar';
import './Home.css';
import Post from './Post';
import Loader from './Loader';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getPostsOfFollowing } from '../Actions/User'; 

const Home1 = () => {

    const dispatch = useDispatch();

    const {loading, posts, error} = useSelector((state)=>state.postReducer);
    const {users} = useSelector ((state)=>state.allUsers);
    const {user} = useSelector((state)=>state.user);
  console.log(user);

    useEffect(() => {
        dispatch(getPostsOfFollowing());
        dispatch(getAllUsers());
      }, [dispatch]);

      
  return (
    loading ? <Loader/> : 
    <div className="main-background">.

       <Sidebar/>
      {
       posts && posts.length > 0 ? posts.map((post)=>(
         <Post  postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes = {post.likes}
                comments ={post.comments}
                ownerId={post.owner._id}
                ownerName={post.owner.name} 
                ownerImage={post.image.url}
         />
         )) : <h>No Post Yet</h>
       }
       
       {
         users && users.length > 0 ? users.map((user)=>(
       <User  
              Avatar={user.avatar.url}
              UserId={user._id}
              Name={user.name}
              Posts={user.posts}
       />
         )): <h2>No User Found</h2>
       }
   </div>
    
  )
};

export default Home1;