import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = Number(searchParams.get('categoryId') || 0);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  useEffect(() => {
    axios
      .get('http://localhost:9999/Product')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((item) => {
    const byCategory = categoryId ? Number(item.Category_ID) === categoryId : true;
    const byName = q ? String(item.Name || '').toLowerCase().includes(q) : true;
    return byCategory && byName;
  });

  return (
    <section className='mt-3'>
      <h5 className='text-uppercase text-light mb-3'>Products ({filteredProducts.length})</h5>
      <Row className='g-3'>
        {filteredProducts.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className='h-100 product-card'>
              <Card.Img
                variant='top'
                src={item.Images}
                alt={item.Name}
                className='product-image'
              />
              <Card.Body>
                <Card.Title className='product-name'>{item.Name}</Card.Title>
                <Card.Text className='product-price'>
                  {Number(item.Price || 0).toLocaleString('vi-VN')} VND
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {!filteredProducts.length && (
        <p className='text-light mt-3 mb-0'>Khong tim thay san pham phu hop.</p>
      )}
    </section>
  );
}

export default Product;