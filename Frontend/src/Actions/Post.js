import axios from 'axios';

export const likePost = (id) => async (dispatch) => {
    try{
        dispatch({
            type: " likeRequest",
        });

        const {data} = await axios.get(`/post/${id}`);
     
        dispatch({
            type:" likeSuccess",
            payload:data,
            
        });

    }catch(err){
        dispatch({
            type:" likeFailure",
            payload:err.response.data.message
        })
    }
};

export const addComment = (id,comment) => async (dispatch) => {
    try{
        dispatch({
            type: "commentRequest",
        });

        const {data} = await axios.put(`/post/addcomment/${id}`,comment);
    
        dispatch({
            type:"commentSuccess",
            payload:data.message,
            
        });

    }catch(err){
        dispatch({
            type:"commentFailure",
            payload:err,
        }) 
    }
};

export const deleteComment = (id,commentId) => async (dispatch) => {
    try{
        dispatch({
            type: "deletecommentRequest",
        });

        const {data} = await axios.delete(`/post/deletecomment/${id}`,commentId);
    
        dispatch({
            type:"deletecommentSuccess",
            payload:data.message,
            
        });

    }catch(err){
        dispatch({
            type:"deletecommentFailure",
            payload:err,
        }) 
    }
};


export const addPost = (caption,image) => async (dispatch) => {
    try{
        dispatch({
            type: "addPostRequest",
        });

        const {data} = await axios.delete("/post/upload",{caption,image});
    
        dispatch({
            type:"addPostSuccess",
            payload:data.message,     
        });

    }catch(err){
        dispatch({
            type:"addPostFailure",
            payload:err,
        }) 
    }
};