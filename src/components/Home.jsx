import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const fallbackCategories = [
  { id: 1, Category_Name: 'Samsung', Logo: 'images/category/samsung.png' },
  { id: 2, Category_Name: 'Xiaomi', Logo: 'images/category/xiaomi.png' },
  { id: 3, Category_Name: 'Vivo', Logo: 'images/category/vivo.png' },
  { id: 4, Category_Name: 'Iphone', Logo: 'images/category/iphone.png' },
  { id: 5, Category_Name: 'Oppo', Logo: 'images/category/oppo.png' },
  { id: 6, Category_Name: 'Nokia', Logo: 'images/category/nokia.png' }
];

function Home() {
  const [category, setCategory] = useState(fallbackCategories);
  const navigate = useNavigate();

  const getLocalLogoPath = (categoryName) => {
    const fileName = String(categoryName || '').trim().toLowerCase();
    return `/images/category/${fileName}.png`;
  };

  useEffect(() => {
    axios
      .get('http://localhost:9999/Category')
      .then((res) => {
        const incoming = Array.isArray(res.data) ? res.data : [];
        setCategory(incoming.length ? incoming : fallbackCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Row className='category-wrap mt-3 g-0'>
      <Col className='category-panel'>
        <Row className='g-3'>
          {category.map((item) => {
            const fallbackPath = `/${String(item.Logo || 'images/category/samsung.png').replace(/^images\//i, 'images/')}`;
            const logoPath = getLocalLogoPath(item.Category_Name);

            return (
              <Col key={item.id} xs={6} sm={4} md={2} className='text-center'>
                <button
                  type='button'
                  className='logo-button'
                  onClick={() => navigate(`/products?categoryId=${item.id}`)}
                >
                  <div className='logo-circle mx-auto'>
                    <img
                      src={logoPath}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackPath;
                      }}
                      alt={item.Category_Name}
                      className='category-logo'
                    />
                  </div>
                </button>
                <div className='logo-name'>{item.Category_Name}</div>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default Home;