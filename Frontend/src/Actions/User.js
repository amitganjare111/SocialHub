import axios from 'axios';
const API_URL = "http://localhost:4040";

export const registerUser = (log) => async (dispatch) => {
    try{
        dispatch({
            type: "LoginRequest"
        });

        const {data} = await axios.post("/register",register,{
            headers:{"Content-Type":"application/json"}
        }) 
        
        // FOR LOCAL STORAGE TOKEN
        localStorage.setItem('token', JSON.stringify(data.Token));

        dispatch({
            type:"registerSuccess",
            payload:data.user,
        });
    }catch(err){
        dispatch({
            type:"registerFailure",
            payload:err,
        })
    }
};


export const loginUser = (log) => async (dispatch) => {
    try{
        dispatch({
            type: "LoginRequest"
        });

        const {data} = await axios.post("/login",log,{
            headers:{"Content-Type":"application/json"}
        }) 
        
        // FOR LOCAL STORAGE TOKEN
        localStorage.setItem('token', JSON.stringify(data.Token));

        dispatch({
            type:"loginSuccess",
            payload:data.user,
        });

    }catch(err){
        dispatch({
            type:"loginFailure",
            payload:err,
        })
    }
};


export const loadUser = () => async (dispatch) => {
    try{
        dispatch({
            type: " loadUserRequest",
        });

        const {data} = await axios.get("/view/myprofile",{
            headers:{"Content-Type":"application/json"}
        });
     
        dispatch({
            type:"loadUserSuccess",
            payload:data.user,
            
        });
       
    }catch(err){
        dispatch({
            type:" loadUserFailure",
            payload:"load user "+err.response.data.message
        })
    }
};

// FOR FETCHING ALL POSTS OF FOLLOWING USER
export const getPostsOfFollowing = () => async (dispatch) => {
    try{
        dispatch({
            type: "postOfFollowingRequest",
        });

        const {data} = await axios.get("/posts");

        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts,
        });

    }catch(err){
        dispatch({
            type:"postOfFollowingFailure",
            payload:err.response.data.message
        })
    }
};

// FOR LOGOUT USER
export const logOutUser = () => async (dispatch) => {
    try{
        dispatch({
            type: "logOutUserRequest",
        });

        const {data} = await axios.get("/logout");

        dispatch({
            type:"logOutUserSuccess",
        });

    }catch(err){
        dispatch({
            type:"logOutUserFailure",
            payload:err.response.data.message
        })
    }
};

export const getMyPosts = () => async (dispatch) => {
    try{
        dispatch({
            type: "myPostsRequest",
        });

        const {data} = await axios.get("/view/myPosts");

        dispatch({
            type:"myPostsSuccess",
            payload:data.Posts,
        });

    }catch(err){
        dispatch({
            type:"myPostsFailure",
            payload:err.response.data.message
        })
    }
};

// FOR GETTING ALL USERS
export const getAllUsers = () => async (dispatch) => {
    try{
        dispatch({
            type: "allUsersRequest",
        });

        const {data} = await axios.get("/view/allprofile");

        dispatch({
            type:"allUsersSuccess",
            payload:data.users,
        });
     
    }catch(err){
        dispatch({
            type:"allUsersFailure",
            payload:err.response.data.message
        })
    }
};
