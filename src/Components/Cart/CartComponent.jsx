import { useEffect, useState } from "react";
import { GetBookByIdApi, CreateOrders } from "../API/BookStoreApi";
import './Cart.scss';
import { insert } from "formik";

function CartComponent() {
    let CartList = JSON.parse(localStorage.getItem("BookIdCartList"))
    let [cartData, setCartData] = useState([])
    let [markDelete, setMarkDelete] = useState(false)
    let [buy, setBuy] = useState(false)
    let [ordersData, setOrdersData] = useState([])
    let orders = []
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    useEffect(() => {
        retrieveData()
    }, [markDelete])

    let retrieveData = async () => {
        let fetchPromises = CartList.map(async (element) => {
            let response = await GetBookByIdApi(element.id, headers)
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

    let handleSelect = (event, item, index) => {
        var foundOrder = false;
        if (event.target.checked) {
            if (orders.length === 0) {
                var order = {
                    userId: sessionStorage.getItem("userId"),
                    shopId: CartList[index].shopId,
                    totalPrice: item.price,
                    DeliveryAddress: "",
                    orderItems: [
                        {
                            bookId: CartList[index].id,
                            quantity: CartList[index].bookNumber
                        }
                    ]
                }
                orders.push(order)
            }
            else {
                orders.forEach((order) => {
                    if (order.shopId === CartList[index].shopId) {
                        order.totalPrice += item.price
                        order.orderItems.push({
                            bookId: CartList[index].id,
                            quantity: CartList[index].bookNumber
                        })
                        foundOrder = true
                    }
                })
                if (!foundOrder) {
                    var order = {
                        userId: sessionStorage.getItem("userId"),
                        shopId: CartList[index].shopId,
                        totalPrice: item.price,
                        DeliveryAddress: "",
                        orderItems: [
                            {
                                bookId: CartList[index].id,
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
                        if (orderItem.bookId === CartList[index].id) {
                            order.totalPrice -= item.price
                            order.orderItems.splice(i, 1)
                        }
                        i++;
                    })
                }
            })
        }
        orders = orders.filter((order) => order.orderItems.length > 0)
        console.log(orders)
    }

    let handleBuy = () => {
        setOrdersData(orders)
        setBuy(true)
    }

    let handleAddress = (event, index) => {
        ordersData[index].DeliveryAddress = event.target.value
    }

    let handlePhoneNumber = (event, index) => {
        // update later
    }

    let handleXacNhan = () => {
        console.log(ordersData)
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
                                <div>{item.price}$</div>
                                <div className="number">
                                    <span>-</span>
                                    <span>{CartList[index].bookNumber}</span>
                                    <span>+</span>
                                </div>
                                <div>
                                    <input type="checkbox" id="checkbox"
                                        onChange={(event) => handleSelect(event, item, index)}>
                                    </input>
                                </div>
                                <div><button onClick={() => handleDelele(index)}>Delete</button></div>
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
                                <div>ShopId: {order.shopId}</div>
                                <div>Total Price: {order.totalPrice}</div>
                                {
                                    order.orderItems.map((orderItem) => (
                                        <div> Book: {orderItem.bookId} - {orderItem.quantity}</div>
                                    ))
                                }
                                <div>Address</div>
                                <div><input type="text" onChange={(event) => handleAddress(event, index)}></input></div>
                                <div>PhoneNumber</div>
                                <div><input type="text" onChange={(event) => handlePhoneNumber(event, index)}></input></div>
                                <div>Payment Type</div>
                                <div><input type="text" value="fresh money"></input></div>
                            </div>
                        ))
                    }
                    <div><button onClick={handleXacNhan}>Xac Nhan</button></div>
                </div>
            }
        </>
    )
}

export default CartComponent;