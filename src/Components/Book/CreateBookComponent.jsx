import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { CreateBookApi } from "../API/BookStoreApi";
import { toast } from "react-toastify";
import './CreateBook.scss';
import { useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';

function CreateBookComponent() {
    let Auth = useAuth()
    const [categories, setCategories] = useState(Auth.categoriesData)
    let [select, setSelect] = useState(false)
    let [selectCategory, setSelectCategory] = useState("")
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

    const handleViewSelect = () => {
        setSelect(!select)
    }

    const handleSelectCategory = (id, name) => {
        formik.setFieldValue("categoryId", id)
        setSelectCategory(name)
        setSelect(!select)
    }

    return (
        <div className="create-book">
            <form onSubmit={formik.handleSubmit}>
                <div className="book-data">
                    <div className='info'>
                        <div>
                            <label>Title</label>
                            <input type="text" name="title" value={formik.values.title}
                                onChange={formik.handleChange}
                                placeholder="Enter your title"
                            />
                            {formik.errors.title && (
                                <p className="errorMsg"> {formik.errors.title} </p>
                            )}
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="price" value={formik.values.price}
                                onChange={formik.handleChange}
                                placeholder="Enter your price"
                            />
                            {formik.errors.price && (
                                <p className="errorMsg"> {formik.errors.price} </p>
                            )}
                        </div>
                        <div>
                            <label>CurrentQuantity</label>
                            <input type="number" name="currentQuantity" value={formik.values.currentQuantity}
                                onChange={formik.handleChange}
                                placeholder="Enter your currentQuantity"
                            />
                            {formik.errors.currentQuantity && (
                                <p className="errorMsg"> {formik.errors.currentQuantity} </p>
                            )}
                        </div>
                    </div>
                    <div className='detail'>
                        <div>
                            <label>Publisher</label>
                            <input type="text" name="publisher" value={formik.values.publisher}
                                onChange={formik.handleChange}
                                placeholder="Enter your publisher"
                            />
                        </div>
                        <div>
                            <label>PublicationDate</label>
                            <input type="date" name="publicationDate" value={formik.values.publicationDate}
                                onChange={formik.handleChange}
                                placeholder="Enter your publicationDate"
                            />
                        </div>
                        <div>
                            <label>Dimension</label>
                            <input type="text" name="dimension" value={formik.values.dimension}
                                onChange={formik.handleChange}
                                placeholder="Enter your dimension"
                            />
                        </div>
                        <div>
                            <label>CoverType</label>
                            <input type="text" name="coverType" value={formik.values.coverType}
                                onChange={formik.handleChange}
                                placeholder="Enter your coverType"
                            />
                        </div>
                        <div>
                            <label>NumberOfPages</label>
                            <input type="number" name="numberOfPages" value={formik.values.numberOfPages}
                                onChange={formik.handleChange}
                                placeholder="Enter your numberOfPages"
                            />
                        </div>
                        <div>
                            <label>PublishingHouse</label>
                            <input type="text" name="publishingHouse" value={formik.values.publishingHouse}
                                onChange={formik.handleChange}
                                placeholder="Enter your publishingHouse"
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" name="description" value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder="Enter your description"
                            />
                        </div>
                    </div>
                    <div className='other'>
                        <div>
                            <label>Authors</label>
                            <input type="text" name="author" value={formik.values.author}
                                onChange={formik.handleChange}
                                placeholder="Enter your author"
                            />
                        </div>
                        {!select &&
                            <div>
                                <label>Categories</label>
                                <input type="text" name="categoryId" value={selectCategory}
                                    onClick={handleViewSelect}
                                    placeholder="Select category"
                                />
                            </div>
                        }
                        {select &&
                            categories.map((category) => (
                                <div>
                                    {category.subcategories.map((subcategory, index) => (
                                        <li className="subcategory" onClick={() => handleSelectCategory(subcategory.id, subcategory.name)}>{subcategory.name}</li>
                                    ))}
                                </div>
                            ))
                        }
                        <div>
                            <label>Image</label>
                            <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
                            <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
                            <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                </div>
                <div className='setting'>
                    <button type="submit"> Create Book </button>
                </div>
            </form>
        </div>
    )
}
export default CreateBookComponent;