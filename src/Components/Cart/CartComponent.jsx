import { useEffect, useState } from "react";
import { GetBookByIdApi, CreateOrders } from "../API/BookStoreApi";
import './Cart.scss';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CartComponent() {
    let Navigate = useNavigate()
    let CartList = JSON.parse(localStorage.getItem("BookIdCartList"))
    let [cartData, setCartData] = useState([])
    let [markDelete, setMarkDelete] = useState(false)
    let [bookNumberChange, setBookNumberChange] = useState(false)
    let [buy, setBuy] = useState(false)
    let [ordersData, setOrdersData] = useState([])
    let orders = []
    let listBoughtBookId = []
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    useEffect(() => {
        retrieveData()
    }, [markDelete, bookNumberChange])

    let retrieveData = async () => {
        let fetchPromises = CartList.map(async (element) => {
            let response = await GetBookByIdApi(element.bookId, headers)
            return response.data
        })
        const bookDataArray = await Promise.all(fetchPromises);
        setCartData(bookDataArray)
    }

    let handleDelele = (index) => {
        const updatedCartList = [...CartList]
        updatedCartList.splice(index, 1)
        localStorage.setItem("BookIdCartList", JSON.stringify(updatedCartList))
        setCartData(cartData.filter((_, i) => i !== index));
        setMarkDelete(!markDelete)
    }

    let handleSelect = (event, index) => {
        var foundOrder = false;
        if (event.target.checked) {
            if (orders.length === 0) {
                var order = {
                    userId: sessionStorage.getItem("userId"),
                    shopId: CartList[index].shopId,
                    shopName: CartList[index].shopName,
                    totalPrice: CartList[index].price * CartList[index].bookNumber,
                    address: "",
                    orderItems: [
                        {
                            bookName: CartList[index].title,
                            bookId: CartList[index].bookId,
                            quantity: CartList[index].bookNumber
                        }
                    ]
                }
                orders.push(order)
            }
            else {
                orders.forEach((order) => {
                    if (order.shopId === CartList[index].shopId) {
                        order.totalPrice += CartList[index].price * CartList[index].bookNumber
                        order.orderItems.push({
                            bookName: CartList[index].title,
                            bookId: CartList[index].bookId,
                            quantity: CartList[index].bookNumber
                        })
                        foundOrder = true
                    }
                })
                if (!foundOrder) {
                    var order = {
                        userId: sessionStorage.getItem("userId"),
                        shopId: CartList[index].shopId,
                        shopName: CartList[index].shopName,
                        totalPrice: CartList[index].price * CartList[index].bookNumber,
                        address: "",
                        orderItems: [
                            {
                                bookName: CartList[index].title,
                                bookId: CartList[index].bookId,
                                quantity: CartList[index].bookNumber
                            }
                        ]
                    }
                    orders.push(order)
                }
            }
        }
        else {
            orders.forEach((order) => {
                if (order.shopId === CartList[index].shopId) {
                    var i = 0;
                    order.orderItems.forEach((orderItem) => {
                        if (orderItem.bookId === CartList[index].bookId) {
                            order.totalPrice -= CartList[index].price * CartList[index].bookNumber
                            order.orderItems.splice(i, 1)
                        }
                        i++;
                    })
                }
            })
        }
        orders = orders.filter((order) => order.orderItems.length > 0)
    }

    let handleBuy = () => {
        setOrdersData(orders)
        setBuy(true)
    }

    let handleAddress = (event, index) => {
        ordersData[index].address = event.target.value
    }

    let handlePhoneNumber = (event, index) => {
        // update later
    }

    let handleMinusBookNumber = (index) => {
        CartList[index].bookNumber -= 1;
        const updatedCartList = [...CartList]
        localStorage.setItem("BookIdCartList", JSON.stringify(updatedCartList))
        setBookNumberChange(!bookNumberChange)
    }

    let handlePlusBookNumber = (index) => {
        CartList[index].bookNumber += 1;
        const updatedCartList = [...CartList]
        localStorage.setItem("BookIdCartList", JSON.stringify(updatedCartList))
        setBookNumberChange(!bookNumberChange)
    }

    let handleConfirm = () => {
        try {
            ordersData.forEach(async (orderData) => {
                try {
                    // console.log(orderData)
                    // await CreateOrders(orderData, headers)
                }
                catch (error) {
                    console.log(error)
                }
            })
            toast.success("Order Success!")
            setBuy(false)
            // xoa cac xach da duoc mua khoi gio hang;
            ordersData.forEach((orderData) => {
                orderData.orderItems.forEach((orderItem) => listBoughtBookId.push(orderItem.bookId))
            })
            // mark list delete index
            listBoughtBookId.forEach((id) => {
                CartList.forEach((item, index) => {
                    if (item.bookId === id)
                        CartList.splice(index, 1)
                })
            })
            const updatedCartList = [...CartList]
            localStorage.setItem("BookIdCartList", JSON.stringify(updatedCartList))
            Navigate("/account")

        }
        catch (error) {
            toast.error("System Error, Try Again!")
        }
    }

    return (
        <>
            <div className="cart">
                <div className="cart-item-container">
                    {
                        cartData.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div><img src={item.imagePath.substring(30)} /></div>
                                <div>{item.title}</div>
                                <div>{item.price} $</div>
                                <div className="number">
                                    <span onClick={() => handleMinusBookNumber(index)}>-</span>
                                    <span >{CartList[index].bookNumber}</span>
                                    <span onClick={() => handlePlusBookNumber(index)}>+</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={(event) => handleSelect(event, index)}></input>
                                </div>
                                <div>
                                    <button onClick={() => handleDelele(index)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="control">
                    <button onClick={handleBuy}>Buy Selected</button>
                </div>
            </div>
            {buy &&
                <div className="bill">
                    {
                        ordersData.map((order, index) => (
                            <div key={index} className="bill-item">
                                <span>Bill</span>
                                {
                                    order.orderItems.map((orderItem) => (
                                        <div> Book: {orderItem.bookName} -  Quantity: {orderItem.quantity}</div>
                                    ))
                                }
                                <div>Total Price: {order.totalPrice}</div>
                                <div>Shop: {order.shopName}</div>
                                <div>Address</div>
                                <div><input type="text" onChange={(event) => handleAddress(event, index)}></input></div>
                                <div>PhoneNumber</div>
                                <div><input type="text" onChange={(event) => handlePhoneNumber(event, index)}></input></div>
                                <div>Payment Type</div>
                                <div><input type="text" value="fresh money"></input></div>
                            </div>
                        ))
                    }
                    <div><button onClick={handleConfirm}>Confirm</button></div>
                </div>
            }
        </>
    )
}

export default CartComponent;