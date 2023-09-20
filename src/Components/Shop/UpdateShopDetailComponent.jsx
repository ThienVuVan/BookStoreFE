import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { UpdateShopDetailApi, GetShopDetailApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import './UpdateShopDetail.scss';

function UpdateShopDetailComponent() {
    let Navigate = useNavigate();
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let retrieveShopDetail = async () => {
        try {
            let response = await GetShopDetailApi(sessionStorage.getItem("shopId"), headers);
            formik.setValues({
                description: response.data.description,
                operationHours: response.data.operationHours,
                shippingPolicy: response.data.shippingPolicy,
                returnPolicy: response.data.returnPolicy
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    let formik = useFormik({
        initialValues: {
            description: "",
            operationHours: "",
            shippingPolicy: "",
            returnPolicy: ""
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                await UpdateShopDetailApi(sessionStorage.getItem("shopId"), values, headers)
                toast.success("Update ShopDetail Success!")
                Navigate("/shop")
            } catch (error) {
                toast.error("Update ShopDetail Failed!")
                console.log(error)
            }
        }
    })

    useEffect(() => {
        retrieveShopDetail();
    }, [])

    return (
        <div className="info-shopdetail">
            <form onSubmit={formik.handleSubmit}>
                <table>
                    <tr>
                        <td>Description:</td>
                        <td>
                            <input type="text" name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>OperationHours:</td>
                        <td>
                            <input type="text" name="operationHours"
                                value={formik.values.operationHours}
                                onChange={formik.handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>ShippingPolicy:</td>
                        <td>
                            <input type="text" name="shippingPolicy"
                                value={formik.values.shippingPolicy}
                                onChange={formik.handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>ReturnPolicy:</td>
                        <td>
                            <input type="text" name="returnPolicy"
                                value={formik.values.returnPolicy}
                                onChange={formik.handleChange}
                            />
                        </td>
                    </tr>
                    <tr><button type="submit"> Update Shop </button> </tr>
                </table>
            </form>
        </div>
    )
}

export default UpdateShopDetailComponent;