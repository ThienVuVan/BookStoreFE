import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { UpdateShopDetailApi, GetShopDetailApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect } from 'react';

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
        <div>
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <div>
                    <label>description: </label>
                    <input type="text" name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label>operationHours: </label>
                    <input type="text" name="operationHours"
                        value={formik.values.operationHours}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label>shippingPolicy: </label>
                    <input type="text" name="shippingPolicy"
                        value={formik.values.shippingPolicy}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <label>returnPolicy: </label>
                    <input type="text" name="returnPolicy"
                        value={formik.values.returnPolicy}
                        onChange={formik.handleChange}
                    />
                </div>
                <div> <button type="submit"> Update Shop </button> </div>
            </form>
        </div>
    )
}

export default UpdateShopDetailComponent;