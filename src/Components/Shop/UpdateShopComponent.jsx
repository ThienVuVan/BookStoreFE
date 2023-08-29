import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { UpdateShopApi, GetShopApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect } from 'react';

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
        <div>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <div>
                    <label>ShopName: </label>
                    <input type="text" name="shopName"
                        value={formik.values.shopName}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username && (
                        <p className="errorMsg"> {formik.errors.username} </p>
                    )}
                </div>
                <div>
                    <label>NewShopLogo: </label>
                    <input type="file" name="shopLogo"
                        onChange={handleChangeShopLogo}
                    />
                </div>
                <div>
                    <label>ShopAddress: </label>
                    <input type="text" name="shopAddress"
                        value={formik.values.shopAddress}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label>ContactPhone: </label>
                    <input type="text" name="contactPhone"
                        value={formik.values.contactPhone}
                        onChange={formik.handleChange}
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
                    />
                </div>
                <div> <button type="submit"> Update Shop </button> </div>
            </form>
        </div>
    )
}

export default UpdateShopComponent;