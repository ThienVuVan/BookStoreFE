import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Components/Sercutiry/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Components/Sercutiry/AuthContext';
import HeaderComponent from './Components/Header/HeaderComponent';
import Home from './Components/Home/Home';
import LoginComponent from './Components/Auth/LoginComponent';
import SignUpComponent from './Components/Auth/SignUpComponent';
import ShopComponent from './Components/Shop/ShopComponent';
import CreateShopComponent from './Components/Shop/CreateShopComponent';
import UpdateShopComponent from './Components/Shop/UpdateShopComponent';
import AccountComponent from './Components/Account/AccountComponent';
import UpdateAccountComponent from './Components/Account/UpdateAccountComponent';
import UpdateShopDetailComponent from './Components/Shop/UpdateShopDetailComponent';
import SideBar from './Components/Header/SideBar';
import CreateBookComponent from './Components/Book/CreateBookComponent';
import BookDetailComponent from './Components/Book/BookDetailComponent';
import UpdateBookComponent from './Components/Book/UpdateBookComponent';
import CartComponent from './Components/Cart/CartComponent';

function AuthenticatedRoute({ children }) {
  let Auth = useAuth();
  if (Auth.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}

function App() {
  return (

    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <div className='content'>
            <SideBar className='sidebar' />
            <main className='main-content'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />

                <Route path='/login' element={<LoginComponent />} />
                <Route path='/signup' element={<SignUpComponent />} />

                <Route path='/account' element={<AuthenticatedRoute><AccountComponent /></AuthenticatedRoute>} />
                <Route path='/updateaccount' element={<AuthenticatedRoute><UpdateAccountComponent /></AuthenticatedRoute>} />

                <Route path='/shop' element={<AuthenticatedRoute><ShopComponent /></AuthenticatedRoute>} />
                <Route path='/createshop' element={<AuthenticatedRoute><CreateShopComponent /></AuthenticatedRoute>} />
                <Route path='/updateshop' element={<AuthenticatedRoute><UpdateShopComponent /></AuthenticatedRoute>} />
                <Route path='/updateshopdetail' element={<AuthenticatedRoute><UpdateShopDetailComponent /></AuthenticatedRoute>} />

                <Route path='/createbook' element={<AuthenticatedRoute><CreateBookComponent /></AuthenticatedRoute>} />
                <Route path='/bookdetail/:id' element={<AuthenticatedRoute><BookDetailComponent /></AuthenticatedRoute>} />
                <Route path='/updatebook/:id' element={<AuthenticatedRoute><UpdateBookComponent /></AuthenticatedRoute>} />

                <Route path='/cart' element={<AuthenticatedRoute><CartComponent /></AuthenticatedRoute>} />

              </Routes>
            </main>
          </div>
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
  );
}

export default App;
