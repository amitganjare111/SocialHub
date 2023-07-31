import axios from "axios"
const API_URL = "http://localhost:4040";

class AllService{
 
    saveUser(Newuser)
    {
        return axios.post(API_URL+"/register",Newuser)
    }

    login(log)
    {
        return axios.post(API_URL+"/login",log)
    }

    getAllUser()
    {
        return axios.get(API_URL+"/dash")
    }
}

export default new AllService;