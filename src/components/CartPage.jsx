import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Grid, Alert } from '@mui/material';

const CartPage = () => {
  const cart = useSelector((state) => state.cart || []); // Ensure cart is an array
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleContinue = () => {
    navigate('/checkout');
  };

  const handleIncrement = (item) => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id && cartItem.color === item.color);
    if (cartItem && cartItem.quantity < item.stock) {
      dispatch(incrementQuantity({ id: item.id, color: item.color, stock: item.stock }));
      setFeedback('');
    } else {
      setFeedback(`Cannot add more of ${item.title} in ${item.color} than is in stock.`);
    }
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ id: item.id, color: item.color }));
    setFeedback('');
  };

  useEffect(() => {
    // This effect will run whenever the cart state changes
    cart.forEach(item => {
      if (item.quantity >= item.stock) {
        setFeedback(`Cannot add more of ${item.title} in ${item.color} than is in stock.`);
      }
    });
  }, [cart]);

  return (
    <div>
      <Typography variant="h4">Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map(item => (
              <Grid item xs={12} sm={6} key={`${item.id}-${item.color}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span>{item.title} ({item.color})</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => handleDecrement(item)}>-</Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button onClick={() => handleIncrement(item)} disabled={item.quantity >= item.stock}>+</Button>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <Button variant="outlined" onClick={() => dispatch(removeFromCart({ id: item.id, color: item.color }))}>
                  Remove
                </Button>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
          <Box mt={3}>
            <Button variant="contained" component={Link} to="/" style={{ marginRight: '10px' }}>
              Back to Catalog
            </Button>
            <Button variant="contained" color="primary" onClick={handleContinue}>
              Continue to Checkout
            </Button>
          </Box>
          {feedback && (
            <Box mt={2}>
              <Alert severity="error">{feedback}</Alert>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;