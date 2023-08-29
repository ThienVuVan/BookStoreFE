import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import { GetBookByIdApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import './BookDetail.scss'
function BookDetailComponent() {
    let { id } = useParams()
    let [bookData, setBookData] = useState({})
    let [bookImages, setBookImages] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveBook = async () => {
        try {
            let response = await GetBookByIdApi(id, headers)
            setBookData(response.data)
            setBookImages(response.data.images)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        retrieveBook()
    }, [])

    return (
        <>
            <div className="book">
                <div className="image">
                    <ul>
                        {bookImages.map((image) => (<li>Image: {image}</li>))}
                    </ul>
                </div>
                <div className="info">
                    <ul>
                        <li>Title: {bookData.title}</li>
                        <li>Author: {bookData.author}</li>
                        <li>Category: {bookData.category}</li>
                        <li>Price: {bookData.price}$</li>
                        <li>CurrentQuantity: {bookData.currentQuantity}</li>
                        <li>SoldQuantity: {bookData.soldQuantity}</li>
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
        </>

    )
}

export default BookDetailComponent;