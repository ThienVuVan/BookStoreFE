import { useEffect, useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';
import { GetShopApi, DeleteShopApi, GetBookForShopApi, DeleteBookForShopApi } from "../API/BookStoreApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Shop.scss';

function ShopComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [shopData, setShopData] = useState({});
    let [bookData, setBookData] = useState([]);
    let [deleteBookMark, setDeleteBookMark] = useState(true);
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveShop = async () => {
        try {
            let response = await GetShopApi(sessionStorage.getItem("userId"), headers);
            sessionStorage.setItem("shopId", response.data.id);
            setShopData(response.data);
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
            toast.success("Delete Shop Success!")
            Navigate("/account")
        }
        catch (error) {
            console.log(error)
            toast.error("Delete Shop Failed!")
        }
    }

    let handleDeleteBook = async (bookId) => {
        console.log(bookId)
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

    return (
        <>
            <div className="shop">
                <div className="info">
                    <ul>
                        <li> ShopId: {shopData.id} </li>
                        <li> ShopName: {shopData.shopName} </li>
                        <li> ShopLogo: {shopData.shopLogoPath} </li>
                        <li> ShopAddress: {shopData.shopAddress} </li>
                        <li> ShopContactPhone: {shopData.contactPhone} </li>
                        <li> ShopContactEmail: {shopData.contactEmail} </li>
                    </ul>
                </div>
                <div className="setting">
                    <div><button onClick={handleUpdateShop}>Update Shop</button></div>
                    <div><button onClick={handleUpdateShopDetail}>Update ShopDetail</button></div>
                    <div><button onClick={handleDeleteShop}>Delete Shop</button></div>
                    <div><button onClick={handleAddBook}>Add New Book</button></div>
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
        </>


    )
}

export default ShopComponent;