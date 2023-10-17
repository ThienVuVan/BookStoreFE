import { useEffect, useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';
import { GetShopApi, DeleteShopApi, GetBookForShopApi, DeleteBookForShopApi, GetOrderForShopApi, UpdateOrderApi, GetOrderItemsApi } from "../API/BookStoreApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Shop.scss';
import { useFormik } from "formik";

function ShopComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [shopData, setShopData] = useState({});
    let [bookData, setBookData] = useState([]);
    let [shopLogoPath, setShopLogoPath] = useState("");
    let [deleteBookMark, setDeleteBookMark] = useState(true);
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveShop = async () => {
        try {
            let response = await GetShopApi(sessionStorage.getItem("userId"), headers);
            sessionStorage.setItem("shopId", response.data.id)
            setShopData(response.data)
            setShopLogoPath(response.data.shopLogoPath.substring(23))
        }
        catch (error) {
            console.log(error);
        }
    }

    let retrieveBook = async () => {
        try {
            let response = await GetBookForShopApi(sessionStorage.getItem("shopId"), headers)
            setBookData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        retrieveShop();
        retrieveBook();
    }, [Auth.roles, deleteBookMark])

    let handleUpdateShop = () => {
        Navigate("/updateshop")
    }

    let handleUpdateShopDetail = () => {
        Navigate("/updateshopdetail")
    }

    let handleAddBook = () => {
        Navigate("/createbook")
    }

    let handleDeleteShop = async () => {
        try {
            let response = await DeleteShopApi(sessionStorage.getItem("userId"), sessionStorage.getItem("shopId"), headers);
            Auth.setRoles(response.data);
            sessionStorage.setItem("roles", JSON.stringify(response.data))
            toast.success("Delete Shop Success!")
            Navigate("/account")
        }
        catch (error) {
            console.log(error)
            toast.error("Delete Shop Failed!")
        }
    }

    let handleDeleteBook = async (bookId) => {
        try {
            await DeleteBookForShopApi(bookId, headers)
            setDeleteBookMark(!deleteBookMark)
            toast.success("Delete Book Success!")
        }
        catch (error) {
            console.log(error)
            toast.error("Delete Book Failed!")
        }
    }

    let handleViewBook = (bookId) => {
        Navigate(`/bookdetail/${bookId}`)
    }

    let handleUpdateBook = (bookId) => {
        Navigate(`/updatebook/${bookId}`)
    }

    // get order

    let [ordersData, setOrdersData] = useState([])
    let orderRequest = useFormik({
        initialValues: {
            id: null,
            date: null,
            totalPrice: null,
            DeliveryAddress: null,
            orderStatus: null
        },
        onSubmit: async (values) => {
            if (values.orderStatus === "") values.orderStatus = null;
            try {
                let response = await GetOrderForShopApi(sessionStorage.getItem("shopId"), values, headers)
                setOrdersData(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    })

    // update order
    let orderStatus = ""
    let handleStatusChange = (event) => {
        orderStatus = event.target.value
    }

    let handleUpdateOrder = async (orderId) => {
        try {
            await UpdateOrderApi(orderId, orderStatus, null, headers)
            toast.success("Update Success!")
            // load data again
            let response = await GetOrderForShopApi(sessionStorage.getItem("shopId"), {
                id: null,
                date: null,
                totalPrice: null,
                DeliveryAddress: null,
                orderStatus: null
            }, headers)
            setOrdersData(response.data)

        }
        catch (error) {
            console.log(error)
            toast.error("Update Failed!")
        }
    }

    // view orderItems of order
    let [orderItems, setOrderItems] = useState([])
    let [viewOrderItems, setViewOrderItems] = useState(false)
    let handleViewOrder = async (orderId) => {
        try {
            let response = await GetOrderItemsApi(orderId, headers)
            setOrderItems(response.data)
            setViewOrderItems(!viewOrderItems)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    let handleClose = () => {
        setViewOrderItems(!viewOrderItems)
    }

    return (
        <>
            <div className="shop">
                <div className="info">
                    <ul>
                        <li><img src={shopLogoPath} style={{ width: "200px", height: "200px" }}></img></li>
                        <li> ShopId: {shopData.id} </li>
                        <li> ShopName: {shopData.shopName} </li>
                        <li> ShopAddress: {shopData.shopAddress} </li>
                        <li> ShopContactPhone: {shopData.contactPhone} </li>
                        <li> ShopContactEmail: {shopData.contactEmail} </li>
                    </ul>``
                </div>
                <div className="setting">
                    <button onClick={handleUpdateShop}>Update Shop</button>
                    <button onClick={handleUpdateShopDetail}>Update ShopDetail</button>
                    <button onClick={handleDeleteShop}>Delete Shop</button>
                    <button onClick={handleAddBook}>Add New Book</button>
                </div>
            </div>
            <div className="list-book">
                <table className="book-table">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>CurrentQuantity</th>
                        <th>SoldQuantity</th>
                        <th>View</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    {bookData.length > 0 &&
                        bookData.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.currentQuantity}</td>
                                    <td>{item.soldQuantity}</td>
                                    <td><button onClick={() => handleViewBook(item.id)}>View</button></td>
                                    <td><button onClick={() => handleUpdateBook(item.id)}>Update</button></td>
                                    <td><button onClick={() => handleDeleteBook(item.id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className="orders-filter">
                <form className="form" onSubmit={orderRequest.handleSubmit}>
                    <table>
                        <tr>
                            <td>OrderId</td>
                            <td> <input type="number" name="id" value={orderRequest.values.id} onChange={orderRequest.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Order Date</td>
                            <td><input type="date" name="date" value={orderRequest.values.date} onChange={orderRequest.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type="number" name="totalPrice" value={orderRequest.values.totalPrice} onChange={orderRequest.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>DeliveryAddress</td>
                            <td><input type="text" name="DeliveryAddress" value={orderRequest.values.DeliveryAddress} onChange={orderRequest.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <select name="orderStatus" value={orderRequest.values.orderStatus} onChange={orderRequest.handleChange}>
                                    <option value="">Select Status</option>
                                    <option value="Order Placement">Order Placement</option>
                                    <option value="Order Processing">Order Processing</option>
                                    <option value="Order Fulfillment">Order Fulfillment</option>
                                    <option value="Delivery Preparation">Delivery Preparation</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Successful Delivery">Successful Delivery</option>
                                    <option value="Return">Return</option>
                                    <option value="Canceled Order">Canceled Order</option>
                                </select>
                            </td>
                        </tr>
                        <tr >
                            <td><button type="submit"> Filter </button></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div className="list-orders">
                {ordersData.map((order, index) => (
                    <div className="order">
                        <table>
                            <tr>
                                <td>Order Id: </td>
                                <td>{order.id}</td>
                            </tr>
                            <tr>
                                <td>Total Price: </td>
                                <td>{order.totalPrice}</td>
                            </tr>
                            <tr>
                                <td>Order Date: </td>
                                <td>{order.date}</td>
                            </tr>
                            <tr>
                                <td>Address: </td>
                                <td>{order.deliveryAddress}</td>
                            </tr>
                            <tr>
                                <td>Order Status: </td>
                                <td>{order.orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Update Status:</td>
                                <td>
                                    <select onChange={(event) => handleStatusChange(event)}>
                                        <option value="">Select Status</option>
                                        <option value="Order Processing">Order Processing</option>
                                        <option value="Order Fulfillment">Order Fulfillment</option>
                                        <option value="Canceled Order">Canceled Order</option>
                                        <option value="Successful Delivery">Successful Delivery</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        {!viewOrderItems && <div className="view-button"><button onClick={() => handleViewOrder(order.id)}>View</button></div>}
                        {viewOrderItems &&
                            <div className="orderItems">
                                {
                                    orderItems.map((orderItem) => (
                                        <li>BookId: {orderItem.book.id} - Book Title: {orderItem.book.title} - Quantity: {orderItem.quantity}</li>
                                    ))
                                }
                                <button onClick={handleClose}>Close</button>
                            </div>

                        }
                        {
                            (order.orderStatus !== "Successful Delivery" && order.orderStatus !== "Canceled Order")
                            && <div className="update-button"><button onClick={() => handleUpdateOrder(order.id)}>Update</button></div>
                        }

                    </div>
                ))
                }
            </div>

        </>
    )
}

export default ShopComponent;