<template>
    <div className="Login">
        
        
        <h4>Login</h4>
        <form>
            <div>
                <label for="userId">User ID:</label>
                <input type="text" id="userId" v-model="userLoginRequest.userId"/>  
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="userLoginRequest.password"/>
            </div>
           
        </form>
        
        <div class="buttonContainer">
                <button type="submit" @click="login">Login</button> 
                <p>{{ message }}</p> 
                <br>
                <button type="submit" @click="register">Register</button> 
            </div>
       
    </div>
</template>

<script>//it is the logic part
import UserService from '../services/UserService'; //need to use the LoginService so import here
 
export default {
    name: "userLogin", //name of this vue component
    data(){
        return {//return a single json obj.
            //define all data to be used in this component
            userLoginRequest:{userId:"", password:""},  //id and pw is empty at the beginning
            message:""
        }
    },
    methods:{
        //
        login(){//login() referst to the login in line 16
            UserService.loginUser(this.userLoginRequest) //send the whole studentLoginRequest object to this login function of LoginService.js inside surfaces folder
            .then(response => { //response from spring boot
                let user= response.data;
                console.log(user);
                this.message=`Welcome ${user.name} !`;
                localStorage.setItem('uid', user.id);  //auto generated id
                localStorage.setItem('uName', user.name);
                if(user.name==='admin'){
                    this.$router.push({name:"adminPage"});
                }else{
                    this.$router.push({name:"userPage"});
                }
                
            })
            .catch(error =>{
                this.userLoginRequest.userId="";
                this.userLoginRequest.password="";
                this.message= error.response.data.message;
                console.log(error.response.data);
            })
        } ,
        register(){
            this.$router.push({name:"createUser"});
        } 
        
    },
    mounted(){
        // method will be called when you start the component. 
        this.message="";  //this. refers to message:"" inside data()
    }
}
//when submit button is clicked...
//1. values in the two fields are saved in the corresponding properties inside studentLoginRequest obj
//2. send studentLoginRequest obj to the login function of LoginService.js, which sends data as post request to api /login, to srpingboot to do the authentications
//3.spring boot send data back, .then(  )
</script>

<style>
</style>