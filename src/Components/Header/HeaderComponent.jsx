import { Link } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';
import './Header.scss';


function HeaderComponent() {
    let Auth = useAuth();

    return (
        <div className='nav'>
            <div className='left'>
                <Link className='logo' to="/home">BookStore</Link>
            </div>
            <div className='right'>
                {!Auth.isAuthenticated && <Link className="link" to="/signup">SignUp</Link>}
                {!Auth.isAuthenticated && <Link className="link" to="/login">Login</Link>}
                {Auth.isAuthenticated && <Link className="link" to="/cart">Cart</Link>}
                {Auth.isAuthenticated && Auth.roles.includes("ROLE_SHOP") && <Link className="link" to="/shop">Shop</Link>}
                {Auth.isAuthenticated && <Link className="link" to="/account">Account</Link>}
            </div>
        </div>
    )
}
export default HeaderComponent;