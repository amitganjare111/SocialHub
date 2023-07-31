import './App.css';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react';
import {loadUser} from './Actions/User';
import Home1 from './Components/Home1';
import Post from './Components/Post';
import Account from './Components/Account';
import AddNewPost from './Components/Post/AddNewPost';

function App() {
  const dispatch = useDispatch();

 useEffect(() => {
     dispatch(loadUser());
  }, []); 

  return (
          <>
          <Routes>
          <Route path="/AddNewPost" element={<AddNewPost/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/Post" element={<Post/>}></Route>
          <Route path="/Home1" element={<Home1/>}></Route>
          <Route path="/LogIn" element={<LogIn/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}> </Route>
          </Routes>
          </>
          )
}

export default App;
