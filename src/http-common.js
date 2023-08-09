import axios from "axios";

export default axios.create({
    baseURL:"https://finicky-partner-production.up.railway.app",
    header:{
        "Content-type":"application/json"
    }
})
 