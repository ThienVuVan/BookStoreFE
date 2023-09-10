import { useNavigate, useParams } from 'react-router-dom';
import { GetBookDetailByIdApi, GetReviewApi, GetRateApi } from "../API/BookStoreApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './BookDetail.scss'
function BookDetailComponent() {
    let { id } = useParams()
    let [bookData, setBookData] = useState({})
    let [bookImages, setBookImages] = useState([])
    let [reviewData, setReviewData] = useState([])
    let [rateData, setRateData] = useState({})
    let [bookNumber, setBookNumber] = useState(1)
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

    return (
        <>
            <div className="book">
                <div className="image">
                    {bookImages.map((image) => (
                        <img src={image.substring(30)} alt="" />
                    ))}
                </div>
                <div className="info">
                    <ul>
                        <li>Title: {bookData.title}</li>
                        <li>Author: {bookData.author}</li>
                        <li>Category: {bookData.category}</li>
                        <li>Price: {bookData.price}$</li>
                        <li>CurrentQuantity: {bookData.currentQuantity}</li>
                        <li>SoldQuantity: {bookData.soldQuantity}</li>
                        <li>Number:
                            <span className="click" onClick={handleMinusBookNumber}>-</span>
                            <span>{bookNumber}</span>
                            <span className="click" onClick={handlePlusBookNumber}>+</span>
                        </li>
                        <li>
                            <button>Buy</button>
                            <button onClick={handleAddCart}>Add Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="book-detail">
                <ul>
                    <li>Publisher: {bookData.publisher}</li>
                    <li>PublicationDate: {bookData.publicationDate}</li>
                    <li>Dimension: {bookData.dimension}</li>
                    <li>CoverType: {bookData.coverType}</li>
                    <li>NumberOfPages: {bookData.numberOfPages}</li>
                    <li>PublishingHouse: {bookData.publishingHouse}</li>
                    <li>Description: {bookData.description}</li>
                </ul>
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