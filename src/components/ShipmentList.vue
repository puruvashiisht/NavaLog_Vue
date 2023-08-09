<template>
    <div style="overflow-x:auto;">
            <table class="table" id="MyShipmentsTable" >
                <thead>
                    <tr>
                    <th scope="col">Shipment Name</th>
                    <th scope="col">DepartCountry</th>
                    <!-- <th scope="col">DepartPort</th> -->
                    <th scope="col">DestCountry</th>
                    <!-- <th scope="col">DestPort</th> -->
                    <th scope="col">departDate</th>
                    <th scope="col">arrivalDate</th>
                    <!-- <th scope="col">space</th> -->
                    <!-- <th scope="col">link</th> -->
                    <th scope="col">type</th>
                    <th scope="col" v-if="userName==='admin'">Delete </th>
                    <th scope="col" v-else>DeRegister </th>
                    </tr>
                   
                    
                </thead>
                <tbody v-if="shipments.length">
                    <tr v-for="(e, index) in shipments" :key="index">
                    <td>{{ e.name }} </td>
                    <td>{{ e.departCountry }}</td>
                    <td>{{ e.destCountry }}</td>
                    <td>{{ e.departDate }}</td>
                    <td>{{ e.arrivalDate }}</td>
                    <td>{{ e.type }}</td>
                   
                    <td v-if="btnLabel==='De-Register'"><Button class="delete" :id="e.id" @click="deRegister" >{{ btnLabel }}</Button></td>
                    
                    <td v-if="userName==='admin'" ><Button class="delete" @click="deleteshipment" :id="e.id">Delete</Button></td> 
                    </tr>
                </tbody> 
            </table>
        </div>
        
</template>


<script>
import UserService from '../services/UserService';
import ShipmentService from '../services/ShipmentService';

export default{
    name: "shipmentList", 
    data(){
        return {//return a single json obj.
            userId:"",
            userName:"",
            shipments:[],
            btnLabel:"De-Register",
        }
    },
    methods:{
        deRegister(event){
            event.preventDefault();
            UserService.deregister(event.target.id, this.userId)
                .then(response=>{
                    console.log(response)
                    this.getShipments(this.userId);
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        deleteShipment(event){
            event.preventDefault();
            ShipmentService.deleteShipment(event.target.id)
                .then(response=>{
                    console.log(response);
                    console.log(event.target.id);
                    this.getAll();
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        getShipments(uid){
            UserService.getRegisteredShipments(uid)
                .then(response=>{
                    this.shipments=response.data;
                    console.log(this.shipments);
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        getAll(){
            ShipmentService.getAllShipments()
                .then(response=>{
                    console.log(response.data);
                    this.shipments=response.data;
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    },
    mounted(){
       this.userName=localStorage.getItem('uName');
       if(this.userName==='admin'){
        this.btnLabel="Edit";
        this.getAll();
       }else{
        this.userId=localStorage.getItem('uid');
        console.log(this.userId);
        this.getShipments(this.userId);  
       }
    }
}

</script>


<style>
</style>