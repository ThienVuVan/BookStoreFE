import './BookStoreApp.scss'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider, { useAuth } from './Sercutiry/AuthContext';
import HeaderComponent from './Header/HeaderComponent';
import Home from './Home/Home';
import LoginComponent from './Auth/LoginComponent';
import SignUpComponent from './Auth/SignUpComponent';
import ShopComponent from './Shop/ShopComponent';
import CreateShopComponent from './Shop/CreateShopComponent';
import UpdateShopComponent from './Shop/UpdateShopComponent';
import AccountComponent from './Account/AccountComponent';
import UpdateAccountComponent from './Account/UpdateAccountComponent';
import UpdateShopDetailComponent from './Shop/UpdateShopDetailComponent';


function AuthenticatedRoute({ children }) {
    let Auth = useAuth();
    if (Auth.isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

function BookStoreApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />

                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/signup' element={<SignUpComponent />} />

                        <Route path='/account' element={<AccountComponent />} />
                        <Route path='/updateaccount' element={<UpdateAccountComponent />} />

                        <Route path='/shop' element={<ShopComponent />} />
                        <Route path='/createshop' element={<CreateShopComponent />} />
                        <Route path='/updateshop' element={<UpdateShopComponent />} />
                        <Route path='/updateshopdetail' element={<UpdateShopDetailComponent />} />

                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
export default BookStoreApp;