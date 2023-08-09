<template><!--layout -->
    <div className="UserPage">
        <h4>Welcome Admin {{uName}}</h4>
        

       
        
        <div v-if="btnLabel==='Display Shipments'">
            <h3>All Users</h3>
            <users-list ></users-list>
            <p>{{ message }}</p> 
        </div> 
        <div v-else>
            <h3>All Shipments</h3>
            <shipment-list ></shipment-list>
            <p>{{ message }}</p> 
        </div>  

        
        <Button type="submit" @click="refreshList">{{ btnLabel }}</Button>
        <!--value is saved in this v-model property when submitted, which can be used since it was created in data below-->
        
        <div>
           
        </div>
  
    
    </div>
    <br>
    <br>
        <router-link to ="/" @click="logout">Logout</router-link>
         
                       
        
    
</template>

<script>
import ShipmentList from "../components/ShipmentList.vue";
import UsersList from "../components/UsersList.vue";
//import UserService from '@/services/UserService';
export default {
    name: "adminPage", 

    components:{
       ShipmentList,
        UsersList
    },
    data(){
        return {
            btnLabel:"Display Users",
            action:"Display_Shipments"
        }
    },
    methods:{ 
        refreshList(){
            if(this.btnLabel==='Display Users'){
                this.btnLabel='Display Shipments';
                this.action="Display_Shipments"
                                       
            }else{
                this.btnLabel='Display Users';
            
                     

            }
        },
       /*  goHome(){
            UserService.loginUser(this.uName)
                if(this.uName==='admin'){
                    this.$router.push({name:"adminPage"});
                }else{
                    this.$router.push({name:"userPage"});
                }
        }  */
        
    },
    mounted(){
        // method will be called when you start the component. 
        this.uname=localStorage.getItem('uName');
    }
}
//when submit button is clicked...
//1. 
</script>

<style>

.table{
    border: 1px solid #ddd;
    border-radius: 15px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;

}
#MyShipmentsTable td, #MyShipmentsTable th {
 border: black;
 border-color: black;
  padding: 8px;
 
}



#MyShipmentsTable tr:hover {background-color: #ddd;}

#MyShipmentsTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #eccfe3;
  color: rgb(5, 5, 5);
  
}
button{
    border-radius: 5px;
    border: 1px;
}
  
  .delete:hover {
  background-color: #f01414;

}
</style>