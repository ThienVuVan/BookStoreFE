import { GetUserById, GetOrderForUserApi } from '../API/BookStoreApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';
import './Account.scss';

function AccountComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [createShop, setCreateShop] = useState(false);
    let [userData, setUserData] = useState({});
    let [ordersData, setOrdersData] = useState([]);
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    async function retrieveUser() {
        try {
            let response1 = await GetUserById(sessionStorage.getItem("userId"), headers);
            setUserData(response1.data)
            let response2 = await GetOrderForUserApi(sessionStorage.getItem("userId"), headers);
            setOrdersData(response2.data)
            console.log(response2.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { retrieveUser() }, []);

    let handleCreateShop = () => {
        Navigate("/createshop");
        setCreateShop(true);
    }

    let handleUpdateAccont = () => {
        Navigate("/updateaccount")
    }

    return (
        <>
            <div className='account'>
                <div className='info'>
                    <ul>
                        <li>Id : {userData.id}</li>
                        <li>Username:  {userData.username}</li>
                        <li>Email:  {userData.email}</li>
                        <li>Phonenumber:  {userData.phoneNumber}</li>
                    </ul>
                </div>
                <div className='setting'>
                    <div><button onClick={handleUpdateAccont}>Update Account</button></div>
                    <div><button onClick={() => Auth.logout()}>Logout</button></div>
                    {!createShop && !Auth.roles.includes("ROLE_SHOP") && < div > <button onClick={handleCreateShop}>Create Shop</button></div >}
                </div>
            </div>
            <div className='orders'>
                <span className='orders-label'>Your Orders</span>
                {ordersData.map((order) => (
                    <div className='order'>
                        <li>OrderId: {order.id}</li>
                        <li>Order Price: {order.totalPrice}</li>
                        <li>Order Date: {order.date}</li>
                        <li>Order Address: {order.deliveryAddress}</li>
                        <li>Order Status: {order.orderStatus}</li>
                    </div>
                ))

                }
            </div>
        </>

    )
}
export default AccountComponent;