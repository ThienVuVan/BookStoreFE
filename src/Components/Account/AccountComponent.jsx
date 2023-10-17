import { GetUserById, GetOrderForUserApi, GetOrderItemsApi, CreateReviewApi, ConfirmOrderApi, DeleteOrderApi } from '../API/BookStoreApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import './Account.scss';

function AccountComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [createShop, setCreateShop] = useState(false);
    let [userData, setUserData] = useState({});
    let [ordersData, setOrdersData] = useState([]);
    let [change, setChange] = useState(false)
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    async function retrieveUser() {
        try {
            let response1 = await GetUserById(sessionStorage.getItem("userId"), headers);
            setUserData(response1.data)
            let response2 = await GetOrderForUserApi(sessionStorage.getItem("userId"), headers);
            setOrdersData(response2.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { retrieveUser() }, [change]);

    let handleCreateShop = () => {
        Navigate("/createshop");
        setCreateShop(true);
    }

    let handleUpdateAccont = () => {
        Navigate("/updateaccount")
    }

    // comment

    let [orderItems, setOrderItems] = useState([])
    let [evaluate, setEvaluate] = useState(false)
    let [confirm, setConfirm] = useState(true)
    let [orderId, setOrderId] = useState(null)

    let handleEvaluate = async (orderId) => {
        try {
            let response = await GetOrderItemsApi(orderId, headers)
            setOrderItems(response.data)
            setOrderId(orderId)
            setEvaluate(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    let comment = useFormik({
        initialValues: {
            orderId: orderId,
            userId: sessionStorage.getItem("userId"),
            bookId: null,
            comment: "",
            rate: null,
            image: null,
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            values.orderId = orderId;
            const headers1 = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
            try {
                await CreateReviewApi(values, headers1)
                toast.success("Create Comment Success!")
                setEvaluate(false)
                setChange(!change)
            }
            catch (error) {
                console.log(error)
                toast.error("Create Comment Failed!")
            }
        }
    })


    let handleChangeImage = (event) => {
        const selectedFiles = event.target.files[0]
        comment.setFieldValue("image", selectedFiles)
    }

    let handleConfirm = (bookId) => {
        comment.setFieldValue("bookId", bookId)
        setConfirm(!confirm)
    }

    let handleConfirmSuccess = async (orderId) => {
        try {
            await ConfirmOrderApi(orderId, null, headers)
            toast.success("Confirm Success!")
            setChange(!change)
        }
        catch (error) {
            toast.error("Confirm failed!")
            console.log(error)
        }
    }

    let hanleCancelOrder = async (orderId) => {
        try {
            await DeleteOrderApi(orderId, headers)
            toast.success("Delete Order Success!")
            setChange(!change)
        }
        catch (error) {
            toast.error("Delete Order Failed!")
            console.log(error)
        }
    }
    return (
        <>
            <div className='account'>
                <div className='info'>
                    <table>
                        <tr>
                            <td className='one'>Username:</td>
                            <td>{userData.username}</td>
                        </tr>
                        <tr>
                            <td className='one'>Email:</td>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <td className='one'>Phonenumber:</td>
                            <td>{userData.phoneNumber}</td>
                        </tr>
                    </table>
                </div>
                <div className='setting'>
                    <div><button onClick={handleUpdateAccont}>Update Account</button></div>
                    <div><button onClick={() => Auth.logout()}>Logout</button></div>
                    {!createShop && !Auth.roles.includes("ROLE_SHOP") && < div > <button onClick={handleCreateShop}>Create Shop</button></div >}
                </div>
            </div>
            <div className='orders'>
                <span className='orders-label'>Your Orders</span>
                {ordersData.map((order) => (
                    <div className='order'>
                        <table>
                            <tr>
                                <td>OrderId:</td>
                                <td>{order.id}</td>
                            </tr>
                            <tr>
                                <td>Order Price:</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                            <tr>
                                <td>Order Date:</td>
                                <td>{order.date}</td>
                            </tr>
                            <tr>
                                <td>Order Address:</td>
                                <td>{order.deliveryAddress}</td>
                            </tr>
                            <tr>
                                <td>Order Status:</td>
                                <td>{order.orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Is-Confirm:</td>
                                {order.isConfirm && <td>Confirm Successful</td>}
                                {!order.isConfirm && <td>Non Confirm</td>}
                            </tr>
                            <tr>
                                <td>Is-Evaluate:</td>
                                {order.isEvaluate && <td>Evaluate Successful</td>}
                                {!order.isEvaluate && <td>Non Evaluate</td>}
                            </tr>
                            <tr>
                                {(order.orderStatus === "Successful Delivery" && order.isConfirm === false) &&
                                    <button onClick={() => handleConfirmSuccess(order.id)}>Confirm Success</button>}
                            </tr>
                            <tr>
                                {(order.orderStatus === "Successful Delivery" && order.isEvaluate === false && order.isConfirm === true) &&
                                    <button onClick={() => handleEvaluate(order.id)}>Evaluate</button>
                                }
                            </tr>
                            <tr>
                                {(order.orderStatus === "Order Placement" || order.orderStatus === "Order Processing"
                                    || order.orderStatus === "Order Fulfillment" || order.orderStatus === "Delivery Preparation")
                                    &&
                                    <button onClick={() => hanleCancelOrder(order.id)}>Cancel Order</button>
                                }
                            </tr>

                        </table>
                    </div>
                ))
                }
                {evaluate &&
                    <div className='evaluate'>
                        {
                            orderItems.map((orderItem) => {
                                return (
                                    <form className="form" onSubmit={comment.handleSubmit}>
                                        <table>
                                            <tr>
                                                <td>Book</td> <td>{orderItem.book.title}</td>
                                            </tr>
                                            <tr>
                                                <td>Comment</td>
                                                <td>
                                                    <input type="text" name="comment"
                                                        value={comment.values.comment}
                                                        onChange={comment.handleChange}
                                                        placeholder="New comment"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Rate</td>
                                                <td>
                                                    <select name="rate" value={comment.values.rate} onChange={comment.handleChange}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Image</td> <td><input type="file" accept="image/*" onChange={handleChangeImage} /></td>
                                            </tr>
                                        </table>
                                        {confirm && <div><button onClick={() => handleConfirm(orderItem.book.id)}>Confirm</button></div>}
                                        {!confirm && <div><button className="button" type="submit"> Create </button></div>}
                                    </form>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </>

    )
}
export default AccountComponent;