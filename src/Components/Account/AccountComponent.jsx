import { GetUserById } from '../API/BookStoreApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';

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
            <div>
                <div>Id : {userData.id}</div>
                <div> Username:  {userData.username}</div>
                <div> Email:  {userData.email}</div>
                <div> Phonenumber:  {userData.phoneNumber}</div>
            </div>
            <div><button onClick={handleUpdateAccont}>Update Account</button></div>
            {!createShop && !Auth.roles.includes("ROLE_SHOP") && < div > <button onClick={handleCreateShop}>Create Shop</button></div >}

        </>
    )
}
export default AccountComponent;