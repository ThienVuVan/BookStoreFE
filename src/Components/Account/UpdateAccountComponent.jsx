import { GetUserById, UpdateUser } from '../API/BookStoreApi';
import { useEffect } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateAccountComponent() {
    let Navigate = useNavigate();
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
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
                sessionStorage.setItem("username", response.data.username)
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("refreshToken", response.data.refreshToken)
                toast.success("Update Success!")
                Navigate("/account")
            }
            catch (error) {
                toast.error("Update Failed!");
            }
        }
    })

    async function retrieveUser() {
        try {
            let response = await GetUserById(sessionStorage.getItem("userId"), headers);
            formik.setValues({
                id: sessionStorage.getItem("userId"),
                username: response.data.username,
                phoneNumber: response.data.phoneNumber,
                email: response.data.email
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { retrieveUser() }, []);

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>UserName: </label>
                        <input type="text" name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>PhoneNumber: </label>
                        <input type="text" name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit"> Save Update </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateAccountComponent;