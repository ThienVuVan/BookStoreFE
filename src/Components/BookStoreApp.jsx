import './BookStoreApp.scss'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderComponent from './Header/HeaderComponent';
import LoginComponent from './Auth/LoginComponent';
import AuthProvider, { useAuth } from './Sercutiry/AuthContext';
import Home from './Home/Home';
import SignUpComponent from './Auth/SignUpComponent';
import AccountComponent from './Header/AccountComponent';

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
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/signup' element={<SignUpComponent />} />
                        <Route path='/account' element={<AccountComponent />} />
                        <Route path='/home' element={<Home />} />
                        {/* <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } /> */}
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