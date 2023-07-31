import {createReducer} from '@reduxjs/toolkit';

const initialState = {user: JSON.parse(localStorage.getItem('token') || '{}')};

export const userReducer = createReducer(initialState, {

// FOR  REGISTER REQUEST
   registerRequest: (state,action) => {
       state.loading = true;
   },
   registerSuccess: (state,action) => {
       state.loading = false;
       state.user = action.payload;
   },
   registerFailure: (state,action) => {
       state.loading = false;
       state.error = action.payload;
   },


// FOR LOGIN USER 
   loginRequest: (state) => {
       state.loading = true;
       
   },
   loginSuccess: (state,action) => {
       state.loading = false;
       state.user = action.payload;
       state.isAuthenticated= true;
   },
   loginFailure: (state,action) => {
       state.loading = false;
       state.error = action.payload;
      
   },

   // FOR LOAD USER 
   loadUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated= true;
   },
   loadUserSuccess: (state,action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated= true;
   },
   loadUserFailure: (state,action) => {
       state.loading = false;
       state.error = action.payload;
       state.isAuthenticated= false;
   },

    // FOR LOGOUT USER 
    logOutUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated= true;
   },
   logOutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated= false;
   },
   logOutUserFailure: (state,action) => {
       state.loading = false;
       state.error = action.payload;
       state.isAuthenticated= false;
   },
   clearErrors: (state) => {
       state.error = null;
   }

})

export const PostOfFollowingReducer = createReducer(initialState,{
    postOfFollowingRequest:(state) => {
        state.loading = true;
    },

    postOfFollowingSuccess:(state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },

    postOfFollowingFailure:(state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
});


export const allUsersReducer = createReducer(initialState,{
    allUsersRequest:(state) => {
        state.loading = true;
    },

    allUsersSuccess:(state, action) => {
        state.loading = false;
        state.users = action.payload;
    },

    allUsersFailure:(state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})