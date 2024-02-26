// import {useState,useEffect} from 'react';

import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Form,Row,Col, Image ,ListGroup ,Card, Button,ListGroupItem} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Ratings from '../components/Ratings';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from  'axios';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { addtoCart } from '../slices/cartSlice';

const ProductScreen = () => {

    // const [product,setProduct] = useState({});
    const { id:productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [qty, setQty ] = useState(1);


    const { data : product, isLoading, error} = useGetProductDetailsQuery(productId);

    const addToCartHandler = () =>{
        dispatch(addtoCart({
            ...product, qty, 
        }));
        navigate('/cart');
    };


    // useEffect(() => {
    //    const fetchProduct = async() => {
    //     const {data} = await axios.get(`/api/products/${productId}`);
    //     setProduct(data);
    //    }

    //    fetchProduct();

    // }, [productId]);

   
  


  return (

  <>
  <Link className='btn btn-light my-3' to="/" >Go Back</Link>

    { isLoading ? (
       <Loader />
    ) : error ? (
        <Message variant='danger'> { error?.data?.message || error.error}

    </Message>
    ) : (
             <Row>

             <Col md={5}>
                 <Image src={product.image} alt={product.name} fluid />
             </Col>
             <Col md={4}>
                 <ListGroup variant='flush'>
                     <ListGroupItem>
                         <h3>{product.name}</h3>
                     </ListGroupItem>
                     
                     <ListGroupItem>
                         <Ratings value={product.rating} text = {`${product.numReviews} reviews`}/>
                     </ListGroupItem>
                     <ListGroupItem>
                         Price : ${product.price}
                     </ListGroupItem>
                     <ListGroupItem>
                         Description:{product.description}
                     </ListGroupItem>
                 </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant='flush'>
                         <ListGroupItem>
                             <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                 <strong>${product.price}</strong>
                                 </Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Status:</Col>
                                 <Col>
                                 <strong>{product.countInStock > 0 ? 'In Stock' : 
                                  'Out of Stock'}</strong>
                                 </Col>
                             </Row>
                           </ListGroupItem>

                        { product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Form.Control as="select"
                                    value ={qty}
                                    onChange= { (e) => setQty(Number(e.target.value))} >

                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key = { x + 1} value = {x + 1}>
                                            {x +1 }
                                        </option>
                                    ))}

                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )  }
         
                     <ListGroupItem>
                         <Button
                         className="btn-block"
                         type="button"
                         disabled={product.countInStock === 0}
                         onClick={addToCartHandler}
                         >  Add to Cart  </Button>
                     </ListGroupItem>
                     </ListGroup>
                 </Card>
             </Col>
           </Row>
    )  }

 
  </>
  );
  
};

export default ProductScreen;