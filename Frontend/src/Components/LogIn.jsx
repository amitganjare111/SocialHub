import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../Actions/User'
import '../Style/login.css'

const LogIn = () => {
 
  const [log, setLog] =useState({ email:"", password:"" });
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  console.log(user)

  const handleInput = (e) => {
   let name = e.target.name;
   let value = e.target.value;
    setLog({...log, [name]:value});
 };

const loginHandler = (e) =>
{
    e.preventDefault();
   // localStorage.setItem('token', JSON.stringify(token));
    dispatch(loginUser(log));
}

  return (
        <div className="loginback-image">.
           <div className="container c mt-5">
              <div className="row no-gutters mt-4">
                <div className="col-md-4">
                   <div className="border1">
                     <div class="card-body">

                     <div className="signin-img1"></div>
                       <div className="card1  text-center">Don't have an account? </div>
                           <a className="btn-grad1 form-control btn-margin" href="/SignUp"> Sign Up </a>

                     </div>
                   </div>
                </div>

                <div class="col-md-4 ">
                  <div class="car">
                    <div class="card-body h">
                      <div className="login-label ps-4 mt-4 mb-4">Log In</div>
                        <div className="form-area ">

                         <form onSubmit={loginHandler}>
                            <div className="form-area ps-4 pe-4 mt-5">
                              <input type="text" className="form-control" name="email" value={log.email} onChange={handleInput} placeholder="Email"/>
                              <input type="password" className="form-control mt-3" name="password" value={log.password} onChange={handleInput} placeholder="Password"/>
                            </div>
                              <button type="submit" className="btn-grad1 form-control mt-4 mb-4">Sign In</button>
                         </form>
    
                             <div className="line ml-3"></div>
                             <a className="size1" href="/forgotpass">Forgot password</a>
                        </div>
                    </div>
                    
                  </div>
                </div>
            </div>
         </div>
       </div>
  )
}

export default LogIn;