<template>
    <div  className="SearchShipments">
        <div  className="SearchShipments">
      
            <form Filter="">
                <h3>Filter by</h3>
                <label for="filtDeparturelbl">Search by Departure Country &nbsp;</label>
                <input type="text" v-model="departFilter" placeholder="Search..." />
                        
                <label for="filtDestlbl">Search By Destination Country </label>
                <input type="text" v-model="destFilter" placeholder="Search..." />

                <label for="filtCargolbl">Search By Cargo type </label>
                <input type="text" v-model="cargoFilter" placeholder="Search..." />
                        
                <button class="smallbutton" type="submit" value="Search" @click="handleFilter">Search</button> 
            </form>

            <table class="table" id="MyShipmentsTable">
             <thead>
                 <tr>
                    <th scope="col">Shipment id</th>
                 <th scope="col">Shipment Name</th>
                 <th scope="col">Departure Country</th>
                 <th scope="col">Departure Port</th>
                 <th scope="col">Destination Country</th>
                 <th scope="col">Destination port</th>
                 <th scope="col">Depart Date</th>
                 <th scope="col">Arrival Date</th>
                 <th scope="col">Space Av</th>
                 <th scope="col">Link</th>
                 <th scope="col">Cargo Type</th>
                 <th scope="col">Register</th>
                 </tr>
                </thead>

                <tbody v-if="shipments.length">
                    <tr v-for="(e, index) in shipments" :key="index" >
                        <td >{{ e.id }} </td>
                    <td >{{ e.name }} </td>
                    <td>{{ e.departCountry }}</td>
                    <td>{{ e.departPort }}</td>
                    <td>{{ e.destCountry }}</td>
                    <td>{{ e.destPort }}</td>
                    <td>{{ e.departDate }}</td>
                    <td>{{ e.arrivalDate }}</td>
                    <td>{{ e.space }}</td>
                    <td>{{ e.link }}</td>
                    <td>{{ e.type}}</td>                  
                    <td><Button class="register" @click="register" :id="e.id" >Register</Button></td>
                    </tr>
                </tbody> 
            </table> <br>
            <label>{{ noRecord }}</label>  <!--Add the label part so that if there is matching record -->
            <br>
            <div>
               <Button type="submit" className="smallbutton" @click="goMyShipments">Check My Shipments</Button>
            </div>
        </div>
        <div>
       <router-link to ="/" @click="logout">Logout</router-link>
        </div>
    </div>

</template>

<script>
import UserService from '@/services/UserService';
import '../App.css';


export default{

    name:"searchShipments",
    data(){
        return{
            userId:'',
            uName:"",
            shipments:[],
            unRegisteredShipments:[],
           // area:"",
           // category:"",
          //  ShipmentsFiltered:[],
            noRecord:"",
            cargoFilter:"All",
            departFilter:"All",
            destFilter:"All",
            filteredShipments:[]
        }
    },
    methods:{
       
        register(event){
            event.preventDefault();
            console.log(event.target.id);
            UserService.register(this.userId, parseInt(event.target.id))

                .then(response=>{
                    console.log(response);
                    this.getShipments();
                })
                .catch(error=>{
                    console.log(error);
                })
            this.getShipments();
        },
        goMyShipments(){
            UserService.loginUser(this.uName)
                if(this.uName==='admin'){
                    this.$router.push({name:"adminPage"});
                }else{
                    this.$router.push({name:"userPage"});
                }
        } ,
       
        getShipments(){
            UserService.getUnregisteredShipments(this.userId)
                .then(response=>{
                    this.shipments=response.data;
                    this.unRegisteredShipments=this.shipments;
                    console.log("list of uregistered shipments getting "+ this.shipments);
                })
                .catch(error=>{
                    console.log(error);
                })
        },


        handleFilter(event)
       {
        event.preventDefault();
        console.log(this.departFilter);
        console.log(this.shipments);

        this.shipments.map((a, index) =>{
            console.log("position" + index);
            console.log("element" + a.departCountry);
        });

        this.afterSearchMsg="you are searching shipments in method";
        // this.shipments= UserDataService.getUnregisteredshipments(); or // needs to store everytime this shipments array by original values
       // this.getshipments(); // not using because rerendering the component again and again 

       this.shipments=this.unRegisteredShipments; // Initially stored the shipments in an unRegistered array and then always updating to the shipments 

      
        // filtering the shipments based on area and category
        this.filteredShipments = this.shipments.filter((shipment) => {
           
         // case1: filter if both departcountry and cargo type all   
            if(this.departFilter==="All"&& this.cargoFilter==="All"&&this.destFilter==="All")
            {
               // console.log("print all "+this.shipments);
                return this.shipments;
           
            }
            else if (this.departFilter==="All"&& this.cargoFilter==="All"){
                // console.log(shipment.departCountry)
                // console.log(this.destFilter)

                if(shipment.destCountry.toLowerCase().includes(this.destFilter.toLowerCase())){

                    console.log("MATCHING")
                    return shipment
                }
                else{
                    console.log("NOT MATH+CHING")
                }
            }
        // case2: cargoFilter is all but departFilter is required value  
            else if(this.cargoFilter==="All"&&this.destFilter==="All")
            {   
                // console.log(shipment.departCountry)
                // console.log(this.departFilter)

                if(shipment.departCountry.toLowerCase().includes(this.departFilter.toLowerCase())){

                    console.log("MATCHING")
                    return shipment
                }
                else{
                    console.log("NOT MATH+CHING")
                }
            }
        // case3: cargoFilter is specific but departFilter is all  
            else if(this.cargoFilter==="All")
            {   
                if(shipment.departCountry.toLowerCase().includes(this.departFilter.toLowerCase())&&shipment.destCountry.toLowerCase().includes(this.destFilter.toLowerCase())){

                    console.log("MATCHING")
                    return shipment
                }
                else{
                    console.log("NOT MATH+CHING")
                }
            }
            else if(this.departFilter==="All"&&this.destFilter==="All"){
                if(shipment.type.toLowerCase().includes(this.cargoFilter.toLowerCase())){

                    return shipment
                }
                
            }
        // case4: when area and category set to desired value    
            else
            {
                if(shipment.destCountry.toLowerCase().includes(this.destFilter.toLowerCase())&&shipment.type.toLowerCase().includes(this.cargoFilter.toLowerCase()) && shipment.departCountry.toLowerCase().includes(this.departFilter.toLowerCase())){
                    return shipment
                }
            }
            //look for possible cases 
     });

     // Checks if filteredshipments are there or not if not sets the shipments to null and display msg no shipments
     if(this.filteredShipments.length===0)
     {
     this.shipments=[];
     this.noRecord="There are no shipments of your search"
    // console.log("There are no shipments to display")
     } // there are records in the filteredshipments sets those to the shipments 
     else{
          this.noRecord="";
          //console.log(this.filteredshipments[0].name);
          this.shipments=this.filteredShipments;
          //console.log(this.shipments[0].name);
     }
    },


   

    logout(event){
            event.preventDefault();
            localStorage.removeItem('uid');
            localStorage.removeItem('uName');
            this.$router.push({name:"userLogin"});
        },

    },
    
    mounted(){
        this.userId=localStorage.getItem('uid');
        this.userName=localStorage.getItem('uName');
        
        this.getShipments();

    }

}
/** bro..  */

</script>




<style>

</style>