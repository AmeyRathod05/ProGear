// import {useEffect, useState} from 'react';
import {Row,Col} from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
// import axios from 'axios';
import ProductsCarousel from '../components/ProductsCarousel.jsx';
import {  useGetProductsQuery } from '../slices/productApiSlice.js';



const HomeScreen = () => {

  // const [products,setProducts] = useState([]);
  
  // useEffect(()=>{
  
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data);
  //   }; 
  
  //   fetchProducts();
  
  // },[]); 
const { data : products, isLoading, error } = useGetProductsQuery();


  return (  
    <>
    {
      <ProductsCarousel/>
    }
    { 
    
    isLoading ? (<Loader />) : error ? (<Message variant='danger'> { error?.data?.message || error.error} </Message>) : 
    ( 
      <>
      
      <h1>Latest Products</h1>
    <Row>{products.map((product) =>(
        <Col key={product._id} sm={12} md={6} lg={4} cl={3}>  
       <Product product={product} />
        </Col>
    )) }</Row> 
      </>
    )
    };

    
    </>
  )
}

export default HomeScreen;