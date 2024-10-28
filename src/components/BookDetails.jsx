import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, CardMedia, Alert } from '@mui/material';
import { addToCart } from '../redux/cartSlice';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <Typography>Loading...</Typography>;

  const handleAddToCart = () => {
    const cartItem = cart.find(item => item.id === book.id);
    const totalBooksInCart = cart.reduce((total, item) => total + item.quantity, 0);
    const updatedQuantity = cartItem ? cartItem.quantity + 1 : 1;
  
    if (cartItem && cartItem.quantity >= book.stock) {
      setFeedback('You cannot add more of this book than is in stock.');
    } else {
      dispatch(addToCart(book));
      setFeedback(`Book added to cart successfully! You have ${updatedQuantity} of this book in your cart. Total books in cart: ${totalBooksInCart + 1}`);
    }
  };

  return (
    <Box mt={4}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={book.picture} // Assuming 'picture' field exists in books.json
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h4">{book.title}</Typography>
          <Typography color="textSecondary">By: {book.author}</Typography>
          <Typography>Pages: {book.pages}</Typography>
          <Typography>Price: ${book.price}</Typography>
          <Typography>Description: {book.description}</Typography>
          <Typography>Category: {book.category}</Typography>
          <Typography>Stock: {book.stock}</Typography> {/* Display stock */}
        </CardContent>
      </Card>
      <Box mt={4}>
        <Button variant="contained" onClick={() => navigate(-1)} style={{ marginRight: '16px' }}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Box>
      {feedback && (
        <Box mt={2}>
          <Alert severity={book.stock > 0 ? 'success' : 'error'}>{feedback}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default BookDetails;