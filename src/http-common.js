import axios from "axios";

export default axios.create({
    baseURL:"https://finicky-partner-production.up.railway.app/api",
    header:{
        "Content-type":"application/json"
    }
})
 
