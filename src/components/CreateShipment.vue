<template>
    <div className="CreateShipment">

        <h4>Create Shipment </h4>
        <form>
            <div>
                <label for="shipmentNameLabel">Shipment's Name. </label>
                <input type="int" id="ShipmentName" v-model="createShipmentRequest.name" /><br>

                <label for="depCountryLabel">DepartCountry: </label>
                <input type="text" id="DepartCountry" v-model="createShipmentRequest.departCountry" /><br>

                <label for="depPortLabel">DepartPort: </label>
                <input type="text" id="DepartPort" v-model="createShipmentRequest.departPort" /><br>

                <label for="destCountrynLabel">DestCountry: </label>
                <input type="text" id="DestCountry" v-model="createShipmentRequest.destCountry" /><br>

                <label for="destPortLabel">DestPort: </label>
                <input type="text" id="DestPort" v-model="createShipmentRequest.destPort" /><br>

                <label for="StartDatelbl">Depart Date: </label>
                <input type="date" id="startdate" v-model="createShipmentRequest.departDate" /><br>

                <label for="EstimatedDatelbl">Arrival Date: </label>
                <input type="date" id="estimateDate" v-model="createShipmentRequest.arrivalDate" /><br>                                  
                
                <label for="spaceLabel">Available # of sqare meters</label>
                <input type="int" id="space" v-model="createShipmentRequest.space" /><br>


                <label for="linkLabel">Link to the official site: </label>
                <input type="text" id="companyLink" v-model="createShipmentRequest.link" /><br>

                <label for="cargoTypeLabel">Cargo type: </label>
                <select class="appDropDowns" name="areasDropDown" id="type"  v-model="createShipmentRequest.type" ><br>
                    <option value="BulkDry">Bulk Dry</option>
                    <option value="BulkLiquid">Bulk Liquid</option>
                    <option value="Container">Container</option>
                    <option value="RefrigeratedCargo">Refrigerated cargo</option>
                    <option value="Roll-on/roll-offcargo">Roll-on/roll-off cargo</option>
                    </select>
            </div>
        </form> 
        <button type="submit" @click="createHopperShipment" > Create Shipment </button> <!--cannot be inside the form. Or if inside form add event.prevent default-->
        <p>{{ message }}</p>
        <br><br>
        <button class="smallbutton" type="submit" @click="goToShipments" > Show shipments </button> 
    </div>
    
    <div>
        <br><br>

        <router-link to ="/" @click="logout">Logout</router-link>
    </div>
</template>

<script>
import '../App.css';
import ShipmentService from '../services/ShipmentService';
//import UserService from '@/services/UserService';


export default {
    name:"createShipment",
    data(){
        return{
            createShipmentRequest:{name:"", departCountry:"", departPort:"", destCountry:"", destPort:"", departDate:"", arrivalDate:"", space:"", link:"", type :""},
            
            message: "",
            
        }

    },
    methods:{

       /*  onChangeHost(event){
            this.createShipmentRequest.hosts = event.target.value.split(",");
        }, */

        createHopperShipment(event){//login() referst to the login in line 16
            event.preventDefault();
            ShipmentService.createHopperShipment(this.createShipmentRequest)
            .then(response => { //response from spring boot
                var hopperShipment=response.data;
                console.log(hopperShipment.name);
                this.message =`Shipment ${hopperShipment.name} was successfully created!`;
               console.log(event.target.id);
             /*UserService.register(this.userId, parseInt(Shipment.target.id))
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error);
                })
            this.getEvents(); */
                
               
            })
            .catch(error =>{
                this.createShipmentRequest.name="";
                this.createShipmentRequest.departCountry="";
                this.createShipmentRequest.departPort="";
                this.createShipmentRequest.destCountry="";
                this.createShipmentRequest.destPort="";
                this.createShipmentRequest.departDate="";
                this.createShipmentRequest.arrivalDate="";
                this.createShipmentRequest.space="";
                this.createShipmentRequest.link="";
                this.createShipmentRequest.type="";

                console.log(error);
            })
        },
        logout(event){
            event.preventDefault();
            localStorage.removeItem('uid');
            localStorage.removeItem('uName');
            this.$router.push({name:"userLogin"});
        },   
        goToShipments(event){
             event.preventDefault();
            this.$router.push({name:"searchShipments"}); //force 
        } 

    },
    mounted(){
        
    }
}

</script>



<style>

</style>