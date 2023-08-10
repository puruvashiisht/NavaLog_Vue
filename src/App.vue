<template>
  
  
  <div class="logout">
       <router-link to ="/" @click="logout">Logout</router-link>
        </div>
 
  <div class="container">
    <img alt="NavaLog" src="./assets/NavaLog.png" class="logo">
    
    <router-view/>   
    
    </div> 

    <div class="vessel">
      <h1>Vessel Finder</h1>
      
      <img alt="map" src="./assets/vessellfinder.png" class="VesselFinder">
     
    
    </div>
   
    
<div class="footer">
  <h3>Meet the creators</h3>
  
    <img alt="Logo" src="./assets/creators.png" class="logo" style="overflow-x:auto;">
</div>
    

 
  
</template>

<script>
import './App.css';

export default {
  name: 'App', 
  
}



</script>

<style>
 
</style>
