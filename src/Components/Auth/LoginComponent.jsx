import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from '../Sercutiry/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginApi, LoginSocialApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../Configuration/FirebaseConfig";
import './Login.scss';



function LoginComponent() {
    let Auth = useAuth();
    let navigate = useNavigate();

    // login local
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
                Auth.setRoles(response.data.roles);
                sessionStorage.setItem("isAuthenticated", JSON.stringify(true))
                sessionStorage.setItem("roles", JSON.stringify(response.data.roles))
                sessionStorage.setItem("userId", response.data.id);
                sessionStorage.setItem("username", response.data.username)
                sessionStorage.setItem("token", response.data.token)
                sessionStorage.setItem("refreshToken", response.data.refreshToken)
                toast.success("Login Success")
                navigate("/home")
            } catch (error) {
                toast.error("Login Failed")
                console.log(error)
            }
        }
    })

    // login google
    const handleGoogleSignin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (response) => {
                var decoded = jwt_decode(response.user.accessToken);
                try {
                    let response = await LoginSocialApi({
                        username: decoded.user_id,
                        email: decoded.email,
                        socialId: decoded.user_id,
                        type: "0"
                    })
                    Auth.setAuthenticated(true)
                    Auth.setRoles(response.data.roles);
                    sessionStorage.setItem("isAuthenticated", JSON.stringify(true))
                    sessionStorage.setItem("roles", JSON.stringify(response.data.roles))
                    sessionStorage.setItem("userId", response.data.id);
                    sessionStorage.setItem("username", response.data.username)
                    sessionStorage.setItem("token", response.data.token)
                    sessionStorage.setItem("refreshToken", response.data.refreshToken)
                    toast.success("Login Success")
                    navigate("/home")
                }
                catch (error) {
                    toast.error("Login Failed")
                    console.log(error)
                }
            })
            .catch((error) => console.log(error))
    }

    // login facebook;
    const handleFacebookSignin = () => {
        signInWithPopup(auth, facebookProvider)
            .then(async (response) => {
                var decoded = jwt_decode(response.user.accessToken);
                try {
                    let response = await LoginSocialApi({
                        username: decoded.user_id,
                        email: decoded.email,
                        socialId: decoded.user_id,
                        type: "1"
                    })
                    Auth.setAuthenticated(true)
                    Auth.setRoles(response.data.roles);
                    sessionStorage.setItem("isAuthenticated", JSON.stringify(true))
                    sessionStorage.setItem("roles", JSON.stringify(response.data.roles))
                    sessionStorage.setItem("userId", response.data.id);
                    sessionStorage.setItem("username", response.data.username)
                    sessionStorage.setItem("token", response.data.token)
                    sessionStorage.setItem("refreshToken", response.data.refreshToken)
                    toast.success("Login Success")
                    navigate("/home")
                }
                catch (error) {
                    toast.error("Login Failed")
                    console.log(error)
                }
            })
            .catch((error) => console.log(error))
    }

    // login github

    return (
        <div className="container">
            <div className="login">
                <div className="local">
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <label>UserName</label>
                        <div>
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
                        <label>Password</label>
                        <div>
                            <input
                                type="password"
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
                            <button className="button" type="submit"> Login </button>
                        </div>
                    </form>
                </div>
                <div className="google">
                    <button onClick={handleGoogleSignin}>
                        Login with Google
                    </button>
                </div>
                <div className="facebook">
                    <button onClick={handleFacebookSignin}>
                        Login with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;