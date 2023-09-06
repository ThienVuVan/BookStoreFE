import { useEffect, useState } from 'react';
import { useAuth } from '../Sercutiry/AuthContext';
import { GetBookByPageApi } from "../API/BookStoreApi";
import './Home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
    let Navigate = useNavigate()
    let [bookData, setBookData] = useState([])
    const headers = {
        'Content-Type': 'multipart/form-data',
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

    return (
        <div className='home'>
            <div className='filter'> filter book here</div>
            <div className='home-list-book'>
                {bookData.map((book) => (
                    <div className='item' onClick={() => handleViewDetail(book.id)}>
                        <div className='image'>
                            <img className='image-item' src={book.imagePath.substring(30)} />
                        </div>
                        <div className='info'>
                            <div>{book.title}</div>
                            <div>Price: {book.price} $</div>
                            <div>Sold: {book.soldQuantity}</div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Home;