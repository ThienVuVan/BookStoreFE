import { Link } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';

function HeaderComponent() {
    let Auth = useAuth();
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <Link className='navbar-brand ms-2 fs-2 fw-bold text-black' to="/home">BookStore</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {Auth.isAuthenticated && <Link className="nav-link" to="/home">CateGory</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!Auth.isAuthenticated && <Link className="nav-link" to="/signup">SignUp</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {!Auth.isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {Auth.isAuthenticated && <Link className="nav-link" to="/home" onClick={() => Auth.logout()}>Logout</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {Auth.isAuthenticated && <Link className="nav-link" to="/account">Account</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {Auth.isAuthenticated && Auth.roles.includes("ROLE_SHOP") && <Link className="nav-link" to="/shop">Shop</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default HeaderComponent;