import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateBookApi, GetBookDetailByIdApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';
import './UpdateBook.scss'

function UpdateBookComponent() {
    let { id } = useParams()
    let Auth = useAuth()
    let Navigate = useNavigate()
    let [bookImages, setBookImages] = useState([])
    const [categories, setCategories] = useState(Auth.categories)
    useEffect(() => {
        setCategories(Auth.categories)
    }, [Auth.categories])
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    useEffect(() => {
        retrieveBookData()
    }, [])

    let retrieveBookData = async () => {
        try {
            let response = await GetBookDetailByIdApi(id, headers)
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
                authors: response.data.author,
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
            authors: "",
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

    const handleImageChange = (event) => {
        const selectedFiles = event.target.files[0]
        formik.setFieldValue("newImages", [...formik.values.newImages, selectedFiles])
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='book'>
                    <div className="image">
                        <table>
                            {bookImages.map((image) => {
                                return (
                                    <tr>Image: {image.substring(31)}</tr>
                                )
                            })}
                            <tr>Select new images</tr>
                            <tr><input type="file" name="image1" accept="image/*" onChange={handleImageChange} /></tr>
                            <tr><input type="file" name="image2" accept="image/*" onChange={handleImageChange} /></tr>
                            <tr><input type="file" name="image3" accept="image/*" onChange={handleImageChange} /></tr>
                        </table>
                    </div>
                    <div className="info">
                        <table>
                            <tr>
                                <td>Title:</td>
                                <td>
                                    <input type="text" name="title" value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.title && (
                                        <p className="errorMsg"> {formik.errors.title} </p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>
                                    <input type="number" name="price" value={formik.values.price}
                                        onChange={formik.handleChange}
                                        min={0}
                                    />
                                    {formik.errors.price && (
                                        <p className="errorMsg"> {formik.errors.price} </p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>CurrentQuantity:</td>
                                <td>
                                    <input type="number" name="currentQuantity" value={formik.values.currentQuantity}
                                        onChange={formik.handleChange}
                                        min={0}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Authors:</td>
                                <td>
                                    <input type="text" name="authors" value={formik.values.authors}
                                        onChange={formik.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>
                                    <input type="text" name="author" value={formik.values.category}
                                        onChange={formik.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>New Category:</td>
                                <td>
                                    <select name="newCategoryId" value={formik.values.newCategoryId} onChange={formik.handleChange}>
                                        <option value="">none</option>
                                        {categories.map((category) => {
                                            return (
                                                <optgroup label={category.name}>
                                                    {category.subcategories.map((subcategory) => (
                                                        <option value={subcategory.id}>{subcategory.name}</option>
                                                    ))}
                                                </optgroup>
                                            )
                                        })
                                        }
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='book-detail'>
                    <table>
                        <tr>
                            <td>Publisher:</td>
                            <td>
                                <input type="text" name="publisher" value={formik.values.publisher}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>PublicationDate:</td>
                            <td>
                                <input type="date" name="publicationDate" value={formik.values.publicationDate}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Dimension:</td>
                            <td>
                                <input type="text" name="dimension" value={formik.values.dimension}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CoverType:</td>
                            <td>
                                <input type="text" name="coverType" value={formik.values.coverType}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>NumberOfPages:</td>
                            <td>
                                <input type="number" name="numberOfPages" value={formik.values.numberOfPages}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>PublishingHouse:</td>
                            <td>
                                <input type="text" name="publishingHouse" value={formik.values.publishingHouse}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>
                                <input type="text" name="description" value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='setting'>
                    <button type="submit"> Update Book </button>
                </div>
            </form>
        </div>
    )
}
export default UpdateBookComponent;