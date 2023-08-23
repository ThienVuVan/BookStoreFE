import { GetUserById, UpdateUser, LoginApi } from '../API/BookStoreApi';
import { useAuth } from '../Sercutiry/AuthContext';
import { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';


function AccountComponent() {
    let Auth = useAuth();
    let [update, setUpdate] = useState(false);
    let [userData, setUserData] = useState({});
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Auth.token}`
    }

    let formik = useFormik({
        initialValues: {
            id: "",
            username: "",
            phoneNumber: "",
            email: ""
        },
        validationSchema: Yup.object({
            // username: Yup.string().required("Required"),
            // phoneNumber: Yup.string().required("Required"),
            // email: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                let response = await UpdateUser(values, headers);
                Auth.setUsername(response.data.username)
                Auth.setToken(response.data.token)
                Auth.setRefreshToken(response.data.refreshToken)
                setUpdate(false);
                toast.success("Update Success!");
            }
            catch (error) {
                toast.error("Update Failed!");
            }
        }
    })

    async function retrieveUser() {
        try {
            let response = await GetUserById(Auth.id, headers);
            setUserData(response.data)
            formik.setValues({
                id: response.data.id,
                username: response.data.username,
                phoneNumber: response.data.phoneNumber,
                email: response.data.email
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { retrieveUser() }, [Auth.token]);


    let handleUpdate = () => {
        setUpdate(true);
    }

    return (
        <>
            <div>
                <div>Id : {userData.id}</div>
                <div> Username:  {userData.username}</div>
                <div> Email:  {userData.email}</div>
                <div> Phonenumber:  {userData.phoneNumber}</div>
            </div>
            {update &&
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label>UserName: </label>
                            <input type="text" name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder={userData.username}
                            />
                        </div>
                        <div>
                            <label>Email: </label>
                            <input type="text" name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder={userData.email}
                            />
                        </div>
                        <div>
                            <label>PhoneNumber: </label>
                            <input type="text" name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                placeholder={userData.phoneNumber}
                            />
                        </div>
                        <div>
                            <button type="submit"> Save Update </button>
                        </div>
                    </form>
                </div>
            }
            {!update && <div><button onClick={handleUpdate}>Update User</button></div>}
        </>
    )
}
export default AccountComponent;