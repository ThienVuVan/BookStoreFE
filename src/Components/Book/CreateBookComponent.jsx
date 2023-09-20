import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { CreateBookApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import './CreateBook.scss';
import { useState, useEffect } from "react";
import { useAuth } from '../Sercutiry/AuthContext';

function CreateBookComponent() {
    let Auth = useAuth()
    const [categories, setCategories] = useState(Auth.categories)
    useEffect(() => {
        setCategories(Auth.categories)
    }, [Auth.categories])
    let Navigate = useNavigate()
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            currentQuantity: "",
            publisher: null,
            publicationDate: null,
            dimension: null,
            coverType: null,
            numberOfPages: null,
            publishingHouse: null,
            description: null,
            author: null,
            categoryId: null,
            images: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            price: Yup.string().required("Required"),
            currentQuantity: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                await CreateBookApi(sessionStorage.getItem("shopId"), values, headers)
                Navigate("/shop")
                toast.success("Add Book Success!")
            }
            catch (error) {
                toast.error("Add Book Failed!")
                console.log(error)
            }
        }
    })

    const handleImageChange = (event) => {
        const selectedFiles = event.target.files[0]
        formik.setFieldValue("images", [...formik.values.images, selectedFiles])
    }

    return (
        <div className="create-book">
            <form onSubmit={formik.handleSubmit}>
                <div className="book-data">
                    <table className="info">
                        <tr>
                            <td>Title:</td>
                            <td>
                                <input type="text" name="title" value={formik.values.title}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your title"
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
                                    placeholder="Enter your price"
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
                                    placeholder="Enter your currentQuantity"
                                />
                                {formik.errors.currentQuantity && (
                                    <p className="errorMsg"> {formik.errors.currentQuantity} </p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Authors:</td>
                            <td>
                                <input type="text" name="author" value={formik.values.author}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your author"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>
                                <select name="categoryId" value={formik.values.categoryId} onChange={formik.handleChange}>
                                    <option value="">none</option>
                                    {categories.map((category) => {
                                        return (
                                            category.subcategories.map((subcategory) => (
                                                <option value={subcategory.id}>{subcategory.name}</option>
                                            ))
                                        )
                                    })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td>
                                <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
                                <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
                                <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
                            </td>
                        </tr>
                    </table>
                    <table className="detail">
                        <tr>
                            <td>Publisher</td>
                            <td>
                                <input type="text" name="publisher" value={formik.values.publisher}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your publisher"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>PublicationDate</td>
                            <td>
                                <input type="date" name="publicationDate" value={formik.values.publicationDate}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your publicationDate"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Dimension</td>
                            <td>
                                <input type="text" name="dimension" value={formik.values.dimension}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your dimension"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CoverType</td>
                            <td>
                                <input type="text" name="coverType" value={formik.values.coverType}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your coverType"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>NumberOfPages</td>
                            <td>
                                <input type="number" name="numberOfPages" value={formik.values.numberOfPages}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your numberOfPages"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>PublishingHouse</td>
                            <td>
                                <input type="text" name="publishingHouse" value={formik.values.publishingHouse}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your publishingHouse"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>
                                <input type="text" name="description" value={formik.values.description}
                                    onChange={formik.handleChange}
                                    placeholder="Enter your description"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='setting'>
                    <button type="submit"> Create Book </button>
                </div>
            </form>
        </div>
    )
}
export default CreateBookComponent;