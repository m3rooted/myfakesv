import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Menu from './components/Menu';
import Home from './components/Home';
import Product from './components/Product';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Container className='app-shell py-3'>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/dien-thoai' element={<Product />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;