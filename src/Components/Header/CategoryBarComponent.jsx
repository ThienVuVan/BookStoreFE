import { Link } from 'react-router-dom';
import { useAuth } from '../Sercutiry/AuthContext';

function CateGoryBarComponent() {
    let Auth = useAuth();
    const categories = [
        {
            id: 1,
            name: 'Fiction',
            subcategories: [
                { id: 101, name: 'Mystery' },
                { id: 102, name: 'Science Fiction' },
            ]
        },
        {
            id: 2,
            name: 'Non-Fiction',
            subcategories: [
                { id: 201, name: 'History' },
                { id: 202, name: 'Self-Help' },
            ]
        },
    ];
    return (
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                <li className="nav-item fs-5">
                    {Auth.isAuthenticated && (
                        <ul className="subcategories">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <div className="nav-link">{category.name}</div>
                                    <ul className="subcategories">
                                        {category.subcategories.map(subcategory => (
                                            <li key={subcategory.id}>
                                                <Link className="nav-link" to={`/category/${subcategory.id}`}>{subcategory.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}
export default CateGoryBarComponent;