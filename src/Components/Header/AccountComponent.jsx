import { GetUserById } from '../API/BookStoreApi';
import { useAuth } from '../Sercutiry/AuthContext';
import { useEffect } from 'react';


function AccountComponent() {
    let Auth = useAuth();
    const headers = {
        Authorization: `BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGllbnZ1IiwiaWF0IjoxNjkyMjQyNjYzLCJleHAiOjE2OTMxMDY2NjN9.40VF9mM-mc9xRjg4Ue5ZEhgpv3uLibFNuUAFVSqNYSk`,
    }
    let retrieveUser = async () => {
        try {
            let response = await GetUserById(1, headers);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { retrieveUser() }, []);
    return (
        <>
            <div>

            </div>
        </>
    )
}
export default AccountComponent;