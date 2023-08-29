import { useEffect, useState } from 'react';
import { useAuth } from '../Sercutiry/AuthContext';
import { GetBookByPageApi } from "../API/BookStoreApi";
import './Home.scss';

function Home() {
    let [bookData, setBookData] = useState({})
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
    let retrieveBookData = async () => {
        try {
            let response = await GetBookByPageApi(0, headers)
            setBookData(response.data)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        retrieveBookData()
    }, [])
    return (
        <div className='home'>
            <div className='filter'> filter book here</div>
            <div className='list-book'>
                {bookData.map((book) => (
                    <div>
                        <ul>
                            <li>{book.title}</li>
                            <li>{book.price} $</li>
                            <li>Sold: {book.soldQuantity}</li>
                        </ul>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Home;