import React, { useEffect, useState } from 'react'
import{Link} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { loadUser, logOutUser } from '../../Actions/User';
import Loader from '../Loader';
import {
   Button,
   Dialog,
   DialogHeader,
   DialogBody,
   DialogFooter,
 } from "@material-tailwind/react";
 
const Myprofile =  () => {

    const dispatch = useDispatch(); 
    const {user, loading} = useSelector((state)=>state.user);
     console.log(user.followers);

     const [followersToggle, setfollowersToggle] = useState(false);
     const handleFollowers = () => setfollowersToggle(!followersToggle);

     const [followingToggle, setfollowingToggle] = useState(false);
     const handleFollowings = () => setfollowingToggle(!followingToggle);

     const logOutHandler = () =>{
        dispatch(logOutUser());
     }

     useEffect(() => {
      dispatch(loadUser());
   }, []); 

  return (
    loading ? <Loader/> :(
    <div>
       <div className="card-body">
          <h3>UserId  {user?._id}</h3>
          <h3>Name  {user?.name}</h3> 
          <h3>posts  {user?.posts?.length || 0}</h3> 

          <button onClick={handleFollowers}>Followers Count {user?.followers?.length || 0}</button>

          <button onClick={handleFollowings}>Following Count {user?.following?.length || 0} </button>

       </div> 
       <button onClick={logOutHandler}>Logout</button>
       <Link to="/update/profile">Edit Profile</Link>
       <Link to="/update/password">Update Password</Link>
       <button>Delete Profile</button>

        {/*followers Dialog */}  
        <Dialog open={followersToggle} handler={handleFollowers} className="w-[350px] h-[300px] bg-[red] mx-auto mt-[100px]">
        <DialogHeader>Followers</DialogHeader>
        <DialogBody>
        {
          user?.followers?.length > 0 ? user.followers.map((follower)=>(
            
            <div>
  
               UserId={follower._id},
               Name={follower.name},
           </div>
           
          )): <h2>no followwrs</h2>
          }
        </DialogBody>
      </Dialog>
      
       {/*followings Dialog */}  
       <Dialog open={followingToggle} handler={handleFollowings} className="w-[350px] h-[300px] bg-[red] mx-auto mt-[100px]">
       <DialogHeader>Followings</DialogHeader>
       <DialogBody>
       {
         user?.following?.length > 0 ? user.following.map((following)=>(
           
           <div>
 
              UserId={following._id},
              Name={following.name},
          </div>
          
         )): <h2>no followwrs</h2>
         }
       </DialogBody>
     </Dialog>
    </div>
    )
  )
}

export default Myprofile;