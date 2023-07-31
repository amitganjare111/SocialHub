import React from 'react'
import { useState } from 'react';

const AddNewPost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const handleImageChange = (e)=> {
        const file = e.target.files[0];
      
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = ()=> {
           setImage=(Reader.result)
        }
    }

    const submitHandler = ()=>{
        
    }

  return (
    <div>
       <div> Add Post </div>
       <form onSubmit={submitHandler}>
         <div>Add New Post</div>
         <input type="file" accept="image/*" onChange={handleImageChange}/>
         <input type="text" placeholder="caption..." value={caption} onChange={(e)=> setCaption(e.target.value)}/>
         <button type="submit"></button>
       </form>
    </div>
  )
}

export default AddNewPost