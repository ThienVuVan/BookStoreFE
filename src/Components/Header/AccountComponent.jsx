import { GetUserById } from '../API/BookStoreApi';
import { useAuth } from '../Sercutiry/AuthContext';
import { useEffect } from 'react';


function AccountComponent() {
    let Auth = useAuth();
    useEffect(() => { retrieveUser() }, []);
    const headers = {
        Authorization: `Bearer ${Auth.token}`,
    }
    let retrieveUser = async () => {
        try {
            let response = await GetUserById(1, headers);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div>

            </div>
        </>
    )
}
export default AccountComponent;