import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import { GetBookByIdApi, UpdateBookApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';
import './UpdateBook.scss'

function UpdateBookComponent() {
    let { id } = useParams()
    let Auth = useAuth()
    let Navigate = useNavigate()
    let [bookImages, setBookImages] = useState([])
    const [categories, setCategories] = useState(Auth.categoriesData)
    let [select, setSelect] = useState(false)
    let [selectCategory, setSelectCategory] = useState("")
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    useEffect(() => {
        retrieveBookData()
    }, [])

    let retrieveBookData = async () => {
        try {
            let response = await GetBookByIdApi(id, headers)
            formik.setValues({
                title: response.data.title,
                price: response.data.price,
                currentQuantity: response.data.currentQuantity,
                soldQuantity: response.data.soldQuantity,
                publisher: response.data.publisher,
                publicationDate: response.data.publicationDate,
                dimension: response.data.dimension,
                coverType: response.data.coverType,
                numberOfPages: response.data.numberOfPages,
                publishingHouse: response.data.publishingHouse,
                description: response.data.description,
                author: response.data.author,
                category: response.data.category,
                newCategoryId: null,
                newImages: [],

            })
            setBookImages(response.data.images)
        }
        catch (error) {
            console.log(error)
        }
    }
    let formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            currentQuantity: "",
            publisher: "",
            publicationDate: "",
            dimension: "",
            coverType: "",
            numberOfPages: "",
            publishingHouse: "",
            description: "",
            author: "",
            category: "",
            newCategoryId: null,
            newImages: [],
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            try {
                await UpdateBookApi(id, values, headers)
                Navigate("/shop")
                toast.success("Update Book Success!")
            }
            catch (error) {
                toast.error("Update Book Failed!")
                console.log(error)
            }
        }
    })

    const handleViewSelect = () => {
        setSelect(!select)
    }

    const handleSelectCategory = (id, name) => {
        formik.setFieldValue("newCategoryId", id)
        setSelectCategory(name)
        setSelect(!select)
    }

    const handleImageChange = (event) => {
        const selectedFiles = event.target.files[0]
        formik.setFieldValue("newImages", [...formik.values.newImages, selectedFiles])
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='book'>
                    <div className="image">
                        <div>
                            <ul>
                                {bookImages.map((image) => {
                                    return (
                                        <li>Image: {image}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <label>Select new images </label>
                            <div><input type="file" name="image1" accept="image/*" onChange={handleImageChange} /></div>
                            <div><input type="file" name="image2" accept="image/*" onChange={handleImageChange} /></div>
                            <div><input type="file" name="image3" accept="image/*" onChange={handleImageChange} /></div>
                        </div>
                    </div>
                    <div className="info">
                        <div>
                            <label>Title: </label>
                            <input type="text" name="title" value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.title && (
                                <p className="errorMsg"> {formik.errors.title} </p>
                            )}
                        </div>
                        <div>
                            <label>price: </label>
                            <input type="number" name="price" value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.price && (
                                <p className="errorMsg"> {formik.errors.price} </p>
                            )}
                        </div>
                        <div>
                            <label>currentQuantity: </label>
                            <input type="number" name="currentQuantity" value={formik.values.currentQuantity}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div>
                            <label>Authors </label>
                            <input type="text" name="author" value={formik.values.author}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div>
                            <label>Category </label>
                            <input type="text" name="author" value={formik.values.category}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {!select &&
                            <div>
                                <label>New Category </label>
                                <input type="text" name="categoryId" value={selectCategory}
                                    onClick={handleViewSelect}
                                />
                            </div>
                        }
                        {select &&
                            categories.map((category) => (
                                <div>
                                    <ul>
                                        {category.subcategories.map((subcategory, index) => (
                                            <li className="subcategory" onClick={() => handleSelectCategory(subcategory.id, subcategory.name)}>{subcategory.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='book-detail'>
                    <div>
                        <label>publisher: </label>
                        <input type="text" name="publisher" value={formik.values.publisher}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>publicationDate: </label>
                        <input type="date" name="publicationDate" value={formik.values.publicationDate}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>dimension: </label>
                        <input type="text" name="dimension" value={formik.values.dimension}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>coverType: </label>
                        <input type="text" name="coverType" value={formik.values.coverType}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>numberOfPages: </label>
                        <input type="number" name="numberOfPages" value={formik.values.numberOfPages}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>publishingHouse: </label>
                        <input type="text" name="publishingHouse" value={formik.values.publishingHouse}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label>description: </label>
                        <input type="text" name="description" value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className='setting'>
                    <button type="submit"> Update Book </button>
                </div>
            </form>
        </div>
    )
}
export default UpdateBookComponent;