import { GetUserById, GetOrderForUserApi, GetOrderItemsApi, CreateReviewApi } from '../API/BookStoreApi';
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
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

    useEffect(() => { retrieveUser() }, []);

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

    let handleEvaluate = async (orderId) => {
        try {
            let response = await GetOrderItemsApi(orderId, headers)
            console.log(response.data)
            setOrderItems(response.data)
            setEvaluate(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    let comment = useFormik({
        initialValues: {
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
            const headers1 = {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
            console.log(values)
            try {
                await CreateReviewApi(values, headers1)
                toast.success("Create Comment Success!")
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

    return (
        <>
            <div className='account'>
                <div className='info'>
                    <ul>
                        <li>Id : {userData.id}</li>
                        <li>Username:  {userData.username}</li>
                        <li>Email:  {userData.email}</li>
                        <li>Phonenumber:  {userData.phoneNumber}</li>
                    </ul>
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
                        <li>OrderId: {order.id}</li>
                        <li>Order Price: {order.totalPrice}</li>
                        <li>Order Date: {order.date}</li>
                        <li>Order Address: {order.deliveryAddress}</li>
                        <li>Order Status: {order.orderStatus}</li>
                        {order.orderStatus === "Successful Delivery" &&
                            <li><button onClick={() => handleEvaluate(order.id)}>evaluate</button></li>
                        }
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