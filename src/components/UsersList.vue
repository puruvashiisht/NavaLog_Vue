<template>
<div style="overflow-x:auto;">
    
    <table class="table" id="UsersTable">
                <thead>
                    <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Delete</th>
                   
                    </tr>
                </thead>
                <tbody v-if="users.length">
                    <tr v-for="(u, index) in users" :key="index">
                        <td> {{ u.userId }} </td>
                        <td> {{u.name}} </td>
                        <td class="more_space"> {{u.email}}  </td>
                        <td> {{u.phone}} </td>
                        <!-- <td ><Button @click="deleteUser" :id="u.id" onclick="window.location.reload()">Delete</Button></td>  -->
                        <td ><Button @click="deleteUser" :id="u.id" >Delete</Button></td> 

                        
                    </tr>
                </tbody> 
    </table>
              
</div>
</template>

<script>
import '../App.css';
import UserService from '../services/UserService';


export default{
name:"usersList",

    data(){
        return {
            userId:"",
            userName:"",
            users: [],
            
        }
    },
    methods:{
        deleteUser(event){
            event.preventDefault();
            UserService.deleteUser(event.target.id)
                .then(response=>{
                    this.getAllUsers();
                    console.log(response);
                })
                .catch(error=>{
                    console.log(error);
                })
        },

        getAllUsers(){
            UserService.getAllUsers()
                .then(response=>{
                    this.users=response.data.filter(user=>user['name']!="admin");
                    console.log(response.data)
                })
                .catch(error=>{
                    console.log(error);
                })
        }

    },
  
  mounted(){
     
        
        this.getAllUsers();
       
      
    }
}
</script>

<style>
</style>