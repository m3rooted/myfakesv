import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, FormControl, Nav } from 'react-bootstrap';

function Menu() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const q = keyword.trim();
        navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    };

    return (
        <Nav className='top-nav px-3 py-2'>
            <div className='d-flex align-items-center gap-3'>
                <NavLink
                    to='/home'
                    className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
                >
                    HOME
                </NavLink>
                <NavLink
                    to='/products'
                    className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
                >
                    PRODUCTS
                </NavLink>
            </div>

            <Form className='d-flex ms-auto' onSubmit={handleSearch}>
                <FormControl
                    size='sm'
                    type='search'
                    placeholder='Search'
                    className='me-1 nav-search-input'
                    aria-label='Search'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type='submit' className='btn btn-outline-light btn-sm'>
                    Search
                </button>
            </Form>
        </Nav>
    );
}

export default Menu;