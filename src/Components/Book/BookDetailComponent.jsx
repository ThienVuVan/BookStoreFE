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
        if (bookNumber > 1) {
            setBookNumber(bookNumber - 1)
        }
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

    let handleViewShop = () => {
        Navigate(`/viewshopdetail/${shop.id}`)
    }

    return (
        <div className='bookdetail'>
            <div className="book">
                <div className="image">
                    {bookImages.map((image) => (
                        < img src={image.substring(23)} alt="" />
                    ))}
                </div>
                <div className="info">
                    <table>
                        <tr>
                            <td className='title'>{bookData.title}</td>
                        </tr>
                        <tr>
                            <td className='label'>author:</td>
                            <td>{bookData.author}</td>
                        </tr>
                        <tr>
                            <td className='label'>category:</td>
                            <td>{bookData.category}</td>
                        </tr>
                        <tr>
                            <td className='label'>price:</td>
                            <td className='price'>{bookData.price}$</td>
                        </tr>
                        <tr>
                            <td className='label'>current quantity:</td>
                            <td>{bookData.currentQuantity}</td>
                        </tr>
                        <tr>
                            <td className='label'>soldQuantity:</td>
                            <td>{bookData.soldQuantity}</td>
                        </tr>
                        <tr>
                            <td className='label'>number:</td>
                            <td className='number'>
                                <li onClick={handleMinusBookNumber}>-</li>
                                <li>{bookNumber}</li>
                                <li onClick={handlePlusBookNumber}>+</li>
                            </td>
                        </tr>
                        <tr>
                            <td className='button'><button onClick={handleAddCart}>Add Cart</button></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='more'>
                <div className="book-detail">
                    <table>
                        <tr>
                            <td className='one'>Publisher</td>
                            <td className='two'>{bookData.publisher}</td>
                        </tr>
                        <tr>
                            <td className='one'>Publication Date</td>
                            <td className='two'>{bookData.publicationDate}</td>
                        </tr>
                        <tr>
                            <td className='one'>Dimension</td>
                            <td className='two'>{bookData.dimension}</td>
                        </tr>
                        <tr>
                            <td className='one'>Cover Type</td>
                            <td className='two'>{bookData.coverType}</td>
                        </tr>
                        <tr>
                            <td className='one'>Number Of Pages</td>
                            <td className='two'>{bookData.numberOfPages}</td>
                        </tr>
                        <tr>
                            <td className='one'>Publishing House</td>
                            <td className='two'>{bookData.publishingHouse}</td>
                        </tr>
                    </table>
                </div>
                <div className='shop'>
                    <div className='shop-image'>
                        {isloadshop && <img src={shop.shopLogoPath.substring(23)}></img>}
                    </div>
                    <div className='shop-info'>
                        <div className='detail'>
                            <li className='name'>{shop.shopName}</li>
                            <li className='address'>(.) {shop.shopAddress}</li>
                            <li><button onClick={handleViewShop}>View Shop</button></li>
                        </div>
                    </div>
                </div>
            </div>
            <div className='description'>
                <div className='label'>
                    <label>Description</label>
                </div>
                <div className='content'>
                    {bookData.description}
                </div>
            </div>
            <div className="rate">
                <table>
                    <tr>
                        <td className='one'>Five Star</td>
                        <td>{rateData.fiveStar}</td>
                    </tr>
                    <tr>
                        <td className='one'>Four Star</td>
                        <td>{rateData.fourStar}</td>
                    </tr>
                    <tr>
                        <td className='one'>Three Star</td>
                        <td>{rateData.threeStar}</td>
                    </tr>
                    <tr>
                        <td className='one'>Two Star</td>
                        <td>{rateData.twoStar}</td>
                    </tr>
                    <tr>
                        <td className='one'>One Star</td>
                        <td>{rateData.oneStar}</td>
                    </tr>
                </table>
            </div>
            <div className="comment">
                <div className='one'>
                    <label>Comment</label>
                </div>
                {
                    reviewData.map((item) => (
                        <div className="view-comment">
                            <table>
                                <tr>
                                    <td className='name'>User:</td>
                                    <td className='content'>{item.username}</td>
                                </tr>
                                <tr>
                                    <td className='name'>Comment:</td>
                                    <td className='content'>{item.comment}</td>
                                </tr>
                            </table>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default BookDetailComponent;