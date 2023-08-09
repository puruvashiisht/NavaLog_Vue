import http from '../http-common';

class UserService{
    loginUser(data){
        return http.post("/login", data)
    }

    createUser(data){//id, email, phone
        return http.post("/users", data)
    }

    getRegisteredShipments(uid){
        return http.get(`/users/${uid}/shipments`)
   }

   deleteRegistration(shipmentId, userId){
        return http.delete(`/registrations/shipments/${shipmentId}/users/${userId}`) //autogenerated id
   }

   getAllUsers(){
        return http.get("/users")
   }

   getUnregisteredShipments(uid){
    return new Promise((resolve, reject)=>{
        this.getRegisteredShipments(uid) 
            .then(response=>{
                const regShipments=response.data;//list of Shipment objects
                console.log(regShipments);
                http.get('/shipments')
                    .then(response=>{
                        const allShipments=response.data;
                        console.log(allShipments);
                        const unRegShipments=allShipments.filter((a)=>!((regShipments.map(r=>r.id)).includes(a.id)));
                        if(unRegShipments){
                            response.data=unRegShipments;
                            resolve(response);
                        }
                    })
                    .catch(error=>{
                        reject(error);
                    });
            })
            .catch(error=>{
                reject(error);
            })
    })

   }

   register(userId, shipmentId){
    //create json object 
    const newReg={
        "user.id":userId,
        "shipment.id":shipmentId
    }
    return http.post('/registrations', newReg)
    }
   deregister(shipmentId, userId){
    return http.delete(`registrations/shipments/${shipmentId}/users/${userId}`)
   }

   deleteUser(userId){
    return http.delete(`/users/${userId}`)
 }
}

export default new UserService();