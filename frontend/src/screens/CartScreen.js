import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import Message from '../components/Message'
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ }) => {
    const params = useParams();
    const productId = params['id'];
    const [searchParams, setSearchParams] = useSearchParams();
    const qty = searchParams.get('qty');
    const dispatch = useDispatch()

    const cart = useSelector(state => {
        return state.cart;
    })
    const { cartItems } = cart

    const checkoutHnadler = () => {
        console.log("Checkout")
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                    <Form.Select

                                        value={item.qty}
                                        onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)} >
                                        <i className="fas fa-trash"></i>
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
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type='button' className="btn-block" disable={cartItems.length === 0} onClick={checkoutHnadler}>
                            Proceed To checkout
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>

    </Row>;
}

export default CartScreen