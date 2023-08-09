import { createWebHashHistory, createRouter} from "vue-router";
import CreateUser from '../components/CreateUser.vue';
import UserLogin from '../components/UserLogin.vue';
import UserPage from '../components/UserPage.vue';
import CreateShipment from '../components/CreateShipment.vue';
import AdminPage from '../components/AdminPage.vue';
import ShipmentList from '../components/ShipmentList.vue';
import SearchShipments from '../components/SearchShipments.vue';
import UsersList from '../components/UsersList.vue';

const routes=[
    {
        path:"/",
        alias:"/login",
        name:"userLogin",
        component:UserLogin
    },
    {
        path:"/users",
        name:"createUser",
        component:CreateUser
    },
    {
        path:"/usersPage",
        name:"userPage",
        component:UserPage
    },
    {
        path:"/shipments",
        name:"createShipment",
        component:CreateShipment
    },
    {
        path:"/admin",
        name:"adminPage",
        component:AdminPage
    },
    {
        path:"/shipmentsList",
        name:"shipmentsList",
        component:ShipmentList
    },
    {
        path:"/searchShipments",
        name:"searchShipments",
        component:SearchShipments
    },
    {
        path:"/usersList",
        name:"usersList",
        component:UsersList
    },
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;