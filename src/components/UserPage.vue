<template><!--layout -->
    <div className="UserPage">
        <h4>Welcome {{uName}}</h4>
        <div>
            <h3>My Shipments</h3>
                <shipment-list></shipment-list>
            <button type="submit" @click="lookForShipment">Look for a Shipment</button>
            <button type="submit" @click="addShipment">Host a Shipment</button>
        </div>
        <div>
       
    </div>
    
    </div>

    <br><br>
    <router-link to ="/" @click="logout">Logout</router-link>

</template>

<script>
import ShipmentList from '../components/ShipmentList.vue';

export default {
    name: "userPage", 
    components:{
        ShipmentList
    },
    data(){
        return {
            uName:"",
            userId:""
        }
    },
    methods:{
        lookForShipment(){
            this.$router.push({name:"searchShipments"});
        },
        addShipment(){
            this.$router.push({name:"createShipment"}); //jumps to CreateShipment page
        },
        logout(event){
            event.preventDefault();
            localStorage.removeItem('uid');
            localStorage.removeItem('uName');
            this.$router.push({name:"userLogin"});
        },        
    },
    mounted(){
        this.uName=localStorage.getItem('uName');
        this.userId=localStorage.getItem('uid');
    }
}

</script>

<style>

</style>