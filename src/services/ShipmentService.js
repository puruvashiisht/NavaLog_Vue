import http from '../http-common';

class ShipmentService{
   getAllShipments(){
        return http.get('/shipments')
    }

    
    createHopperShipment(data){//id, email, phone
      console.log("Shipment Create:");
      console.log(data);
      return http.post("/shipments", data)
  }
    deleteShipment(shipmentId){
       return http.delete(`/shipments/${shipmentId}`)
    }
   
}

export default new ShipmentService();