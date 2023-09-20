import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { UpdateShopApi, GetShopApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import "./UpdateShop.scss"

function UpdateShopComponent() {
    let Navigate = useNavigate();
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let retrieveShop = async () => {
        try {
            let response = await GetShopApi(sessionStorage.getItem("userId"), headers);
            formik.setValues({
                userId: sessionStorage.getItem("userId"),
                shopName: response.data.shopName,
                shopAddress: response.data.shopAddress,
                contactPhone: response.data.contactPhone,
                contactEmail: response.data.contactEmail
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    let formik = useFormik({
        initialValues: {
            userId: "",
            shopName: "",
            shopLogo: null,
            shopAddress: "",
            contactPhone: "",
            contactEmail: ""
        },
        validationSchema: Yup.object({
            shopName: Yup.string().required("Required"),
            contactPhone: Yup.string().required("Required")
        }),
        onSubmit: async () => {
            console.log(formik.values)
            try {
                await UpdateShopApi(formik.values, headers)
                toast.success("Update Shop Success!")
                Navigate("/shop")
            } catch (error) {
                toast.error("Update Shop Failed!")
                console.log(error)
            }
        }
    })

    useEffect(() => {
        retrieveShop();
    }, [])

    const handleChangeShopLogo = (event) => {
        const selectedFile = event.target.files[0];
        formik.setFieldValue('shopLogo', selectedFile);
    }

    return (
        <div className="info-shop">
            <form onSubmit={formik.handleSubmit}>
                <table>
                    <tr>
                        <td>ShopName:</td>
                        <td>
                            <input type="text" name="shopName"
                                value={formik.values.shopName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.username && (
                                <p className="errorMsg"> {formik.errors.username} </p>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>NewShopLogo:</td>
                        <td>
                            <input type="file" name="shopLogo"
                                onChange={handleChangeShopLogo}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>ShopAddress:</td>
                        <td>
                            <input type="text" name="shopAddress"
                                value={formik.values.shopAddress}
                                onChange={formik.handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>ContactPhone:</td>
                        <td>
                            <input type="text" name="contactPhone"
                                value={formik.values.contactPhone}
                                onChange={formik.handleChange}
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
                            />
                        </td>
                    </tr>
                    <tr className="button"><button type="submit"> Update Shop </button></tr>
                </table>
            </form>
        </div>
    )
}

export default UpdateShopComponent;