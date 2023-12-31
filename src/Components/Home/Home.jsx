import { useEffect, useState } from 'react';
import { GetBookByPageApi, GetBookByCondition } from "../API/BookStoreApi";
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useAuth } from '../Sercutiry/AuthContext';

function Home() {
    // set cart
    if (JSON.parse(localStorage.getItem("BookIdCartList")) === null) {
        localStorage.setItem("BookIdCartList", JSON.stringify([]))
    }
    let Navigate = useNavigate()
    let [bookData, setBookData] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let retrieveBookData = async () => {
        try {
            let response = await GetBookByPageApi(0, headers)
            setBookData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        retrieveBookData()
    }, [])

    let handleViewDetail = (bookId) => {
        Navigate(`/bookdetail/${bookId}`)
    }

    // filer book
    let Auth = useAuth();
    const [categories, setCategories] = useState(Auth.categories);
    useEffect(() => {
        setCategories(Auth.categories)
    }, [Auth.categories])
    let filter = useFormik({
        initialValues: {
            title: null,
            authors: null,
            lowPrice: null,
            highPrice: null,
            category: null,
        },
        onSubmit: async (values) => {
            if (values.category === "") values.category = null;
            try {
                let response = await GetBookByCondition(values, headers)
                setBookData(response.data)
                console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
    })

    // change page
    let handleChangePage = async (page) => {
        try {
            let response = await GetBookByPageApi(page, headers)
            setBookData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='filter'>
                <form className="form" onSubmit={filter.handleSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={filter.values.id} onChange={filter.handleChange} placeholder='enter title' />
                    <label>Authors</label>
                    <input className='authors' type="text" name="authors" value={filter.values.authors} onChange={filter.handleChange} placeholder='enter authors' />
                    <label>Price from</label>
                    <input className='price' type="number" name="lowPrice" value={filter.values.lowPrice} onChange={filter.handleChange} />
                    <label>to</label>
                    <input className='price' type="number" name="highPrice" value={filter.values.highPrice} onChange={filter.handleChange} />
                    <label>Category</label>
                    <select name="category" value={filter.values.category} onChange={filter.handleChange}>
                        <option value="">none</option>
                        {categories.map((category) => {
                            return (
                                <optgroup label={category.name}>
                                    {category.subcategories.map((subcategory) => (
                                        <option value={subcategory.name}>{subcategory.name}</option>
                                    ))}
                                </optgroup>
                            )
                        })
                        }
                    </select>
                    <button type="submit"> Filter </button>
                </form>
            </div>
            <div className='home-list-book'>
                {bookData.map((book) => (
                    <div className='item' onClick={() => handleViewDetail(book.id)}>
                        <div className='image'>
                            <img className='image-item' src={book.imagePath.substring(23)} />
                        </div>
                        <div className='info'>
                            <div className='title'>{book.title}</div>
                            <div className='price'>{book.price} $</div>
                            <div className='sold'>Sold: {book.soldQuantity}</div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className='page'>
                <li onClick={() => handleChangePage(0)}>1</li>
                <li onClick={() => handleChangePage(1)}>2</li>
                <li onClick={() => handleChangePage(2)}>3</li>
                <li onClick={() => handleChangePage(3)}>4</li>
                <li className='more'>...</li>
            </div>
        </>

    )
}

export default Home;