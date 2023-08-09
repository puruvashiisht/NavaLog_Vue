<template>
    <div className="CreateUser">
        <h4>Sign Up </h4>
        <form>
            <div>
                <label for="userId">Your account ID: </label>
                <input type="text" id="userId"  v-model="createUserRequest.userId" /><br>
                <label for="userName">Your name: </label>
                <input type="text" id="userName" v-model="createUserRequest.name" /><br>
                <label for="userEmail">Your email: </label>
                <input type="email" id="userEmail"  v-model="createUserRequest.email" /><br>
                <label for="password">Your password: </label>
                <input type="password" id="userPassword" v-model="createUserRequest.password" /><br>
                <label for="phone">Your phone number: </label>
                <input type="tel" id="userPhone"   v-model="createUserRequest.phone" /><br>
            </div>
        </form> 
        <div class="buttonContainer">
        <button type="submit" @click="createUser"> Create Account </button> <!--cannot be inside the form. Or if inside form add event.prevent default-->
        <p>{{ message }} </p>
        <button type="submit" @click="login">Log in</button> 
    </div>

    </div>
</template>

<script>
import '../App.css';
import UserService from '../services/UserService';

export default {
    name:"createUser",
    //props:["setUserDetail"],
    data(){
        return{
            createUserRequest:{userId:"", name:"", email:"", phone:"", password:""},
            action:"showLoginBtn"
        } //names need to match with that in springboot

    },
    methods:{
        createUser(event){//login() referst to the login in line 16
            event.preventDefault();
            UserService.createUser(this.createUserRequest)
            .then(response => { //response from spring boot
                var user=response.data;
                console.log(user.userEmail);
                this.message=`Welcome ${user.name}! Your account has been successfully created. Please Log in `;   
                this.$router.push({name:"login"}); //force cthe application to stay in the login component
            })
            .catch(error =>{
                this.createUserRequest.userId="";
                this.createUserRequest.name="";
                this.createUserRequest.email="";
                this.createUserRequest.phone="";
                this.createUserRequest.password="";
                console.log(error.response.data);
            })
            // let newUser={
            //     userId: this.userId,
            //     userName:this.userName,
            //     userEmail:this.userEmail,
            //     userPassword:this.userPassword,
            //     userPhone:this.userPhone
            // }
           // this.setUserDetail(newUser); //here the new user will be sent to the parent in app.vue through the setUserDetail method//
        },
        login(){
            this.$router.push({name:"userLogin"});
        }    

    },
    mounted(){

    }
}

</script>



<style>

</style>