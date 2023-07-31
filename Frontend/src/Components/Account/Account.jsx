import React, { useEffect } from 'react'
import Loader from '../Loader';
import Post from '../Post';
import { getMyPosts } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import Myprofile from './Myprofile';

const Account = () => {

  const dispatch = useDispatch(); 
  const {loading, posts, error} = useSelector((state)=>state.myposts);
  const {user, loading:userLoading} = useSelector((state)=>state.user);

  useEffect(()=>{
     dispatch(getMyPosts());
  },[dispatch]);

  return (
    loading===true || userLoading===true ?(<Loader/>) :(
    <div className="card-body">
      <div>
        {
         posts && posts.length > 0 ? posts.map((post)=>(
            <Post  
                 key={post._id}
              //  postId={post._id}
                caption={post.caption}
                postImage={post.image}
                likes = {post.likes}
                comments ={post.comments}
                ownerId={post.owner}
               // ownerName={post.owner.name} 
               //   ownerImage={post.image.url}
            />
             )) : <h>No Post To Show</h>
        }
      </div>

      <div className="card-body">

       <Myprofile/>
        {/*<img src={user.avatar} /> 
          <h3>UserId  {user._id}</h3>
         <h3>Name  {user.name}</h3> 
         <p>Followers Count  {user.followers.length}</p>
         <p>Following Count  {user.following.length} </p> */}
         </div>

    </div>
  
    )
  )
}

export default Account;