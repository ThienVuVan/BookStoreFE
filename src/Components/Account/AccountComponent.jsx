import { GetUserById } from '../API/BookStoreApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';
import './Account.scss';

function AccountComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [createShop, setCreateShop] = useState(false);
    let [userData, setUserData] = useState({});
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    async function retrieveUser() {
        try {
            let response = await GetUserById(sessionStorage.getItem("userId"), headers);
            setUserData(response.data)
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
                list all orders here
            </div>
        </>

    )
}
export default AccountComponent;