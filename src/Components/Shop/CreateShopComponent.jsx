import { useAuth } from '../Sercutiry/AuthContext';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { CreateShopApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import './createshop.scss';

function CreateShopComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let formik = useFormik({
        initialValues: {
            userId: sessionStorage.getItem("userId"),
            shopName: "",
            shopAddress: "",
            contactPhone: "",
            contactEmail: "",
            description: "",
            operationHours: "",
            shippingPolicy: "",
            returnPolicy: "",
            shopLogo: null,
        },
        validationSchema: Yup.object({
            shopName: Yup.string().required("Required").min(2, "Must be 2 characters or more"),
            shopLogo: Yup.string().required("Required"),
            shopAddress: Yup.string().required("Required"),
            contactEmail: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email address"
                ),
            contactPhone: Yup.string()
                .required("Required")
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    "Must be a valid phone number"
                ),
        }),
        onSubmit: async (values) => {
            try {
                let response = await CreateShopApi(values, headers)
                Auth.setRoles(response.data)
                sessionStorage.setItem("roles", JSON.stringify(response.data))
                toast.success("Create Shop Success!")
                Navigate("/shop")
            } catch (error) {
                toast.error("Create Shop Failed!")
                console.log(error)
            }
        }
    })
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        formik.setFieldValue('shopLogo', selectedFile); // Sử dụng setFieldValue để cập nhật giá trị trong formik
    };
    return (
        <div className='createshop'>
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className='shop-info'>
                    <table>
                        <tr>
                            <td>ShopName:</td>
                            <td>
                                <input type="text" name="shopName"
                                    value={formik.values.shopName}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your shopName"
                                />
                                {formik.errors.shopName && (
                                    <p className="errorMsg"> {formik.errors.shopName} </p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>shopLogo: <br />(less than 5mb)</td>
                            <td>
                                <input type="file" name="shopLogo" accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {formik.errors.shopLogo && (
                                    <p className="errorMsg"> {formik.errors.shopLogo} </p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>ShopAddress:</td>
                            <td>
                                <input type="text" name="shopAddress"
                                    value={formik.values.shopAddress}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your shopAddress"
                                />
                                {formik.errors.shopAddress && (
                                    <p className="errorMsg"> {formik.errors.shopAddress} </p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>ContactPhone:</td>
                            <td>
                                <input type="text" name="contactPhone"
                                    value={formik.values.contactPhone}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your contactPhone"
                                />
                                {formik.errors.contactPhone && (
                                    <p className="errorMsg"> {formik.errors.contactPhone} </p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>ContactEmail:</td>
                            <td>
                                <input type="text" name="contactEmail"
                                    value={formik.values.contactEmail}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your contactEmail"
                                />
                                {formik.errors.contactEmail && (
                                    <p className="errorMsg"> {formik.errors.contactEmail} </p>
                                )}
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='shopdetail-info'>
                    <table>
                        <tr>
                            <td>Description:</td>
                            <td>
                                <input type="text" name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your description"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>OperationHours:</td>
                            <td>
                                <input type="text" name="operationHours"
                                    value={formik.values.operationHours}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your operationHours"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ShippingPolicy:</td>
                            <td>
                                <input type="text" name="shippingPolicy"
                                    value={formik.values.shippingPolicy}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your shippingPolicy"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ReturnPolicy:</td>
                            <td>
                                <input type="text" name="returnPolicy"
                                    value={formik.values.returnPolicy}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your returnPolicy"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='setting'>
                    <button type="submit"> Create </button>
                </div>
            </form>
        </div>
    )
}

export default CreateShopComponent;