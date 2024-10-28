import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SuccessPage = () => {
  const cart = useSelector((state) => Array.isArray(state.cart) ? state.cart : []);

  useEffect(() => {
    const updateStock = async () => {
      try {
        await axios.post('http://localhost:5000/api/update-stock', { cart });
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    };

    updateStock();
  }, [cart]);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4">Checkout Successful!</Typography>
      <Typography variant="body1" mt={2}>
        Thank you for your purchase! Your order has been confirmed.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 4 }}>
        Back to Catalog
      </Button>
    </Box>
  );
};

export default SuccessPage;