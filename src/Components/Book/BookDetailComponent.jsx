import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import { GetBookDetailByIdApi, CreateReviewApi, GetReviewApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import './BookDetail.scss'
function BookDetailComponent() {
    let { id } = useParams()
    let [bookData, setBookData] = useState({})
    let [bookImages, setBookImages] = useState([])
    let [reviewData, setReviewData] = useState([])
    let [bookNumber, setBookNumber] = useState(1)
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveBook = async () => {
        try {
            let response = await GetBookDetailByIdApi(id, headers)
            setBookData(response.data)
            setBookImages(response.data.images)
        }
        catch (error) {
            console.log(error)
        }

        try {
            let response = await GetReviewApi(id, 0, headers)
            setReviewData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        retrieveBook()
    }, [])

    let comment = useFormik({
        initialValues: {
            userId: sessionStorage.getItem("userId"),
            bookId: id,
            comment: "",
            image: [],
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                await CreateReviewApi(values, headers)
                toast.success("Create Comment Success!")
            }
            catch (error) {
                console.log(error)
                toast.error("Create Comment Failed!")
            }
        }
    })

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

    let handleChangeImage = (event) => {
        const selectedFiles = event.target.files[0]
        comment.setFieldValue("image", [...comment.values.image, selectedFiles])
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
            <div className="rate"> rate here</div>
            <div className="comment">
                <label>Comment</label>
                <form className="form" onSubmit={comment.handleSubmit}>
                    <div>
                        <input type="text" name="comment"
                            value={comment.values.comment}
                            onChange={comment.handleChange}
                            placeholder="New comment"
                        />
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleChangeImage} />
                    </div>
                    <div>
                        <button className="button" type="submit"> Create </button>
                    </div>
                </form>
                {
                    reviewData.map((item) => (
                        <div className="view-comment">
                            <li>User: {item.username}</li>
                            <li>Comment: {item.comment}</li>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default BookDetailComponent;