import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';

const Register = () => {

    const [register, setRegister] = useState({name:"",email:"",password:"",avatar:""})

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.email;
        setRegister({...register, [name]:value});
    }

    const registerHandler = ()=>{

    }
    
  return (
    <div>
    <form onSubmit={registerHandler}>
       <div className="form-area ps-4 pe-4 mt-5">
         <img src={avatar} />
         <input type="file" accept="image/*" name="avatar" value={register.avatar} onChange={handleInput}/> 
         <input type="text" className="form-control" name="name" value={register.name} onChange={handleInput} placeholder="Email"/>
         <input type="text" className="form-control" name="email" value={register.email} onChange={handleInput} placeholder="Email"/>
         <input type="password" className="form-control mt-3" name="password" value={register.password} onChange={handleInput} placeholder="Password"/>
       </div>
         <button type="submit" className="btn-grad1 form-control mt-4 mb-4">Sign In</button>
         <Link to="/LogIn">Already have Account? Login now</Link>
    </form>
    </div>
  )
}

export default Register;