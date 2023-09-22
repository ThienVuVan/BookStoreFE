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
            shopName: Yup.string().required("Required"),
            shopLogo: Yup.string().required("Required"),
            contactPhone: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                let response = await CreateShopApi(values, headers)
                Auth.setRoles(response.data)
                localStorage.setItem("roles", JSON.stringify(response.data))
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
                    <div>
                        <label>ShopName: </label>
                        <input type="text" name="shopName"
                            value={formik.values.shopName}
                            onChange={formik.handleChange}
                            placeholder="Enter your shopName"
                        />
                        {formik.errors.username && (
                            <p className="errorMsg"> {formik.errors.username} </p>
                        )}
                    </div>
                    <div>
                        <label>shopLogo: </label>
                        <input type="file" name="shopLogo" accept="image/*"
                            onChange={handleImageChange}
                        />
                        {formik.errors.shopLogo && (
                            <p className="errorMsg"> {formik.errors.shopLogo} </p>
                        )}
                    </div>
                    <div>
                        <label>ShopAddress: </label>
                        <input type="text" name="shopAddress"
                            value={formik.values.shopAddress}
                            onChange={formik.handleChange}
                            placeholder="Enter your shopAddress"
                        />
                        {formik.errors.shopAddress && (
                            <p className="errorMsg"> {formik.errors.shopAddress} </p>
                        )}
                    </div>
                    <div>
                        <label>ContactPhone: </label>
                        <input type="text" name="contactPhone"
                            value={formik.values.contactPhone}
                            onChange={formik.handleChange}
                            placeholder="Enter your contactPhone"
                        />
                        {formik.errors.contactPhone && (
                            <p className="errorMsg"> {formik.errors.contactPhone} </p>
                        )}
                    </div>
                    <div>
                        <label>ContactEmail: </label>
                        <input type="text" name="contactEmail"
                            value={formik.values.contactEmail}
                            onChange={formik.handleChange}
                            placeholder="Enter your contactEmail"
                        />
                        {formik.errors.contactEmail && (
                            <p className="errorMsg"> {formik.errors.contactEmail} </p>
                        )}
                    </div>
                </div>
                <div className='shopdetail-info'>
                    <div>
                        <label>description: </label>
                        <input type="text" name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder="Enter your description"
                        />
                    </div>
                    <div>
                        <label>operationHours: </label>
                        <input type="text" name="operationHours"
                            value={formik.values.operationHours}
                            onChange={formik.handleChange}
                            placeholder="Enter your operationHours"
                        />
                    </div>
                    <div>
                        <label>shippingPolicy: </label>
                        <input type="text" name="shippingPolicy"
                            value={formik.values.shippingPolicy}
                            onChange={formik.handleChange}
                            placeholder="Enter your shippingPolicy"
                        />
                    </div>
                    <div>
                        <label>returnPolicy: </label>
                        <input type="text" name="returnPolicy"
                            value={formik.values.returnPolicy}
                            onChange={formik.handleChange}
                            placeholder="Enter your returnPolicy"
                        />
                    </div>
                </div>
                <div className='setting'>
                    <button type="submit"> Create </button>
                </div>
            </form>
        </div>
    )
}

export default CreateShopComponent;