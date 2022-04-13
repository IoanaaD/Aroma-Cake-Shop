import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Form
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ history }) => {
    const [qty, setQty] = useState(1)

    const params = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(params['id']))
    }, [dispatch, params])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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
                            <ListGroup.Item>Price: {product.price} lei</ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Select value={qty} onChange={(e) =>
                                                setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Link to={`/cart/${product._id}?qty=${qty}`}>
                                    <Button
                                        className="btn-block addToCart-btn"
                                        type="button"
                                        disbled={product.countInStock === 0 ? true : false}
                                    >
                                        Add to cart
                                    </Button>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ProductScreen