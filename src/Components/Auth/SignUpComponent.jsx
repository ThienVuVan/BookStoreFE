import { useFormik } from "formik";
import * as Yup from "yup";
import { SignupApi } from '../API/BookStoreApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpComponent() {
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
                .min(4, "Must be 4 characters or more"),
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
                let response = await SignupApi(values)
                toast.success("Register Success!")
                navigate("/login")
            } catch (error) {
                toast.warn("Register Failed!")
                console.log(error)
            }
        }
    });

    return (
        <div>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <div>
                    <label> Your name:  </label>
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
                <div>
                    <label> Email address </label>
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
                    <label> Confirm Password </label>
                    <input
                        type="text"
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
                <div>
                    <label> Phone number </label>
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
    );
}

export default SignUpComponent;