import { Link } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';
import './Header.scss';


function HeaderComponent() {
    let Auth = useAuth();

    return (
        <header className="header">
            <nav className="navbar">
                <div className='left'>
                    <Link className='logo' to="/home">BookStore</Link>
                </div>
                <div className='right'>
                    <ul className="ul">
                        <li className="li">
                            {!Auth.isAuthenticated && <Link className="link" to="/signup">SignUp</Link>}
                        </li>
                        <li className="li">
                            {!Auth.isAuthenticated && <Link className="link" to="/login">Login</Link>}
                        </li>
                        <li className="li">
                            {Auth.isAuthenticated && <Link className="link" to="/cart">Cart</Link>}
                        </li>
                        <li className="navbar-ul-li">
                            {Auth.isAuthenticated && Auth.roles.includes("ROLE_SHOP") && <Link className="link" to="/shop">Shop</Link>}
                        </li>
                        <li className="li">
                            {Auth.isAuthenticated && <Link className="link" to="/account">Account</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
export default HeaderComponent;
