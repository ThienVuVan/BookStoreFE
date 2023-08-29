import React, { useState } from 'react';
import './SideBar.scss';
import { useAuth } from '../Sercutiry/AuthContext';

const SideBar = () => {
    let Auth = useAuth();
    const [categories, setCategories] = useState(Auth.categoriesData);
    const toggleSubcategories = (categoryId) => {
        // Tạo một mảng mới của danh mục với trạng thái đã được cập nhật
        const updatedCategories = categories.map((category) => {
            if (category.id === categoryId) {
                // Nếu là danh mục chính được nhấp vào
                return {
                    ...category,          // Giữ nguyên các thuộc tính khác
                    isOpen: !category.isOpen  // Đảo ngược giá trị isOpen
                };
            } else {
                // Nếu là danh mục khác
                return {
                    ...category,          // Giữ nguyên các thuộc tính khác
                    isOpen: false        // Đóng danh mục con
                };
            }
        });
        // Cập nhật trạng thái danh sách danh mục
        setCategories(updatedCategories);
    };

    return (
        <div className="sidebar">
            {categories.map((category) => (
                <div key={category.id} className="category">
                    <div
                        className="category-title"
                        onClick={() => toggleSubcategories(category.id)}
                    >
                        {category.title}
                    </div>
                    {category.isOpen && (
                        <ul className="subcategory-list">
                            {category.subcategories.map((subcategory, index) => (
                                <li key={index} className="subcategory">
                                    {console.log(index)}
                                    {subcategory.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SideBar;
