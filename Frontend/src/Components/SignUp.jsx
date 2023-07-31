import React from 'react'
import {useState} from 'react';
import AllService from '../server/AllService';
import { useNavigate } from "react-router-dom";
import '../Style/SignUp.css';

const SignUp = () => {

  const navigate = useNavigate();
   const [Newuser, setNewUser] =useState({
    email:"", fullname:"", password:"", cpassword:""
 });

let name, value;

 const handleInput = (e) => {
    console.log(e);
    name = e.target.name
    value = e.target.value;
    setNewUser({...Newuser, [name]:value});
 };

 const postData = (e) =>
 {
     e.preventDefault();
     
     AllService.saveUser(Newuser).then((res) => 
     {  

         setNewUser({ email:"", fullname:"", password:"", cpassword:"" });

         navigate('/LogIn'); 
     })
     .catch((err) => 
     {
         alert(err);
     })
 };

 const validate = () => {
  var Name = document.getElementById("validName").value;
  var Email = document.getElementById("validEmail").value;
  var Password = document.getElementById("validPass").value;
  var Cpassword = document.getElementById("validCpass").value;

  if (Name=="")
  {  
      document.getElementById('msg').innerText="Required field cannot blank";
  }
  else
  {
      document.getElementById('msg').innerText="";
  }
 
  if(Email.indexOf("@")<1 && Email.indexOf(".")<1)
  {
      document.getElementById('msg1').innerText="please enter valid email id";
  }
  else if(Email===Newuser.email)
  {
      document.getElementById('msg1').innerText="Email Already Exist";
  }
  else
  {
      document.getElementById('msg1').innerText="";
  }

  if(Password<4)
  {
      document.getElementById('msg2').innerText="Password must be at least 6 characters long.";
  }
  else
  { 
      document.getElementById('msg2').innerText=""; 
  }

  if(Cpassword != Password)
  {
      document.getElementById('msg3').innerText="Password must be same";
  }
  else
  {
      document.getElementById('msg3').innerText="";
  }
 
};


  return (
  <div className="back-image">.

    <div className="container c mt-5 ">
      <div className="row no-gutters mt-4">

        <div className="col-md-4">
          <div className="border">
            <div class="card-body ">

            <div className="signup-img"></div>
            
            <div className="card1  text-center">Already have an account? </div>
              <a className="btn-grad form-control btn-margin2" href="/LogIn"> Sign In </a>

            </div>
          </div>

        </div>

      <div class="col-md-4  ">
        <div class="card h">
          <div class="card-body">
             <div className="signup-label ps-4 mt-4 mb-4">Sign Up</div>
             <form onSubmit={(e) => postData(e)}>
              <div className="form-area ">
                <input type="text" className="form-control input-sm" name="email" value={Newuser.email} onChange={handleInput} placeholder="Email"/>
                 <p style={{color:"red"}}><span id="msg"></span> </p>
                <input type="text" className="form-control mt-3" name="fullname" value={Newuser.fullname} onChange={handleInput} placeholder="Full Name"/>
                <input type="password" className="form-control mt-3" name="password" value={Newuser.password} onChange={handleInput} placeholder="Password"/>
                <input type="password" className="form-control mt-3" name="cpassword" value={Newuser.cpassword} onChange={handleInput} placeholder="Confirm Password"/>
             
                <button type="submit" className="btn-grad form-control mt-5 mb-4"  onClick={validate}>Sign up</button>
               
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
   </div>
   </div>
  )
}

export default SignUp;