import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa';
import Message from '../components/Message';
import { addtoCart,  removeFromCart } from '../slices/cartSlice';


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const  cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const addToCartHandler = async (product,qty) => {

        dispatch(addtoCart({...product,qty}));

    } 
    const removeFromCartHandler = async (id) => {

        dispatch(removeFromCart(id));

    } 

    return (
            <Row>

                <Col md = {8}
                >
                    <h1 style = {{marginBottom:'20px'}}>Shopping Cart</h1>
                { cartItems.length === 0 ?  (
                    <Message>
                        your cart is empty <Link to = '/' >Go back</Link>
                    </Message>
    ) : (
        <ListGroup variant='flush'>
            {cartItems.map((item)=>(
                <ListGroupItem key = {item._id}>
                    <Row>
                        <Col md={2}>
                            <Image src={item.image} alt = { item.name} fluid rounded/>
                        </Col>
                        <Col md={3}>
                            <Link to={`/product/${item._id }`}>
                               {item.name} 
                            </Link>
                        </Col>
                        <Col md={2}>
                            ${item.price}
                        </Col>
                        <Col md={2} >
                            {<Form.Control as="select"
                                    value ={item.qty}
                                    onChange= { (e) => addToCartHandler(item,Number(e.target.value))} >

                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key = { x + 1} value = {x + 1}>
                                            {x +1 }
                                        </option>
                                    ))}

                                    </Form.Control>}
                        </Col>
                        <Col md={2}>
                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                                <FaTrash/>
                            </Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    )}
                </Col>
                  <Col md={4}>
                   <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>
                            Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)})
                        </h2>
                        ${cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0} >
                            Proceed to Checkout
                        </Button>
                    </ListGroupItem>

                </ListGroup>
                    </Card> 
                    </Col>                      
            </Row>
  )
}

export default CartScreen;