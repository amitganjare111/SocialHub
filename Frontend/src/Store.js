import {configureStore} from '@reduxjs/toolkit'
import {userReducer, PostOfFollowingReducer, allUsersReducer} from './Reducers/UserReducer'
import { likeReducer, myPostsReducer } from './Reducers/PostReducer';

const store = configureStore({
  reducer: {
      user: userReducer,
      postReducer: PostOfFollowingReducer,
      allUsers: allUsersReducer,
      like:likeReducer,
      myposts:myPostsReducer
  }
});

export default store;