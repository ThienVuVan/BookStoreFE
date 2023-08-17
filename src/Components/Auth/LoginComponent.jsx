import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from '../Sercutiry/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";


function LoginComponent() {
    let Auth = useAuth();
    let navigate = useNavigate();

    let formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                let response = await LoginApi(values)
                Auth.setAuthenticated(true)
                Auth.setUsername(response.data.username)
                Auth.setToken(response.data.token)
                Auth.setRefreshToken(response.data.refreshToken)
                toast.success("Login Success")
                navigate("/home")
                console.log(response)
            } catch (error) {
                toast.success("Login Failed")
                console.log(error)
            }
        }
    })

    return (
        <div>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <div>
                    <label>UserName: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        placeholder="Enter your username"
                    />
                    {formik.errors.username && (
                        <p className="errorMsg"> {formik.errors.username} </p>
                    )}
                </div>
                <div>
                    <label> Password </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter your password"
                    />
                    {formik.errors.password && (
                        <p className="errorMsg"> {formik.errors.password} </p>
                    )}
                </div>
                <div>
                    <button type="submit"> Login </button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;