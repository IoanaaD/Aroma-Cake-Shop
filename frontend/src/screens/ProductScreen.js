import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from 'react-router';
import axios from 'axios';

const ProductScreen = ({ }) => {
    const params = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${params['id']}`);
            setProduct(data)
        }
        fetchProduct();
    }, [params])

    const addToCartHandler = () => {
        console.log("added to cart")
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                                color={'#83677B'}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                onClick={addToCartHandler}
                                className="btn-block addToCart-btn"
                                type="button"
                                disbled={product.countInStock === 0}
                            >
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
                                    className="btn-block"
                                    type="button"
                                    disbled={product.countInStock === 0}
                                >
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col> */}
            </Row>
        </>
    )
}

export default ProductScreen