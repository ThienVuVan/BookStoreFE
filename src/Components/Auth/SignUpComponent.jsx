import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../Sercutiry/AuthContext';
import { SignupApi, LoginSocialApi } from '../API/BookStoreApi';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../Configuration/FirebaseConfig";
import './Signup.scss';

function SignUpComponent() {
    let Auth = useAuth();
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            phoneNumber: "",
            email: "",
            password: "",
            roles: null
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Required")
                .min(5, "Must be 5 characters or more"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email address"
                ),
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                ),
            confirmedPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            phoneNumber: Yup.string()
                .required("Required")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Must be a valid phone number"
                ),
        }),
        onSubmit: async (values) => {
            try {
                await SignupApi(values)
                toast.success("Register Success!")
                navigate("/login")
            } catch (error) {
                toast.warn("Register Failed!")
                console.log(error)
            }
        }
    });

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


    return (
        <div className="signup">
            <div className="container">
                <div className="local">
                    <form className="infoform" onSubmit={formik.handleSubmit}>
                        <label>UserName</label>
                        <div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Enter your username"
                            />
                            {formik.errors.username && (
                                <p className="errorMsg"> {formik.errors.username} </p>
                            )}
                        </div>
                        <label>Email address</label>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter your email"
                            />
                            {formik.errors.email && (
                                <p className="errorMsg"> {formik.errors.email} </p>
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
                        <label>Confirm Password</label>
                        <div>
                            <input
                                type="password"
                                id="confirmedPassword"
                                name="confirmedPassword"
                                value={formik.values.confirmedPassword}
                                onChange={formik.handleChange}
                                placeholder="Confirm your password"
                            />
                            {formik.errors.confirmedPassword && (
                                <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
                            )}
                        </div>
                        <label>Phone number</label>
                        <div>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                placeholder="Enter your phone numbers"
                            />
                            {formik.errors.phoneNumber && (
                                <p className="errorMsg"> {formik.errors.phoneNumber} </p>
                            )}
                        </div>
                        <div>
                            <button type="submit"> Signup </button>
                        </div>
                    </form>
                </div>
                <div className="google">
                    <button onClick={handleGoogleSignin}>
                        Sign in with Google
                    </button>
                </div>
                <div className="facebook">
                    <button onClick={handleFacebookSignin}>
                        Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUpComponent;