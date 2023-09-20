import { useNavigate, useParams } from 'react-router-dom';
import { GetBookDetailByIdApi, GetReviewApi, GetRateApi, GetShopByBookIdApi } from "../API/BookStoreApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './BookDetail.scss'
import { useAuth } from '../Sercutiry/AuthContext';
function BookDetailComponent() {
    let Auth = useAuth()
    let Navigate = useNavigate()
    let { id } = useParams()
    let [bookData, setBookData] = useState({})
    let [bookImages, setBookImages] = useState([])
    let [reviewData, setReviewData] = useState([])
    let [rateData, setRateData] = useState({})
    let [bookNumber, setBookNumber] = useState(1)
    let [shop, setShop] = useState({})
    let [isloadshop, setIsLoadShop] = useState(false)
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveBook = async () => {
        try {
            let response1 = await GetBookDetailByIdApi(id, headers)
            setBookData(response1.data)
            setBookImages(response1.data.images)

            let response2 = await GetReviewApi(id, 0, headers)
            setReviewData(response2.data)

            let response3 = await (GetRateApi(id, headers))
            setRateData(response3.data)

            let response4 = await (GetShopByBookIdApi(id, headers))
            setShop(response4.data)
            setIsLoadShop(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        retrieveBook()
    }, [])


    let handleMinusBookNumber = () => {
        setBookNumber(bookNumber - 1)
    }
    let handlePlusBookNumber = () => {
        setBookNumber(bookNumber + 1)
    }
    let handleAddCart = () => {
        if (Auth.isAuthenticated) {
            if (localStorage.getItem("BookIdCartList") == null) {
                let BookIdCartList = []
                BookIdCartList.push({ "bookId": id, "title": bookData.title, "price": bookData.price, "bookNumber": bookNumber, "shopId": bookData.shopId, "shopName": bookData.shopName })
                localStorage.setItem("BookIdCartList", JSON.stringify(BookIdCartList))
                toast.success("Add Book To Cart Success!")
            } else {
                let ExistBookIdCartList = JSON.parse(localStorage.getItem("BookIdCartList"))
                ExistBookIdCartList.push({ "bookId": id, "title": bookData.title, "price": bookData.price, "bookNumber": bookNumber, "shopId": bookData.shopId, "shopName": bookData.shopName })
                localStorage.setItem("BookIdCartList", JSON.stringify(ExistBookIdCartList))
                toast.success("Add Book To Cart Success!")
            }
        }
        else {
            toast.warn("Please Login!")
            Navigate("/login")
        }
    }

    let handleBuy = () => {
        if (Auth.isAuthenticated) {

        }
        else {
            toast.warn("Please Login!")
            Navigate("/login")
        }
    }

    return (
        <>
            <div className="book">
                <div className="image">
                    {bookImages.map((image) => (
                        <img src={image.substring(30)} alt="" />
                    ))}
                </div>
                <div className="info">
                    <table>
                        <tr>
                            <td className='lable'>Title:</td>
                            <td className='title'>{bookData.title}</td>
                        </tr>
                        <tr>
                            <td>Author:</td>
                            <td>{bookData.author}</td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>{bookData.category}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>{bookData.price}$</td>
                        </tr>
                        <tr>
                            <td>CurrentQuantity:</td>
                            <td>{bookData.currentQuantity}</td>
                        </tr>
                        <tr>
                            <td>SoldQuantity:</td>
                            <td>{bookData.soldQuantity}</td>
                        </tr>
                        <tr>
                            <td>Number:</td>
                            <td>
                                <span className="click" onClick={handleMinusBookNumber}>-</span>
                                <span>{bookNumber}</span>
                                <span className="click" onClick={handlePlusBookNumber}>+</span>
                            </td>
                        </tr>
                        <tr>
                            <td><button onClick={handleBuy}>Buy</button></td>
                            <td><button onClick={handleAddCart}>Add Cart</button></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='more'>
                <div className="book-detail">
                    <table>
                        <tr>
                            <td>Publisher:</td>
                            <table>{bookData.publisher}</table>
                        </tr>
                        <tr>
                            <td>PublicationDate:</td>
                            <td>{bookData.publicationDate}</td>
                        </tr>
                        <tr>
                            <td>Dimension:</td>
                            <td>{bookData.dimension}</td>
                        </tr>
                        <tr>
                            <td>CoverType:</td>
                            <td>{bookData.coverType}</td>
                        </tr>
                        <tr>
                            <td>NumberOfPages:</td>
                            <td>{bookData.numberOfPages}</td>
                        </tr>
                        <tr>
                            <td>PublishingHouse:</td>
                            <td>{bookData.publishingHouse}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{bookData.description}</td>
                        </tr>
                    </table>
                </div>
                <div className='shop'>
                    <div className='shop-image'>
                        {isloadshop && <img src={shop.shopLogoPath.substring(30)}></img>}
                    </div>
                    <div className='shop-info'>
                        <div className='detail'>
                            <li className='name'>{shop.shopName}</li>
                            <li className='address'>(.) {shop.shopAddress}</li>
                            <li><button>View Shop</button></li>
                        </div>

                    </div>
                </div>
            </div>
            <div className="rate">
                <table>
                    <tr>
                        <td>Five Star</td>
                        <td>{rateData.fiveStar}</td>
                    </tr>
                    <tr>
                        <td>Four Star</td>
                        <td>{rateData.fourStar}</td>
                    </tr>
                    <tr>
                        <td>Three Star</td>
                        <td>{rateData.threeStar}</td>
                    </tr>
                    <tr>
                        <td>Two Star</td>
                        <td>{rateData.twoStar}</td>
                    </tr>
                    <tr>
                        <td>One Star</td>
                        <td>{rateData.oneStar}</td>
                    </tr>
                </table>
            </div>
            <div className="comment">
                <label>Comment</label>
                {
                    reviewData.map((item) => (
                        <div className="view-comment">
                            <table>
                                <tr>
                                    <td className='name'>User:</td>
                                    <td>{item.username}</td>
                                </tr>
                                <tr>
                                    <td className='name'>Comment:</td>
                                    <td>{item.comment}</td>
                                </tr>
                            </table>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default BookDetailComponent;