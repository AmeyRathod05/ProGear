import {Link} from "react-router-dom";
import { Carousel,CarouselCaption,CarouselItem,Image} from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from "../slices/productApiSlice";



const ProductsCarousel = () => {

    const {data: products, isLoading, error } = useGetTopProductsQuery()
  return isLoading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message>
  : (
    <Carousel pause='hover' className="bg-primary mb-4">
        {products.map(product => (
            <CarouselItem key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <CarouselCaption className="carousel-caption">
                        <h2>
                            {product.name}  (${product.price})</h2>
                    </CarouselCaption>
                </Link>

            </CarouselItem>
        ))}

    </Carousel>
  )
      
  
}

export default ProductsCarousel