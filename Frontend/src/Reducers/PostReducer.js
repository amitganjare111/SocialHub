import {createReducer} from '@reduxjs/toolkit';

const initialState = {};

export const likeReducer = createReducer(initialState,{
    likeRequest:(state)=> {
        state.loading=true
    },
    likeSuccess:(state,action)=> {
        state.loading=false;
        state.message=action.payload;
    },
    likeFailure:(state,action)=> {
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=> {
        state.error=null
    },
    clearMessage:(state)=> {
        state.message=null
    },
});

export const commentReducer = createReducer(initialState,{
    commentRequest:(state)=> {
        state.loading=true
    },
    commentSuccess:(state,action)=> {
        state.loading=false;
        state.message=action.payload;
    },
    commentFailure:(state,action)=> {
        state.loading=false;
        state.error=action.payload;
    },
});

export const deleteCommentReducer = createReducer(initialState,{
    deletecommentRequest:(state)=> {
        state.loading=true
    },
    deletecommentSuccess:(state,action)=> {
        state.loading=false;
        state.message=action.payload;
    },
    deletecommentFailure:(state,action)=> {
        state.loading=false;
        state.error=action.payload;
    },
});


export const myPostsReducer = createReducer(initialState,{
    myPostsRequest:(state)=> {
        state.loading=true
    },
    myPostsSuccess:(state,action)=> {  
        state.loading=false;
        state.posts=action.payload;
    },
    myPostsFailure:(state,action)=> {
        state.loading=false;
         state.error=action.payload;
    },
    clearErrors:(state)=> {
        state.error = null;
    }
});


export const addPostReducer = createReducer(initialState,{
    addPostRequest:(state)=> {
        state.loading=true
    },
    addPostSuccess:(state,action)=> {  
        state.loading=false;
        state.message=action.payload;
    },
    addPostFailure:(state,action)=> {
        state.loading=false;
         state.error=action.payload;
    },
    clearErrors:(state)=> {
        state.error = null;
    }
});